import React, { useState } from 'react';
import { Sparkles, MessageSquarePlus, Menu, X, ArrowUpRight } from 'lucide-react';
import { GaramLogo } from './GaramLogo';

interface HeaderProps {
  onOpenPresentation?: () => void;
  onOpenInquiry: () => void;
  onToggleAiConsultant: () => void;
  onDismissAll?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInquiry,
  onToggleAiConsultant,
  onDismissAll,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    onDismissAll?.();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-[#e5e5ea]/80 text-[#25225a] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-6">
        
        {/* Zone 1: Vector Brand Mark */}
        <a
          href="#"
          onClick={handleNavClick}
          className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#25225a]/20 rounded-xl p-1 transition-transform hover:scale-[1.01]"
          aria-label="GARAM CONSTRUCTORES Inicio"
        >
          <GaramLogo variant="dark" size="md" showSubtitles={true} />
        </a>

        {/* Zone 2: Navigation Links (Airy, Generous Kerning & Apple Typography) */}
        <nav className="hidden lg:flex items-center gap-9 text-[13px] font-medium tracking-wide text-[#25225a]/70">
          <a
            href="#obras"
            onClick={handleNavClick}
            className="hover:text-[#25225a] transition-colors py-2 relative group"
          >
            <span>Obras</span>
            <span className="ml-1 text-[10px] font-mono text-[#86868b] group-hover:text-[#25225a]">(11)</span>
          </a>
          <a
            href="#servicios"
            onClick={handleNavClick}
            className="hover:text-[#25225a] transition-colors py-2"
          >
            Servicios
          </a>
          <a
            href="#estimador"
            onClick={handleNavClick}
            className="hover:text-[#25225a] transition-colors py-2"
          >
            Estimador
          </a>
          <a
            href="#nosotros"
            onClick={handleNavClick}
            className="hover:text-[#25225a] transition-colors py-2"
          >
            Nosotros
          </a>
          <a
            href="#identidad"
            onClick={handleNavClick}
            className="hover:text-[#25225a] transition-colors py-2"
          >
            Identidad
          </a>
          <a
            href="#contacto"
            onClick={handleNavClick}
            className="hover:text-[#25225a] transition-colors py-2"
          >
            Contacto
          </a>
        </nav>

        {/* Zone 3: Unified Action Buttons (Consistent Height & Visual Hierarchy) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleAiConsultant}
            className="h-10 px-4 text-xs font-semibold tracking-wide rounded-full bg-[#f5f5f7] text-[#25225a] hover:bg-[#ebebf0] hover:text-[#25225a] transition-all flex items-center gap-2 cursor-pointer border border-transparent hover:border-[#e5e5ea]"
            title="Asesor Arquitectónico GARAM"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Asesor Virtual</span>
          </button>

          <button
            onClick={onOpenInquiry}
            className="h-10 px-5 text-xs font-semibold tracking-wide rounded-full bg-[#25225a] text-white hover:bg-[#1d1b46] transition-all flex items-center gap-2 shadow-xs hover:shadow-md active:scale-98 cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Consulta de Factibilidad</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-[#25225a] rounded-xl bg-[#f5f5f7] hover:bg-[#ebebed] transition-colors cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-[#e5e5ea] px-6 py-6 space-y-6 animate-fade-in font-sans">
          <nav className="flex flex-col space-y-4 text-sm font-semibold text-[#25225a]">
            <a
              href="#obras"
              onClick={handleNavClick}
              className="py-1 flex items-center justify-between hover:text-blue-900 border-b border-[#f5f5f7] pb-2"
            >
              <span>Obras Emblemáticas</span>
              <span className="text-xs font-mono text-[#86868b]">11 Proyectos</span>
            </a>
            <a
              href="#servicios"
              onClick={handleNavClick}
              className="py-1 flex items-center justify-between hover:text-blue-900 border-b border-[#f5f5f7] pb-2"
            >
              <span>Disciplinas y Servicios</span>
              <ArrowUpRight className="w-4 h-4 text-[#86868b]" />
            </a>
            <a
              href="#estimador"
              onClick={handleNavClick}
              className="py-1 flex items-center justify-between hover:text-blue-900 border-b border-[#f5f5f7] pb-2"
            >
              <span>Calculadora de Estimados</span>
              <ArrowUpRight className="w-4 h-4 text-[#86868b]" />
            </a>
            <a
              href="#nosotros"
              onClick={handleNavClick}
              className="py-1 flex items-center justify-between hover:text-blue-900 border-b border-[#f5f5f7] pb-2"
            >
              <span>Perfil & Enfoque</span>
              <ArrowUpRight className="w-4 h-4 text-[#86868b]" />
            </a>
            <a
              href="#contacto"
              onClick={handleNavClick}
              className="py-1 flex items-center justify-between hover:text-blue-900"
            >
              <span>Contacto Directo</span>
              <ArrowUpRight className="w-4 h-4 text-[#86868b]" />
            </a>
          </nav>

          {/* Mobile Actions */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full h-11 rounded-full bg-[#25225a] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Reunión Técnica de Factibilidad</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleAiConsultant();
              }}
              className="w-full h-11 rounded-full bg-[#f5f5f7] text-[#25225a] text-xs font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Consultar con Asesor Virtual</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
