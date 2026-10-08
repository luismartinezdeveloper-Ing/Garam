import React from 'react';
import { COMPANY_INFO } from '../data/portfolioData';
import { Presentation, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { GaramLogo } from './GaramLogo';

interface FooterProps {
  onOpenPresentation: () => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPresentation,
  onOpenInquiry,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacto" className="bg-white pt-20 pb-12 border-t border-brand-stone font-sans text-brand-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Closing call to action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-brand-stone pb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold text-brand-muted tracking-widest uppercase">
              GARAM CONSTRUCTORES · PORTAFOLIO 2026
            </div>
            <h2 className="font-editorial text-4xl font-normal leading-tight tracking-tight text-brand-ink sm:text-6xl">
              Construir con sentido.<br />
              <span className="text-brand-muted font-normal">Construir con GARAM.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#obras"
              className="px-5 py-2.5 rounded-md border border-brand-ink/20 text-brand-ink text-xs font-semibold tracking-wide hover:bg-white transition-all flex items-center gap-2 bg-white/50"
            >
              <span>Explorar Obras (11)</span>
            </a>

            <button
              onClick={onOpenInquiry}
              className="px-6 py-2.5 rounded-md bg-brand-ink text-white text-xs font-semibold tracking-wide hover:bg-brand-ink/90 transition-all shadow-sm"
            >
              Reunión de Factibilidad
            </button>
          </div>
        </div>

        {/* 3-Column Footer Information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-xs text-brand-muted">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <GaramLogo variant="dark" size="md" showSubtitles={true} />
            </div>

            <p className="leading-relaxed font-normal max-w-sm pt-2">
              Promoción inmobiliaria, gerencia técnica y construcción de obras residenciales, comerciales, corporativas y de infraestructura médica especializada.
            </p>

            <div className="text-[11px] font-semibold text-brand-ink tracking-wider uppercase pt-1">
              PROMOCIÓN · GERENCIA · CONSTRUCCIÓN
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-brand-ink tracking-wider uppercase">
              Navegación
            </div>
            <ul className="space-y-2 text-[12px]">
              <li>
                <a href="#obras" className="hover:text-brand-copper transition-colors">
                  Obras y Proyectos (11)
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-brand-copper transition-colors">
                  Servicios Integrales
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-brand-copper transition-colors">
                  Perfil Corporativo & Enfoque
                </a>
              </li>
              <li>
                <a href="#identidad" className="hover:text-brand-copper transition-colors">
                  Identidad de Marca & Logo
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-brand-ink tracking-wider uppercase">
              Oficinas Principales
            </div>

            <div className="space-y-2 text-[12px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-ink shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.contactInfo.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-ink shrink-0" />
                <a href={`tel:${COMPANY_INFO.contactInfo.phone.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-brand-copper">{COMPANY_INFO.contactInfo.phone}</a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-ink shrink-0" />
                <a href={`mailto:${COMPANY_INFO.contactInfo.email}`} className="transition-colors hover:text-brand-copper">{COMPANY_INFO.contactInfo.email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Minimalist Attribution Bar */}
        <div className="pt-8 border-t border-brand-stone flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-muted/80">
          <div>
            © {COMPANY_INFO.year} GARAM CONSTRUCTORES. Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-brand-muted">
              Frontend diseñado por el <span className="font-semibold text-brand-ink">Ing. Luis Martínez</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-brand-stone">·</span>
            <span>Caracas · Venezuela</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-brand-ink font-semibold hover:underline transition-colors"
            >
              <span>Volver arriba</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
