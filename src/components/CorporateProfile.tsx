import React from 'react';
import { CheckCircle2, ShieldCheck, Award, Building2, HardHat } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionReveal';

const IMPACT_METRICS = [
  {
    value: '25.000+',
    unit: 'm²',
    label: 'Superficie Construida',
    sublabel: 'Obras de alta complejidad técnica',
    icon: Building2,
  },
  {
    value: '15+',
    unit: 'Años',
    label: 'Trayectoria Ininterrumpida',
    sublabel: 'Solvencia y reputación en el sector',
    icon: Award,
  },
  {
    value: '11',
    unit: 'Obras',
    label: 'Proyectos Emblemáticos',
    sublabel: 'Residencial, comercial y hospitalario',
    icon: HardHat,
  },
  {
    value: '100%',
    unit: 'Rigor',
    label: 'Cumplimiento Técnico',
    sublabel: 'Garantía estructural y acabados',
    icon: ShieldCheck,
  },
];

export const CorporateProfile: React.FC = () => {
  return (
    <section id="nosotros" className="py-20 sm:py-28 bg-[#f5f5f7] border-b border-[#e5e5ea] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold text-[#6e6e73] tracking-widest uppercase flex items-center gap-2">
              <span>01 · PERFIL & ENFOQUE INSTITUCIONAL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#25225a]" />
              <span className="text-[#25225a] font-bold">GARAM CONSTRUCTORES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#25225a]">
              La ingeniería del detalle.<br />
              <span className="text-[#6e6e73] font-normal">
                La visión de hacer que perdure.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed font-normal pt-2">
              GARAM Constructores integra promoción, gerencia de proyectos y construcción técnica de alto estándar. Nuestro propósito es transformar proyectos en activos con valor patrimonial indiscutible.
            </p>
          </div>
        </FadeIn>

        {/* Sculptural Impact Metrics Banner */}
        <FadeIn delay={0.1} direction="up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {IMPACT_METRICS.map((metric, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5e5ea] shadow-xs hover:shadow-lg transition-all space-y-3 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between text-[#86868b]">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                    Métrica 0{idx + 1}
                  </span>
                  <metric.icon className="w-4 h-4 text-[#25225a]/60 group-hover:text-[#25225a] transition-colors" />
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#25225a] font-sans flex items-baseline gap-1">
                    <span>{metric.value}</span>
                    <span className="text-sm sm:text-base font-semibold text-[#86868b]">
                      {metric.unit}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#25225a] tracking-tight">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-[#6e6e73] leading-tight">
                    {metric.sublabel}
                  </div>
                </div>

                {/* Subtle bottom decorative accent */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-[#25225a] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Bento Grid with Sculptural Background Watermarks */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Bento Card 1: Rigor de Ejecución */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e5e5ea] shadow-xs flex flex-col justify-between space-y-8 hover:shadow-xl transition-all h-full relative overflow-hidden group"
            >
              {/* Background Sculptural Watermark */}
              <div className="absolute -right-4 -bottom-6 text-8xl sm:text-9xl font-extrabold text-[#f5f5f7] select-none pointer-events-none transition-transform group-hover:scale-105 group-hover:text-[#ebebed] -z-0">
                01
              </div>

              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] text-[#25225a] flex items-center justify-center font-bold text-lg shadow-xs">
                  01
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#25225a]">
                  Diseño y Ejecución
                </h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">
                  Cada obra responde a un diálogo estrecho entre arquitectura y rigor estructural. Minimizamos desviaciones y garantizamos precisión milimétrica en concreto obra limpia, instalaciones y carpintería.
                </p>
              </div>

              <div className="pt-6 border-t border-[#e5e5ea] space-y-2 text-xs text-[#25225a] relative z-10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25225a]" />
                  <span>Supervisión técnica permanente en campo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25225a]" />
                  <span>Ensayos de compresión y control de mezclas</span>
                </div>
              </div>
            </motion.div>
          </StaggerItem>

          {/* Bento Card 2: Alianzas de Valor */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e5e5ea] shadow-xs flex flex-col justify-between space-y-8 hover:shadow-xl transition-all h-full relative overflow-hidden group"
            >
              {/* Background Sculptural Watermark */}
              <div className="absolute -right-4 -bottom-6 text-8xl sm:text-9xl font-extrabold text-[#f5f5f7] select-none pointer-events-none transition-transform group-hover:scale-105 group-hover:text-[#ebebed] -z-0">
                02
              </div>

              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] text-[#25225a] flex items-center justify-center font-bold text-lg shadow-xs">
                  02
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#25225a]">
                  Alianzas de Valor
                </h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">
                  Colaboramos con los estudios de arquitectura, ingeniería y cálculo estructural más prestigiosos. Coordinamos equipos multidisciplinarios para una entrega fluida y sin retrasos.
                </p>
              </div>

              <div className="pt-6 border-t border-[#e5e5ea] space-y-2 text-xs text-[#25225a] relative z-10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25225a]" />
                  <span>Coordinación BIM e interoperabilidad</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25225a]" />
                  <span>Cadena de suministro de materiales nobles</span>
                </div>
              </div>
            </motion.div>
          </StaggerItem>

          {/* Bento Card 3: Estándar Premium */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e5e5ea] shadow-xs flex flex-col justify-between space-y-8 hover:shadow-xl transition-all h-full relative overflow-hidden group"
            >
              {/* Background Sculptural Watermark */}
              <div className="absolute -right-4 -bottom-6 text-8xl sm:text-9xl font-extrabold text-[#f5f5f7] select-none pointer-events-none transition-transform group-hover:scale-105 group-hover:text-[#ebebed] -z-0">
                03
              </div>

              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] text-[#25225a] flex items-center justify-center font-bold text-lg shadow-xs">
                  03
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#25225a]">
                  Estándar Premium
                </h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">
                  La excelencia no es un accidente, sino una metodología. Desde residencias de lujo en Altamira hasta quirófanos hospitalarios en Urgencias 9·11, nuestro compromiso es inquebrantable.
                </p>
              </div>

              <div className="pt-6 border-t border-[#e5e5ea] space-y-2 text-xs text-[#25225a] relative z-10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25225a]" />
                  <span>Garantía de postventa y manuales de obra</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25225a]" />
                  <span>Certificación técnica en áreas críticas</span>
                </div>
              </div>
            </motion.div>
          </StaggerItem>

        </StaggerContainer>

      </div>
    </section>
  );
};
