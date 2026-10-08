import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './MotionReveal';
import { PROJECTS } from '../data/portfolioData';
import { handleImageError } from '../utils/imageFallback';
import { HomepageHero } from './HomepageHero';


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
    <>
      <HomepageHero
        onOpenPresentation={onOpenPresentation}
        onOpenInquiry={onOpenInquiry}
      />
      <section className="relative overflow-hidden border-b border-brand-stone bg-brand-paper py-14 font-sans text-brand-ink sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 sm:px-6 lg:px-8">
        
        <FadeIn delay={0.1} direction="up">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-copper">
              Portafolio · Caracas y Galipán
            </p>
            <h2 className="mt-3 font-editorial text-3xl font-normal leading-tight tracking-tight text-brand-ink sm:text-4xl lg:text-5xl">
              Obras donde la visión toma forma.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
              Un recorrido por los espacios, materiales y decisiones que definen cada proyecto.
            </p>
          </div>
        </FadeIn>

        {/* Featured project showcase */}
        <FadeIn delay={0.45} direction="up" distance={30}>
          <div className="relative overflow-hidden rounded-2xl border border-brand-stone bg-white shadow-md">
            <div className="grid min-h-[520px] grid-cols-1 items-stretch lg:grid-cols-12">
              
              {/* Left Content Column: Dynamically Synchronized with Active Photo */}
              <div className="order-2 flex flex-col justify-between gap-6 bg-white p-6 sm:p-9 lg:order-2 lg:col-span-5">
                
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
                    <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-brand-ink bg-brand-ink/10 px-2 py-0.5 rounded">
                          {currentProject.number}
                        </span>
                        <span>{currentProject.category}</span>
                      </div>
                      <span className="text-[11px] font-medium tracking-wide text-brand-ink bg-brand-ink/5 px-2.5 py-0.5 rounded-full normal-case">
                        {currentProject.location}
                      </span>
                    </div>

                    {/* Work Title */}
                    <div>
                      <h2 className="font-editorial text-3xl font-normal tracking-tight text-brand-ink sm:text-4xl">
                        {currentProject.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-brand-muted/80 mt-0.5">
                        {currentProject.subtitle}
                      </p>
                    </div>

                    {/* Synchronized Photo Focus Card */}
                    <div className="p-3.5 rounded-2xl bg-white border border-brand-stone shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-ink">
                          <Sparkles className="w-3.5 h-3.5 text-brand-ink" />
                          Ángulo Activo ({activePhotoIdx + 1} de {gallery.length})
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-paper text-brand-ink">
                          {getPhotoTypeLabel(currentPhoto.type)}
                        </span>
                      </div>
                      <p className="text-xs text-brand-ink font-medium leading-relaxed">
                        {currentPhoto.caption}
                      </p>
                    </div>

                    {/* Specific Technical Feature synchronized with Photo */}
                    <div className="p-3.5 rounded-2xl bg-brand-paper border border-brand-stone text-xs space-y-1.5">
                      <span className="font-semibold text-brand-muted/80 text-[11px] block uppercase tracking-wide">
                        Detalle Constructivo en Foco:
                      </span>
                      <p className="text-brand-ink font-medium">
                        {currentProject.keyFeatures[activePhotoIdx % currentProject.keyFeatures.length]}
                      </p>
                      <div className="pt-1 text-[11px] text-brand-muted">
                        <span className="font-semibold text-brand-ink">Material Predominante: </span>
                        {currentProject.materials[activePhotoIdx % currentProject.materials.length]}
                      </div>
                    </div>

                    {/* Specs List */}
                    <div className="pt-2 space-y-2.5 border-t border-brand-stone text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-brand-muted/80">Ubicación</span>
                        <span className="font-semibold text-brand-ink">{currentProject.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-muted/80">Área</span>
                        <span className="font-semibold text-brand-ink">{currentProject.area}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-muted/80">Estatus</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {currentProject.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Card CTAs */}
                <div className="pt-3 border-t border-brand-stone flex items-center justify-between">
                  <a
                    href="#obras"
                    className="text-xs font-semibold text-brand-ink hover:underline flex items-center gap-1.5"
                  >
                    <span>Ver ficha completa de obra</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                </div>

              </div>

              {/* Right Cinematic Photography Showcase */}
              <div
                className="group relative order-1 min-h-[360px] select-none overflow-hidden bg-slate-900 lg:order-1 lg:col-span-7 lg:min-h-[520px]"
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
                  <span className="px-3 py-1 rounded-full ios-glass text-[11px] font-semibold text-brand-ink shadow-sm pointer-events-auto">
                    Obra {currentProject.number} · {currentProject.title}
                  </span>

                  {gallery.length > 1 && (
                    <div className="flex items-center gap-1.5 pointer-events-auto bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                      <button
                        onClick={handlePrevPhoto}
                        className="p-1 text-white hover:text-brand-copper-light rounded-full transition-colors cursor-pointer"
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
                        className="p-1 text-white hover:text-brand-copper-light rounded-full transition-colors cursor-pointer"
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

                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="self-center rounded-md bg-white px-4 py-2 text-xs font-semibold text-brand-ink shadow-md transition-colors hover:bg-brand-paper pointer-events-auto flex items-center gap-1.5 sm:self-end"
                  >
                    <span>Consultar este proyecto</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* Portfolio discovery controls follow the featured work */}
        <FadeIn delay={0.15} direction="up">
          <div className="flex flex-col gap-4 border-y border-brand-stone py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="shrink-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
                  Explora el portafolio
                </p>
                <p className="mt-1 text-sm font-semibold text-brand-ink">
                  {filteredProjects.length} de {PROJECTS.length} obras
                </p>
              </div>

              <div
                role="group"
                aria-label="Filtrar obras por categoría"
                className="flex max-w-full items-center gap-1 overflow-x-auto rounded-md border border-brand-stone bg-white p-1 scrollbar-none"
              >
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      aria-pressed={isActive}
                      className={`relative z-10 shrink-0 whitespace-nowrap rounded-sm px-3 py-2 text-xs font-semibold transition-colors ${
                        isActive ? 'text-white' : 'text-brand-muted hover:text-brand-ink'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="heroActiveCategory"
                          className="absolute inset-0 -z-10 rounded-sm bg-brand-ink"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span>{cat.label}</span>
                      <span className="ml-1 text-[10px] opacity-70">({cat.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <button
                onClick={handlePrevProject}
                className="flex size-9 shrink-0 items-center justify-center rounded-md border border-brand-stone bg-white text-brand-ink transition-colors hover:border-brand-copper"
                title="Obra anterior"
                aria-label="Obra anterior"
              >
                <ChevronLeft className="size-4" />
              </button>

              <div
                role="group"
                aria-label="Seleccionar obra destacada"
                className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-1 scrollbar-none"
              >
                {filteredProjects.map((project) => {
                  const isSelected = project.id === selectedProjectId;
                  return (
                    <button
                      key={project.id}
                      onClick={() => setSelectedProjectId(project.id)}
                      aria-pressed={isSelected}
                      className={`flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
                        isSelected
                          ? 'border-brand-ink bg-brand-ink text-white'
                          : 'border-brand-stone bg-white text-brand-muted hover:border-brand-copper hover:text-brand-ink'
                      }`}
                    >
                      <span className={`rounded px-1 font-mono text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-brand-paper text-brand-muted'}`}>
                        {project.number}
                      </span>
                      <span>{project.title}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextProject}
                className="flex size-9 shrink-0 items-center justify-center rounded-md border border-brand-stone bg-white text-brand-ink transition-colors hover:border-brand-copper"
                title="Siguiente obra"
                aria-label="Siguiente obra"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </FadeIn>

        </div>
      </section>
    </>
  );
};
