import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { COMPANY_INFO, PROJECTS, SERVICES, VALUE_PILLARS, SLIDES_DATA } from './src/data/portfolioData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Security & DoS Mitigation: Limit request body to 15MB
app.use(express.json({ limit: '15mb' }));

// Security Headers Middleware (MIME Sniffing & XSS protection, safe for preview iframe)
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(express.static(path.resolve(__dirname, 'public')));


// Rate Limiting Middlewares
const aiConsultantLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 25, // limit each IP to 25 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Ha superado el límite de consultas al asesor en este lapso. Por favor, espere unos minutos para continuar.',
  },
});

const estimateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 estimate requests
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Ha enviado múltiples solicitudes de cotización recientemente. Un gerente se comunicará pronto.',
  },
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
});

// Ensure data persistence directory exists
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// 1. Hardened Save Slide Image Endpoint (Defends against Path Traversal & Arbitrary File Overwrites)
app.post('/api/save-slide-image', uploadLimiter, async (req, res) => {
  try {
    const { slideNumber, dataUrl } = req.body;
    if (!slideNumber || !dataUrl) {
      return res.status(400).json({ error: 'slideNumber y dataUrl son requeridos' });
    }

    // Strict numerical validation to prevent directory traversal
    const slideNum = parseInt(String(slideNumber), 10);
    if (isNaN(slideNum) || slideNum < 1 || slideNum > 50) {
      return res.status(400).json({ error: 'slideNumber debe ser un entero válido entre 1 y 50' });
    }

    if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Formato de imagen inválido. Debe ser data:image' });
    }

    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Safety check buffer size (max 10MB)
    if (buffer.length > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'El archivo excede el tamaño máximo permitido (10MB)' });
    }

    const targetDir = path.resolve(__dirname, 'public', 'obras');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Safe isolated file path
    const safeFileName = `slide-${slideNum}.jpg`;
    const filePath = path.resolve(targetDir, safeFileName);

    // Verify path remains strictly inside targetDir
    if (!filePath.startsWith(targetDir)) {
      return res.status(403).json({ error: 'Acceso no autorizado a la ruta destino' });
    }

    fs.writeFileSync(filePath, buffer);
    res.json({ success: true, url: `/obras/${safeFileName}` });
  } catch (error) {
    console.error('Error saving slide image:', error);
    res.status(500).json({ error: 'Error interno al procesar imagen de obra' });
  }
});

// Check existing slide images status
app.get('/api/slides-status', async (req, res) => {
  try {
    const fs = await import('fs');
    const targetDir = path.resolve(__dirname, 'public', 'obras');
    const existingSlides: number[] = [];
    if (fs.existsSync(targetDir)) {
      for (let i = 1; i <= 40; i++) {
        if (fs.existsSync(path.join(targetDir, `slide-${i}.jpg`))) {
          existingSlides.push(i);
        }
      }
    }
    res.json({ count: existingSlides.length, slides: existingSlides });
  } catch (error) {
    res.json({ count: 0, slides: [] });
  }
});

// Health & Observability Check Endpoint for Cloud Run / Container Probes
app.get('/api/health', (_req, res) => {
  const mem = process.memoryUsage();
  let leadsCount = 0;
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8') || '[]');
      leadsCount = Array.isArray(leads) ? leads.length : 0;
    }
  } catch {}

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'GARAM Constructores API',
    version: '2026.1.0',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    metrics: {
      memoryRssMb: Math.round(mem.rss / (1024 * 1024)),
      memoryHeapUsedMb: Math.round(mem.heapUsed / (1024 * 1024)),
      persistedLeadsCount: leadsCount,
    },
  });
});

// Commercial Leads Export Endpoint (CSV or JSON)
app.get('/api/leads/export', (req, res) => {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      return res.status(200).json({ count: 0, leads: [] });
    }
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(raw || '[]');
    const format = req.query.format === 'csv' ? 'csv' : 'json';

    if (format === 'csv') {
      const headers = ['referenceId', 'timestamp', 'name', 'email', 'phone', 'service', 'area', 'location', 'timeline', 'comments'];
      const csvRows = [headers.join(',')];
      for (const lead of (Array.isArray(leads) ? leads : [])) {
        const row = headers.map(h => {
          const val = lead[h] !== undefined ? String(lead[h]).replace(/"/g, '""') : '';
          return `"${val}"`;
        });
        csvRows.push(row.join(','));
      }
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="leads-garam-${new Date().toISOString().slice(0, 10)}.csv"`);
      return res.status(200).send(csvRows.join('\n'));
    }

    res.json({ count: leads.length, leads });
  } catch (err) {
    console.error('Error exporting leads:', err);
    res.status(500).json({ error: 'Error al exportar prospectos' });
  }
});

// API Endpoints
app.get('/api/portfolio/data', (req, res) => {
  res.json({
    companyInfo: COMPANY_INFO,
    valuePillars: VALUE_PILLARS,
    services: SERVICES,
    projects: PROJECTS,
    slides: SLIDES_DATA,
  });
});


// Gemini AI Architectural Advisor Endpoint (Hardened with Rate Limiting & Error Sanitization)
app.post('/api/chat/consultant', aiConsultantLimiter, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'El mensaje es requerido y debe ser texto válido.' });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: 'El mensaje excede la longitud máxima permitida (2000 caracteres).' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'El servicio de asesoría técnica se encuentra temporalmente en mantenimiento.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
Eres el Asesor Técnico y Arquitectónico de GARAM Constructores (Portafolio 2026).
Respondes en español con un tono profesional, refinado, técnico y amable, representando la excelencia de la empresa.

INFORMACIÓN CORPORATIVA DE GARAM CONSTRUCTORES:
- Empresa: GARAM Constructores (Promoción, Gerencia y Construcción)
- Lema: "Construimos los espacios donde habita la excelencia." / "Construir con sentido. Construir con GARAM."
- Perfil: Especializados en desarrollo inmobiliario, gerencia integral de proyectos, ingeniería estructural, remodelaciones boutique, urbanismo de alta montaña y construcción médica especializada.
- Áreas de servicio: Promoción, Gerencia de Proyecto, Construcción, Remodelaciones, Urbanismo y Construcción Especializada.
- Cobertura geográfica principal: Caracas (Altamira, La Castellana, El Rosal, La Candelaria, Chacao) y Galipán (Edo. La Guaira).

PORTAFOLIO DE OBRAS DESTACADAS (11 OBRAS):
1. Casa 33 (Altamira, Caracas - 1.321 m²): Residencia ejecutada. Destaca por su volumetría gris, escalera helicoidal exterior en acero naranja, solárium en teca y piscina.
2. Casa AM (Caracas - Parcela 2.476,44 m²): En ejecución. Concreto obra limpia, formas curvas, voladizos pronunciados en armonía con la vegetación.
3. Casa Blanca Galipán (Galipán, La Guaira - Parcela 11.300 m²): En ejecución. Urbanismo de montaña, 6 terrazas conformadas para cabañas ecológicas boutique, muros geotécnicos.
4. Tienda + Restaurante (Altamira, Caracas - 1.250 m²): En ejecución. Edificación vertical de 3 niveles con arcos en mosaico cobalto, estructura metálica y escalera helicoidal en acero.
5. FENDI (La Castellana, Caracas - Parcela 793,29 m²): Ejecutado. Reforma integral de edificio para 3 residencias tipo penthouse con vistas francas al Ávila.
6. Residencias Caroní (Altamira, Caracas - 8 residencias): En ejecución. Obra residencial insignia con profundos voladizos de concreto y jardines colgantes biofílicos.
7. Quinta San Francisco (Altamira, Caracas - 1.914,59 m²): Por ejecutar 2026. Vivienda unifamiliar con área social en doble altura integrada al jardín y piscina.
8. Torre El Rosal — Piso 10 (El Rosal, Caracas - 500 m²): Ejecutado. Habilitación corporativa con techos acústicos cóncavos, panelería en roble y sala de juntas de alta gama.
9. Torre El Rosal — Piso 6 (El Rosal, Caracas - 500 m²): En ejecución. Oficinas estilo industrial moderno con forjados vistos y acabados ejecutivos.
10. Urgencias 9·11 La Candelaria (Caracas - 453,38 m², 4 niveles): Ejecutado. Centro médico especializado con recepción curva en resina epóxica e instalaciones sanitarias normadas.
11. Urgencias 9·11 Torre Europa (El Rosal, Chacao, Caracas - 437,15 m², 2 niveles): Ejecutado. Unidad de atención inmediata en la Av. Francisco de Miranda con doble altura.

Proporciona respuestas claras, estructuradas y detalladas. Si el usuario consulta sobre costos, menciona que GARAM realiza valoraciones personalizadas según metraje, topografía y especificación de acabados, e invítalo a completar el formulario de "Solicitar Cotización".
    `;

    const contents = [
      { role: 'user', parts: [{ text: systemInstruction }] },
      { role: 'model', parts: [{ text: 'Entendido. Estoy listo para asesorar a los clientes de GARAM Constructores.' }] },
      ...(Array.isArray(conversationHistory) ? conversationHistory.slice(-10) : []).map((item: { role: string; text: string }) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(item.text || '') }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
    });

    const replyText = response.text || 'Disculpe, no pude procesar su consulta en este momento. Por favor intente formularla nuevamente.';

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error in Gemini API consultant:', error?.message || error);
    // Secure error response without leaking stack traces or internal auth keys
    res.status(500).json({
      error: 'El asesor técnico está temporalmente indispuesto. Por favor, intente en unos momentos.',
    });
  }
});

// Estimate Request Endpoint (Hardened with Validation & Persistent Storage)
app.post('/api/estimate', estimateLimiter, (req, res) => {
  try {
    const inquiry = req.body;
    
    // Strict input validation for critical commercial leads
    if (!inquiry || typeof inquiry !== 'object') {
      return res.status(400).json({ error: 'Datos de solicitud inválidos' });
    }

    const { name, email, phone } = inquiry;
    if (!name || (!email && !phone)) {
      return res.status(400).json({
        error: 'Debe proporcionar al menos su nombre y un canal de contacto (correo electrónico o teléfono).',
      });
    }

    const referenceId = `GARAM-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();

    const leadRecord = {
      referenceId,
      timestamp,
      clientIp: req.ip || req.socket.remoteAddress,
      ...inquiry,
    };

    // Safe append to leads file
    try {
      const currentLeadsRaw = fs.readFileSync(LEADS_FILE, 'utf-8');
      const currentLeads = JSON.parse(currentLeadsRaw || '[]');
      currentLeads.push(leadRecord);
      fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads, null, 2), 'utf-8');
    } catch (fsErr) {
      console.error('Error persisting lead to disk:', fsErr);
      // Non-fatal fallback: continue so user gets their reference ticket
    }

    console.log(`[LEAD REGISTRADO] Referencia: ${referenceId} - Cliente: ${name} (${email || phone})`);

    res.json({
      success: true,
      message: 'Solicitud registrada exitosamente. Un gerente de proyectos GARAM se comunicará en breve con su propuesta formal.',
      referenceId,
      timestamp,
    });
  } catch (err) {
    console.error('Error processing estimate request:', err);
    res.status(500).json({ error: 'Error procesando solicitud de cotización' });
  }
});

// Serve Vite dev middleware or static dist files
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const fs = await import('fs');
        const rawTemplate = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        const template = await vite.transformIndexHtml(url, rawTemplate);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GARAM Constructores App listening on port ${PORT}`);
  });
}

setupServer();
