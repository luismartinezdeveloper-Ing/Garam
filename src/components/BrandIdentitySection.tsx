import React, { useState } from 'react';
import { GaramLogo } from './GaramLogo';
import { Palette, Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionReveal';

export const BrandIdentitySection: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const appleBrandColors = [
    {
      name: 'Blanco Puro Lienzo',
      hex: '#ffffff',
      rgb: '255, 255, 255',
      role: 'Fondo Primario Dominante (Estilo Keynote / Apple)',
      textColor: '#25225a',
      border: true,
    },
    {
      name: 'Azul Índigo GARAM (Logo)',
      hex: '#25225a',
      rgb: '37, 34, 90',
      role: 'Tipografía Principal, Logo Oficial y Botones de Acción',
      textColor: '#ffffff',
    },
    {
      name: 'Gris Neutro Superficies',
      hex: '#f5f5f7',
      rgb: '245, 245, 247',
      role: 'Tarjetas Bento, Selectores y Elementos Estructurales',
      textColor: '#25225a',
      border: true,
    },
    {
      name: 'Gris Grafito Apple',
      hex: '#6e6e73',
      rgb: '110, 110, 115',
      role: 'Subtítulos, Párrafos Explicativos y Metadatos Silenciosos',
      textColor: '#ffffff',
    },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <section id="identidad" className="py-20 sm:py-28 bg-white border-b border-[#e5e5ea] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Apple Section Header */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e5e5ea] pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-semibold text-[#6e6e73] tracking-widest uppercase">
                04 · IDENTIDAD DE MARCA & LOGO OFICIAL
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#25225a]">
                Identidad visual pura.<br />
                <span className="text-[#6e6e73] font-normal">
                  Blanco impecable con tipografía en azul índigo original.
                </span>
              </h2>
            </div>

            <div className="text-xs font-semibold text-[#25225a]">
              Vector Oficial 2026
            </div>
          </div>
        </FadeIn>

        {/* Logo Vectors Comparison Cards with Stagger */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1: Logo Oficial en Fondo Blanco Puro */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-[#fbfbfd] rounded-3xl p-8 border border-[#e5e5ea] space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all h-full"
            >
              <div className="space-y-4">
                <div className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
                  Logo Principal · Fondo Blanco Puro
                </div>
                <div className="p-8 bg-white rounded-2xl border border-[#e5e5ea] flex items-center justify-center min-h-[160px] shadow-sm">
                  <GaramLogo variant="dark" size="lg" showSubtitles={true} />
                </div>
              </div>
              <p className="text-xs text-[#6e6e73] leading-relaxed">
                Diseño vectorial con la pata descendente en las letras <strong>A</strong> y las torres 3D flanqueando la <strong>M</strong>.
              </p>
            </motion.div>
          </StaggerItem>

          {/* Card 2: Logo en Superficie Gris Suave Apple */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-[#fbfbfd] rounded-3xl p-8 border border-[#e5e5ea] space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all h-full"
            >
              <div className="space-y-4">
                <div className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
                  Logo en Superficie Neutra
                </div>
                <div className="p-8 bg-[#f5f5f7] rounded-2xl border border-[#e5e5ea] flex items-center justify-center min-h-[160px]">
                  <GaramLogo variant="dark" size="lg" showSubtitles={true} />
                </div>
              </div>
              <p className="text-xs text-[#6e6e73] leading-relaxed">
                Equilibrio óptico sobre superficies secundarias con texto <code className="font-mono text-[#25225a]">CONSTRUCTORES</code>.
              </p>
            </motion.div>
          </StaggerItem>

          {/* Card 3: Logo Invertido en Azul Índigo */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-[#25225a] rounded-3xl p-8 text-white space-y-6 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all h-full"
            >
              <div className="space-y-4">
                <div className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                  Variante Invertida · Azul Índigo
                </div>
                <div className="p-8 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center min-h-[160px] backdrop-blur-md">
                  <GaramLogo variant="white" size="lg" showSubtitles={true} />
                </div>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Para aplicaciones corporativas de alta gama, señalética de obra y publicaciones institucionales.
              </p>
            </motion.div>
          </StaggerItem>

        </StaggerContainer>

        {/* Color Palette Breakdown Cards */}
        <FadeIn delay={0.2} direction="up">
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2.5">
              <Palette className="w-5 h-5 text-[#25225a]" />
              <h3 className="text-xl font-bold tracking-tight text-[#25225a]">
                Paleta Cromática: Blanco & Azul Índigo
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {appleBrandColors.map((color) => (
                <motion.div
                  key={color.hex}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                  className="bg-[#fbfbfd] rounded-2xl border border-[#e5e5ea] overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  {/* Swatch */}
                  <div
                    className={`h-28 w-full p-4 flex items-end justify-between cursor-pointer transition-all ${
                      color.border ? 'border-b border-[#e5e5ea]' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleCopy(color.hex)}
                  >
                    <span
                      className="font-mono text-xs font-bold px-2 py-1 rounded bg-black/60 text-white backdrop-blur-sm"
                    >
                      {color.hex}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(color.hex);
                      }}
                      className="p-1.5 bg-white/90 text-[#25225a] rounded-md shadow hover:bg-white transition-colors"
                      title="Copiar código HEX"
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
                    <h4 className="font-bold text-sm text-[#25225a]">{color.name}</h4>
                    <div className="text-[11px] font-mono text-[#86868b]">
                      RGB: {color.rgb}
                    </div>
                    <p className="text-xs text-[#6e6e73] pt-1 leading-relaxed">
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
