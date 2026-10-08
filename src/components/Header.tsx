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
    <header className="garam-glass-header sticky top-0 z-40 text-white transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        
        {/* Zone 1: Vector Brand Mark */}
        <a
          href="#inicio"
          onClick={handleNavClick}
          className="flex shrink-0 items-center gap-3 rounded-md p-1 transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
          aria-label="GARAM CONSTRUCTORES Inicio"
        >
          <GaramLogo variant="white" size="lg" showSubtitles={true} className="garam-header-logo" />
        </a>

        {/* Primary navigation */}
        <nav className="hidden items-center gap-6 text-[13px] font-medium tracking-wide text-white/70 xl:flex">
          <a
            href="#obras"
            onClick={handleNavClick}
            className="hover:text-brand-copper transition-colors py-2 relative group"
          >
            <span>Obras</span>
            <span className="ml-1 text-[10px] font-mono text-brand-muted group-hover:text-brand-copper">(11)</span>
          </a>
          <a
            href="#servicios"
            onClick={handleNavClick}
            className="hover:text-brand-copper transition-colors py-2"
          >
            Servicios
          </a>
          <a
            href="#nosotros"
            onClick={handleNavClick}
            className="hover:text-brand-copper transition-colors py-2"
          >
            Nosotros
          </a>
          <a
            href="#contacto"
            onClick={handleNavClick}
            className="hover:text-brand-copper transition-colors py-2"
          >
            Contacto
          </a>
        </nav>

        {/* Zone 3: Unified Action Buttons (Consistent Height & Visual Hierarchy) */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <button
            onClick={onToggleAiConsultant}
            className="garam-glass-button garam-glass-button--quiet flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold tracking-wide text-white transition-all"
            title="Asesor Arquitectónico GARAM"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-copper" />
            <span>Asesor Virtual</span>
          </button>

          <button
            onClick={onOpenInquiry}
            className="garam-glass-button garam-glass-button--primary flex h-10 items-center gap-2 rounded-full px-5 text-xs font-semibold tracking-wide text-white transition-all active:scale-[0.98]"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Consulta de Factibilidad</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="garam-glass-button garam-glass-button--quiet rounded-full p-2.5 text-white transition-all xl:hidden"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="garam-glass-mobile-menu animate-fade-in px-4 py-5 font-sans sm:px-6 xl:hidden">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-brand-ink">
            <a
              href="#obras"
              onClick={handleNavClick}
              className="py-1 flex items-center justify-between hover:text-brand-copper border-b border-brand-stone/70 pb-2"
            >
              <span>Obras Emblemáticas</span>
              <span className="text-xs font-mono text-brand-muted">11 Proyectos</span>
            </a>
            <a
              href="#servicios"
              onClick={handleNavClick}
              className="py-1 flex items-center justify-between hover:text-brand-copper border-b border-brand-stone/70 pb-2"
            >
              <span>Disciplinas y Servicios</span>
              <ArrowUpRight className="w-4 h-4 text-brand-muted" />
            </a>
            <a
              href="#nosotros"
              onClick={handleNavClick}
              className="py-1 flex items-center justify-between hover:text-brand-copper border-b border-brand-stone/70 pb-2"
            >
              <span>Perfil & Enfoque</span>
              <ArrowUpRight className="w-4 h-4 text-brand-muted" />
            </a>
            <a
              href="#contacto"
              onClick={handleNavClick}
              className="flex items-center justify-between py-2 hover:text-brand-copper"
            >
              <span>Contacto Directo</span>
              <ArrowUpRight className="w-4 h-4 text-brand-muted" />
            </a>
          </nav>

          {/* Mobile Actions */}
          <div className="flex flex-col gap-3 pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="garam-glass-button garam-glass-button--primary flex h-11 w-full items-center justify-center gap-2 rounded-full text-xs font-semibold tracking-wide text-white"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Reunión Técnica de Factibilidad</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleAiConsultant();
              }}
              className="garam-glass-button garam-glass-button--quiet flex h-11 w-full items-center justify-center gap-2 rounded-full text-xs font-semibold tracking-wide text-brand-ink"
            >
              <Sparkles className="w-4 h-4 text-brand-copper" />
              <span>Consultar con Asesor Virtual</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
