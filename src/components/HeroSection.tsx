import React, { useState, useEffect } from 'react';
import { Presentation, ChevronRight, ChevronLeft, ArrowUpRight, Camera, Building, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionReveal';
import { PROJECTS } from '../data/portfolioData';
import { handleImageError } from '../utils/imageFallback';


interface HeroSectionProps {
  onOpenPresentation: () => void;
  onOpenInquiry: () => void;
}

const CATEGORIES = [
  { label: 'Todas las Obras', value: 'Todas', count: PROJECTS.length },
  { label: 'Residencial', value: 'Residencial', count: PROJECTS.filter(p => p.category === 'Residencial').length },
  { label: 'Comercial', value: 'Comercial', count: PROJECTS.filter(p => p.category === 'Comercial').length },
  { label: 'Corporativo', value: 'Corporativo', count: PROJECTS.filter(p => p.category === 'Corporativo').length },
  { label: 'Salud', value: 'Salud', count: PROJECTS.filter(p => p.category.includes('Salud')).length },
  { label: 'Urbanismo', value: 'Urbanismo', count: PROJECTS.filter(p => p.category === 'Urbanismo').length },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPresentation,
  onOpenInquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Filter projects by active category
  const filteredProjects = selectedCategory === 'Todas'
    ? PROJECTS
    : PROJECTS.filter(p => {
        if (selectedCategory === 'Salud') return p.category.includes('Salud');
        return p.category === selectedCategory;
      });

  // Ensure selected project is in filtered list
  useEffect(() => {
    if (!filteredProjects.some(p => p.id === selectedProjectId)) {
      if (filteredProjects.length > 0) {
        setSelectedProjectId(filteredProjects[0].id);
      }
    }
  }, [selectedCategory, filteredProjects, selectedProjectId]);

  // Reset photo index when switching project
  useEffect(() => {
    setActivePhotoIdx(0);
  }, [selectedProjectId]);

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];
  const gallery = currentProject.gallery && currentProject.gallery.length > 0
    ? currentProject.gallery
    : [{ url: currentProject.heroImage, caption: currentProject.subtitle, type: 'render' }];
  
  const currentPhoto = gallery[activePhotoIdx] || gallery[0];

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    setTouchStartX(null);
  };

  const handlePrevProject = () => {
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProjectId);
    const prevIndex = currentIndex <= 0 ? filteredProjects.length - 1 : currentIndex - 1;
    setSelectedProjectId(filteredProjects[prevIndex].id);
  };

  const handleNextProject = () => {
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProjectId);
    const nextIndex = currentIndex >= filteredProjects.length - 1 ? 0 : currentIndex + 1;
    setSelectedProjectId(filteredProjects[nextIndex].id);
  };

  // Format photo type badge
  const getPhotoTypeLabel = (type?: string) => {
    switch (type) {
      case 'render': return 'Render Arquitectónico';
      case 'obra': return 'Fotografía en Obra';
      case 'interior': return 'Interiorismo & Acabados';
      case 'antes_despues': return 'Transformación Antes / Después';
      default: return 'Registro Fotográfico GARAM';
    }
  };

  return (
    <section className="relative bg-white text-[#25225a] pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden font-sans border-b border-[#e5e5ea]">
      
      {/* Background Subtle Apple Glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#fbfbfd] to-white pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Apple Keynote Style Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <FadeIn delay={0.1} direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ios-glass text-[#25225a] text-xs font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#25225a] animate-pulse" />
              <span>GARAM Constructores · Portafolio de Obras 2026</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#25225a] font-sans leading-[1.08]">
              Construimos los espacios donde habita la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25225a] via-[#433e85] to-[#25225a]">
                excelencia.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <p className="text-base sm:text-lg md:text-xl text-[#6e6e73] font-normal max-w-2xl mx-auto leading-relaxed">
              Promoción, gerencia y construcción de 11 obras maestras residenciales, comerciales, corporativas y hospitalarias en Caracas y Galipán.
            </p>
          </FadeIn>

          {/* Action Buttons */}
          <FadeIn delay={0.35} direction="up">
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenInquiry}
                className="px-6 py-3 rounded-full bg-[#25225a] text-white text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#1b1842] transition-all shadow-md hover:shadow-lg flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Reunión de Factibilidad</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#obras"
                className="px-6 py-3 rounded-full bg-[#f5f5f7] text-[#25225a] text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#ebebf0] transition-all flex items-center gap-2 border border-[#e5e5ea] hover:scale-[1.02] active:scale-[0.98]"
              >
                <Building className="w-4 h-4 text-[#25225a]" />
                <span>Explorar Catálogo de Obras</span>
              </a>

              <a
                href="#estimador"
                className="px-6 py-3 rounded-full bg-white text-[#25225a] text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#f5f5f7] transition-all flex items-center gap-2 border border-[#25225a]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Calcular Estimado de Obra</span>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Category Filters Bar */}
        <FadeIn delay={0.4} direction="up">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-1.5 p-1.5 bg-[#f5f5f7] rounded-full border border-[#e5e5ea] overflow-x-auto max-w-full scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer z-10 ${
                      isActive
                        ? 'text-[#25225a]'
                        : 'text-[#6e6e73] hover:text-[#25225a]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="heroActiveCategory"
                        className="absolute inset-0 bg-white rounded-full shadow-xs -z-10"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span>{cat.label}</span>
                    <span className="ml-1.5 text-[10px] opacity-60">({cat.count})</span>
                  </button>
                );
              })}
            </div>

            {/* Horizontal Project Selector Strip (All 11 Works Available) */}
            <div className="w-full flex items-center justify-between gap-2 pt-1 max-w-5xl">
              <button
                onClick={handlePrevProject}
                className="p-2 rounded-full ios-glass text-[#25225a] hover:bg-white transition-all shadow-sm shrink-0 cursor-pointer"
                title="Obra anterior"
                aria-label="Obra anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-none max-w-full">
                {filteredProjects.map((p) => {
                  const isSelected = p.id === selectedProjectId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProjectId(p.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#25225a] text-white shadow-md scale-[1.02]'
                          : 'bg-[#f5f5f7] text-[#6e6e73] hover:bg-white hover:text-[#25225a] border border-[#e5e5ea]'
                      }`}
                    >
                      <span className={`text-[10px] font-mono px-1 rounded ${isSelected ? 'bg-white/20 text-white' : 'text-[#86868b]'}`}>
                        {p.number}
                      </span>
                      <span>{p.title}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextProject}
                className="p-2 rounded-full ios-glass text-[#25225a] hover:bg-white transition-all shadow-sm shrink-0 cursor-pointer"
                title="Siguiente obra"
                aria-label="Siguiente obra"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Featured Keynote Showcase Display Frame with Synchronized Image & Text */}
        <FadeIn delay={0.45} direction="up" distance={30}>
          <div className="relative bg-[#fbfbfd] rounded-3xl border border-[#e5e5ea] overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px]">
              
              {/* Left Content Column: Dynamically Synchronized with Active Photo */}
              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentProject.id}-${activePhotoIdx}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="space-y-4"
                  >
                    {/* Header info */}
                    <div className="flex items-center justify-between text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#25225a] bg-[#25225a]/10 px-2 py-0.5 rounded">
                          {currentProject.number}
                        </span>
                        <span>{currentProject.category}</span>
                      </div>
                      <span className="text-[11px] font-medium tracking-wide text-[#25225a] bg-[#25225a]/5 px-2.5 py-0.5 rounded-full normal-case">
                        {currentProject.location}
                      </span>
                    </div>

                    {/* Work Title */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#25225a]">
                        {currentProject.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#86868b] mt-0.5">
                        {currentProject.subtitle}
                      </p>
                    </div>

                    {/* Synchronized Photo Focus Card */}
                    <div className="p-3.5 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#25225a]">
                          <Sparkles className="w-3.5 h-3.5 text-[#25225a]" />
                          Ángulo Activo ({activePhotoIdx + 1} de {gallery.length})
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-[#433e85]">
                          {getPhotoTypeLabel(currentPhoto.type)}
                        </span>
                      </div>
                      <p className="text-xs text-[#25225a] font-medium leading-relaxed">
                        {currentPhoto.caption}
                      </p>
                    </div>

                    {/* Specific Technical Feature synchronized with Photo */}
                    <div className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] text-xs space-y-1.5">
                      <span className="font-semibold text-[#86868b] text-[11px] block uppercase tracking-wide">
                        Detalle Constructivo en Foco:
                      </span>
                      <p className="text-[#25225a] font-medium">
                        {currentProject.keyFeatures[activePhotoIdx % currentProject.keyFeatures.length]}
                      </p>
                      <div className="pt-1 text-[11px] text-[#6e6e73]">
                        <span className="font-semibold text-[#25225a]">Material Predominante: </span>
                        {currentProject.materials[activePhotoIdx % currentProject.materials.length]}
                      </div>
                    </div>

                    {/* Specs List */}
                    <div className="pt-2 space-y-2.5 border-t border-[#e5e5ea] text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#86868b]">Ubicación</span>
                        <span className="font-semibold text-[#25225a]">{currentProject.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#86868b]">Área</span>
                        <span className="font-semibold text-[#25225a]">{currentProject.area}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#86868b]">Estatus</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {currentProject.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Card CTAs */}
                <div className="pt-3 border-t border-[#e5e5ea] flex items-center justify-between">
                  <a
                    href="#obras"
                    className="text-xs font-semibold text-[#25225a] hover:underline flex items-center gap-1.5"
                  >
                    <span>Ver ficha completa de obra</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="#obras"
                    className="text-xs font-semibold text-[#25225a]/80 hover:text-[#25225a] underline"
                  >
                    Ver en catálogo
                  </a>
                </div>

              </div>

              {/* Right Cinematic Photography Showcase */}
              <div
                className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] bg-slate-900 overflow-hidden group select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  key={`${currentProject.id}-${activePhotoIdx}`}
                  src={currentPhoto.url || currentProject.heroImage}
                  alt={currentPhoto.caption || currentProject.title}
                  referrerPolicy="no-referrer"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                  onError={(e) => handleImageError(e, currentProject.heroImage)}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

                {/* Top Header Badge & Photo Navigation */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-3 py-1 rounded-full ios-glass text-[11px] font-semibold text-[#25225a] shadow-sm pointer-events-auto">
                    Obra {currentProject.number} · {currentProject.title}
                  </span>

                  {gallery.length > 1 && (
                    <div className="flex items-center gap-1.5 pointer-events-auto bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                      <button
                        onClick={handlePrevPhoto}
                        className="p-1 text-white hover:text-amber-300 rounded-full transition-colors cursor-pointer"
                        title="Foto anterior"
                        aria-label="Foto anterior"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] text-white/90 font-mono px-1">
                        {activePhotoIdx + 1}/{gallery.length}
                      </span>
                      <button
                        onClick={handleNextPhoto}
                        className="p-1 text-white hover:text-amber-300 rounded-full transition-colors cursor-pointer"
                        title="Siguiente foto"
                        aria-label="Siguiente foto"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct prev/next navigation overlays on hover for desktop */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                      title="Foto anterior"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                      title="Siguiente foto"
                      aria-label="Siguiente foto"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Bottom Bar: Photo Caption & Details */}
                <div className="absolute bottom-4 inset-x-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-10 pointer-events-none">
                  <div className="text-white text-xs font-medium max-w-md drop-shadow-md bg-black/60 backdrop-blur-md p-3.5 rounded-2xl pointer-events-auto border border-white/10">
                    <p className="line-clamp-2 font-medium">{currentPhoto.caption || currentProject.slogan}</p>
                    <div className="text-[10px] text-white/70 font-mono mt-1 flex items-center gap-2">
                      <span>{currentProject.location}</span>
                      <span>·</span>
                      <span>{currentProject.area}</span>
                    </div>
                  </div>

                  <a
                    href="#obras"
                    className="self-center sm:self-end px-4 py-2 rounded-full bg-white text-[#25225a] text-xs font-bold shadow-md hover:bg-slate-100 transition-all pointer-events-auto flex items-center gap-1.5"
                  >
                    <span>Ver en Catálogo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* Apple-style Quantitative Stats Bar with Stagger */}
        <StaggerContainer
          staggerDelay={0.09}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6"
        >
          <StaggerItem>
            <div className="p-6 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] space-y-1 hover:border-[#25225a]/30 transition-colors">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#25225a] font-sans">
                11
              </div>
              <div className="text-xs font-medium text-[#6e6e73]">
                Obras Mayores en Portafolio
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] space-y-1 hover:border-[#25225a]/30 transition-colors">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#25225a] font-sans">
                +25k m²
              </div>
              <div className="text-xs font-medium text-[#6e6e73]">
                Superficie Construida & Urbanizada
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] space-y-1 hover:border-[#25225a]/30 transition-colors">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#25225a] font-sans">
                +15
              </div>
              <div className="text-xs font-medium text-[#6e6e73]">
                Años de Trayectoria Constructiva
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] space-y-1 hover:border-[#25225a]/30 transition-colors">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#25225a] font-sans">
                100%
              </div>
              <div className="text-xs font-medium text-[#6e6e73]">
                Rigor Técnico y Normativa Estructural
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

      </div>
    </section>
  );
};
