import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight, Building, Sparkles, MapPin, Calendar, Clock, DollarSign, MessageSquare } from 'lucide-react';
import { FadeIn } from './MotionReveal';

interface ConstructionEstimatorProps {
  onOpenInquiryWithData: (data: {
    service: string;
    area: string;
    location: string;
    timeline: string;
  }) => void;
}

const PROJECT_TYPES = [
  {
    id: 'residencial',
    title: 'Residencial de Alta Gama',
    subtitle: 'Villas unifamiliares, penthouses y complejos boutique',
    baseTimePer1000m2: 12, // meses
    complexity: 'Alta (Acabados de lujo, domótica y concreto visto)',
    defaultArea: 1200,
  },
  {
    id: 'corporativo',
    title: 'Sedes Corporativas & Oficinas',
    subtitle: 'Adecuación integral, tabiquería técnica y plantas libres',
    baseTimePer1000m2: 6,
    complexity: 'Media-Alta (Redes, HVAC, acústica normada)',
    defaultArea: 500,
  },
  {
    id: 'comercial',
    title: 'Edificación Comercial & Restaurantes',
    subtitle: 'Locales verticales, retail de lujo y gastronomía',
    baseTimePer1000m2: 8,
    complexity: 'Media-Alta (Fachadas, arcos, circulaciones)',
    defaultArea: 800,
  },
  {
    id: 'salud',
    title: 'Construcción Especializada & Salud',
    subtitle: 'Centros de urgencias 911, clínicas y áreas limpias',
    baseTimePer1000m2: 7,
    complexity: 'Muy Alta (Gases medicinales, asepsia, blindaje)',
    defaultArea: 450,
  },
  {
    id: 'urbanismo',
    title: 'Urbanismo & Terrazas de Montaña',
    subtitle: 'Movimientos de tierra, gaviones y estabilización de taludes',
    baseTimePer1000m2: 10,
    complexity: 'Especializada (Geotecnia en pendiente, drenajes)',
    defaultArea: 5000,
  },
];

const LOCATIONS = [
  'Urb. Altamira · Caracas',
  'Urb. La Castellana · Caracas',
  'El Rosal · Caracas',
  'Galipán · Parque Nacional El Ávila',
  'Chacao / Las Mercedes · Caracas',
  'Otra ubicación en Caracas / Miranda',
];

export const ConstructionEstimator: React.FC<ConstructionEstimatorProps> = ({
  onOpenInquiryWithData,
}) => {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [area, setArea] = useState<number>(PROJECT_TYPES[0].defaultArea);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [timeline, setTimeline] = useState('Inicio en 2026');

  // Calculate estimated duration
  const estimatedMonths = Math.max(
    4,
    Math.round((area / 1000) * selectedType.baseTimePer1000m2)
  );

  const handleSelectType = (type: (typeof PROJECT_TYPES)[0]) => {
    setSelectedType(type);
    setArea(type.defaultArea);
  };

  const handleRequestQuote = () => {
    onOpenInquiryWithData({
      service: selectedType.title,
      area: `${area.toLocaleString()} m²`,
      location: selectedLocation,
      timeline,
    });
  };

  return (
    <section id="estimador" className="py-20 sm:py-28 bg-[#18163f] text-white font-sans border-b border-[#25225a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-semibold text-amber-300 tracking-widest uppercase flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <span>ESTIMADOR DE ALCANCE Y METRAJE DE OBRA</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Planifica tu proyecto con rigor técnico.<br />
                <span className="text-white/60 font-normal">
                  Configura tipo de obra, metraje y ubicación para proyectar tiempos de ejecución.
                </span>
              </h2>
            </div>

            <div className="text-xs font-mono text-white/50">
              GARAM · METODOLOGÍA DE GERENCIA INTEGRAL
            </div>
          </div>
        </FadeIn>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 space-y-8 bg-white/5 p-6 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-md">
            
            {/* Step 1: Select Type */}
            <div className="space-y-3">
              <label className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                1. Selecciona la tipología de edificación
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleSelectType(type)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-400 bg-white/15 ring-2 ring-amber-400/50 shadow-lg'
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/10'
                      }`}
                    >
                      <div className="font-bold text-sm text-white mb-1">
                        {type.title}
                      </div>
                      <div className="text-[11px] text-white/70 line-clamp-2">
                        {type.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Area Slider */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                  2. Metraje estimado a construir / intervenir
                </label>
                <div className="px-4 py-1.5 rounded-full bg-white/15 border border-white/20 font-mono font-bold text-sm text-white">
                  {area.toLocaleString()} m²
                </div>
              </div>

              <input
                type="range"
                min="100"
                max={selectedType.id === 'urbanismo' ? 20000 : 40000}
                step={selectedType.id === 'urbanismo' ? 500 : 50}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-[10px] font-mono text-white/50">
                <span>100 m²</span>
                <span>{selectedType.id === 'urbanismo' ? '10.000 m²' : '2.500 m²'}</span>
                <span>{selectedType.id === 'urbanismo' ? '20.000+ m²' : '5.000+ m²'}</span>
              </div>
            </div>

            {/* Step 3: Location and Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                  3. Ubicación del terreno o inmueble
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#18163f] text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                  4. Plazo estimado de inicio
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Inmediato 2026" className="bg-[#18163f] text-white">Inmediato (1er semestre 2026)</option>
                  <option value="Segundo semestre 2026" className="bg-[#18163f] text-white">Segundo semestre 2026</option>
                  <option value="Planificación 2027" className="bg-[#18163f] text-white">Planificación 2027</option>
                </select>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Scope Projection Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-white/10 to-white/[0.02] p-8 rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                PROYECCIÓN TÉCNICA DE ALCANCE
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                GARAM 2026
              </div>
            </div>

            {/* Main Stats Highlight */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[#86868b] text-[11px] mb-1 flex items-center gap-1.5 text-white/60">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tiempo Estimado</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  ~{estimatedMonths} <span className="text-sm font-normal text-white/70">meses</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[#86868b] text-[11px] mb-1 flex items-center gap-1.5 text-white/60">
                  <Building className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Metraje Proyectado</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  {area.toLocaleString()} <span className="text-sm font-normal text-white/70">m²</span>
                </div>
              </div>
            </div>

            {/* Scope Items Included */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Fases incluidas en la gerencia GARAM:
              </div>
              <div className="space-y-2 text-xs text-white/80 font-normal">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Levantamiento topográfico, geotécnico y replanteo de arquitectura</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Cálculo estructural e ingeniería de fundaciones según zona sísmica</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Gerencia integral de contratistas, cronogramas y control de presupuesto</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Supervisión de acabados de alta gama y entrega llave en mano</span>
                </div>
              </div>
            </div>

            {/* Summary Tag */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
              <div className="text-white/60 text-[10px] uppercase font-mono">Tipología & Zona:</div>
              <div className="font-semibold text-white">{selectedType.title} en {selectedLocation}</div>
              <div className="text-white/60 text-[11px] pt-1">Complejidad: {selectedType.complexity}</div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleRequestQuote}
              className="w-full py-4 px-6 rounded-2xl bg-white text-[#18163f] hover:bg-amber-300 font-bold text-sm tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#18163f]" />
              <span>Solicitar Reunión de Factibilidad & Estimación de Obra</span>
              <ArrowRight className="w-4 h-4 text-[#18163f]" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
