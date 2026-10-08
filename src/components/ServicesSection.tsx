import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionReveal';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
}) => {
  return (
    <section id="servicios" className="py-20 sm:py-28 bg-brand-paper border-b border-brand-stone font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-stone pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-semibold text-brand-muted tracking-widest uppercase flex items-center gap-2">
                <span>02 · DISCIPLINAS TÉCNICAS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-ink" />
                <span className="text-brand-ink font-bold">ALCANCE INTEGRAL DE OBRA</span>
              </div>
              <h2 className="font-editorial text-4xl font-normal leading-tight tracking-tight text-brand-ink sm:text-6xl">
                Capacidades de extremo a extremo.<br />
                <span className="text-brand-muted font-normal">
                  Desde la factibilidad hasta la entrega llave en mano.
                </span>
              </h2>
            </div>

            <div className="text-xs font-semibold text-brand-ink font-mono uppercase tracking-wider">
              6 Disciplinas Especializadas
            </div>
          </div>
        </FadeIn>

        {/* Staggered Grid of 6 Services with Sculptural Typography */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES.map((service, idx) => (
            <StaggerItem key={service.id}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-brand-stone bg-white p-8 shadow-sm transition-all duration-300 hover:border-brand-ink/30 hover:shadow-md sm:p-9"
              >
                {/* Sculptural Background Chapter Number */}
                <div className="absolute -right-3 -bottom-5 text-8xl font-extrabold text-brand-stone/70 select-none pointer-events-none transition-transform group-hover:scale-110 group-hover:text-brand-stone -z-0 font-sans">
                  0{idx + 1}
                </div>

                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between text-xs font-mono text-brand-muted/80 border-b border-brand-stone pb-3">
                    <span className="font-bold text-brand-ink">CAPÍTULO 0{idx + 1}</span>
                    <span className="text-[10px] uppercase tracking-wider">GARAM SERVICE</span>
                  </div>

                  <h3 className="font-editorial text-2xl font-normal tracking-tight text-brand-ink transition-colors group-hover:text-brand-copper">
                    {service.title}
                  </h3>

                  <p className="text-sm text-brand-muted leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {/* Scope items */}
                  <div className="pt-3 space-y-2">
                    <div className="text-[11px] font-bold text-brand-ink uppercase tracking-wider">
                      Alcance del Servicio:
                    </div>
                    {service.scopeItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-brand-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-ink mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2 relative z-10">
                  <button
                    onClick={() => onSelectServiceForInquiry(service.title)}
                    className="w-full py-2.5 rounded-md bg-white border border-brand-stone text-xs font-semibold text-brand-ink hover:bg-brand-ink hover:text-white transition-all flex items-center justify-center gap-2 group-hover:border-brand-ink shadow-xs cursor-pointer"
                  >
                    <span>Consultar este Servicio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};
