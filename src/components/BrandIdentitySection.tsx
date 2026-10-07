import React, { useState } from 'react';
import { Palette, Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from './MotionReveal';
import { LogoConcepts } from './LogoConcepts';

export const BrandIdentitySection: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const garamDigitalPalette = [
    {
      name: 'Caliza',
      hex: '#f6f3ed',
      rgb: '246, 243, 237',
      role: 'Fondo editorial y superficies suaves del sitio.',
      textColor: '#25225a',
      border: true,
    },
    {
      name: 'Índigo GARAM',
      hex: '#25225a',
      rgb: '37, 34, 90',
      role: 'Color original del logotipo, títulos y acciones principales.',
      textColor: '#ffffff',
    },
    {
      name: 'Piedra',
      hex: '#e6ded1',
      rgb: '230, 222, 209',
      role: 'Divisores, bordes y superficies secundarias.',
      textColor: '#25225a',
      border: true,
    },
    {
      name: 'Cobre',
      hex: '#8b5e3c',
      rgb: '139, 94, 60',
      role: 'Acento para detalles, enlaces y señales de interacción.',
      textColor: '#ffffff',
    },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <section id="identidad" className="border-b border-brand-stone bg-brand-paper py-20 font-sans sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Digital brand identity */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-stone pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-semibold text-brand-muted tracking-widest uppercase">
                04 · EXPLORACIÓN DEL LOGO
              </div>
              <h2 className="font-editorial text-4xl font-normal leading-tight tracking-tight text-brand-ink sm:text-6xl">
                Tres propuestas para GARAM.<br />
                <span className="font-normal text-brand-muted">
                  Una esencia, tres lenguajes visuales.
                </span>
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-brand-muted">
                Monograma, tipografía y sello compacto: cada ruta conserva el índigo GARAM.
              </p>
            </div>

            <div className="text-xs font-semibold tracking-wide text-brand-ink">
              Rutas conceptuales · 2026
            </div>
          </div>
        </FadeIn>

        <LogoConcepts />

        {/* Color Palette Breakdown Cards */}
        <FadeIn delay={0.2} direction="up">
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2.5">
              <Palette className="w-5 h-5 text-brand-ink" />
              <h3 className="font-editorial text-2xl font-normal tracking-tight text-brand-ink">
                Paleta cromática digital GARAM
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {garamDigitalPalette.map((color) => (
                <motion.div
                  key={color.hex}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                  className="bg-white rounded-2xl border border-brand-stone overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  {/* Swatch */}
                  <div
                    className={`h-28 w-full p-4 flex items-end justify-between transition-colors ${
                      color.border ? 'border-b border-brand-stone' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="font-mono text-xs font-bold px-2 py-1 rounded bg-black/60 text-white backdrop-blur-sm"
                    >
                      {color.hex}
                    </span>

                    <button
                      onClick={() => handleCopy(color.hex)}
                      className="p-1.5 bg-white/90 text-brand-ink rounded-md shadow hover:bg-white transition-colors"
                      title="Copiar código HEX"
                      aria-label={`Copiar ${color.name} (${color.hex})`}
                    >
                      {copiedColor === color.hex ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-1.5 font-sans">
                    <h4 className="font-bold text-sm text-brand-ink">{color.name}</h4>
                    <div className="text-[11px] font-mono text-brand-muted/80">
                      RGB: {color.rgb}
                    </div>
                    <p className="text-xs text-brand-muted pt-1 leading-relaxed">
                      {color.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
