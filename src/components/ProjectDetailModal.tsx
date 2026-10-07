import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { handleImageError } from '../utils/imageFallback';
import { BeforeAfterSlider } from './BeforeAfterSlider';

import {
  X,
  MapPin,
  Maximize2,
  Calendar,
  Layers,
  CheckCircle2,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  HardHat,
  Compass,
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Keyboard Escape and arrows dismissal/navigation
  React.useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
          setZoomLevel(1);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight') {
        setActiveMediaIdx((prev) => (prev + 1) % project.gallery.length);
        setZoomLevel(1);
      } else if (e.key === 'ArrowLeft') {
        setActiveMediaIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isLightboxOpen, project]);

  if (!project) return null;

  const activeMedia = project.gallery[activeMediaIdx] || project.gallery[0];
  const has8k = Boolean(activeMedia?.master8kUrl || project.has8kMasters);
  const displayUrl = isLightboxOpen && activeMedia?.master8kUrl ? activeMedia.master8kUrl : (activeMedia?.url || project.heroImage);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-md overflow-y-auto animate-fade-in font-sans cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl my-auto ios-glass-modal rounded-3xl overflow-hidden flex flex-col max-h-[92vh] cursor-default"
      >
        
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 ios-glass px-6 py-4 flex items-center justify-between border-b border-[#e5e5ea]/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#25225a] tracking-wider uppercase">
              PROYECTO {project.number}
            </span>
            <span className="text-[#86868b]">|</span>
            <span className="text-xs font-medium text-[#6e6e73]">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 text-[#6e6e73] hover:text-[#25225a] hover:bg-[#f5f5f7] rounded-full transition-colors cursor-pointer"
              aria-label="Cerrar ficha"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
          
          {/* Main Title & Slogan */}
          <div className="space-y-2 border-b border-[#e5e5ea] pb-6">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#25225a]">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#6e6e73] font-normal">
              "{project.subtitle}"
            </p>
          </div>

          {/* Technical Spec Sheet Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-[#f5f5f7] rounded-2xl border border-[#e5e5ea] text-xs">
            <div>
              <div className="text-[#86868b] mb-1">Ubicación</div>
              <div className="font-semibold text-[#25225a] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{project.location}</span>
              </div>
            </div>

            <div>
              <div className="text-[#86868b] mb-1">Área Construida</div>
              <div className="font-semibold text-[#25225a] flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                <span>{project.area}</span>
              </div>
            </div>

            {project.parcelArea && (
              <div>
                <div className="text-[#86868b] mb-1">Parcela</div>
                <div className="font-semibold text-[#25225a]">{project.parcelArea}</div>
              </div>
            )}

            <div>
              <div className="text-[#86868b] mb-1">Estatus Ejecución</div>
              <div className="font-semibold text-emerald-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>{project.status}</span>
              </div>
            </div>
          </div>

          {/* Media Gallery / Photography Viewer */}
          <div className="space-y-4">
            <div className="text-xs font-semibold text-[#6e6e73] flex items-center justify-between">
              <span>REGISTRO FOTOGRÁFICO DE OBRA ({project.gallery.length} FOTOGRAFÍAS)</span>
              <span className="hidden sm:inline">{project.location}</span>
            </div>

            {/* Selected Active Media Viewer */}
            {activeMedia && (
              <div className="space-y-2">
                {activeMedia.type === 'antes_despues' ? (
                  <BeforeAfterSlider
                    beforeImage={activeMedia.beforeUrl || activeMedia.url}
                    afterImage={activeMedia.afterUrl || activeMedia.url}
                    caption={activeMedia.caption}
                  />
                ) : (
                  <div
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative aspect-[16/9] rounded-2xl bg-slate-900 overflow-hidden border border-[#e5e5ea] shadow-xl group cursor-zoom-in"
                    title="Haz clic para ampliar a pantalla completa"
                  >
                    <img
                      src={activeMedia.url}
                      alt={activeMedia.caption}
                      referrerPolicy="no-referrer"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                      onError={(e) => handleImageError(e, project.heroImage)}
                    />


                    {/* Top Overlay Badge & Inspect button */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[11px] font-semibold pointer-events-auto">
                        Foto {activeMediaIdx + 1} de {project.gallery.length}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                        className="px-3 py-1.5 bg-black/65 hover:bg-black/85 backdrop-blur-md rounded-full text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer pointer-events-auto border border-white/20 hover:scale-105 active:scale-95"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-white" />
                        <span>Pantalla Completa</span>
                      </button>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white text-xs flex items-end justify-between gap-4">
                      <p className="line-clamp-2 max-w-2xl font-medium">{activeMedia.caption}</p>
                      <span className="text-[10px] text-white/70 font-mono shrink-0 hidden sm:inline">
                        Click para Zoom
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Gallery Thumbnails Strip */}
            {project.gallery.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                {project.gallery.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIdx(idx)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden transition-all border cursor-pointer group ${
                      activeMediaIdx === idx
                        ? 'border-[#25225a] ring-2 ring-[#25225a] opacity-100 scale-[1.02]'
                        : 'border-[#e5e5ea] opacity-65 hover:opacity-100 hover:border-[#25225a]/50'
                    }`}
                  >
                    <img
                      src={media.url}
                      alt={media.caption}
                      referrerPolicy="no-referrer"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => handleImageError(e, project.heroImage)}
                    />

                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Memoria Descriptiva & Specs */}
          <div className="space-y-8 pt-4 border-t border-[#e5e5ea]">
            
            {/* Top Grid: Memoria & Side Specs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 space-y-4">
                <div className="text-xs font-semibold text-[#86868b] tracking-wider uppercase flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#25225a]" />
                  <span>CONCEPTO & MEMORIA DESCRIPTIVA</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#25225a]">
                  Arquitectura pensada desde la materia y el lugar.
                </h3>
                <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed font-normal">
                  {project.memoria}
                </p>

                {/* Reto de Ingeniería & Desafío Estructural (Fase 1) */}
                {project.engineeringChallenge && (
                  <div className="mt-6 p-5 sm:p-6 bg-[#25225a] text-white rounded-2xl shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 tracking-wider uppercase font-mono">
                      <HardHat className="w-4 h-4 text-amber-400" />
                      <span>Reto de Ingeniería & Solución Estructural</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                      {project.engineeringChallenge}
                    </p>
                  </div>
                )}
              </div>

              <div className="md:col-span-5 space-y-6 bg-[#fbfbfd] p-6 rounded-2xl border border-[#e5e5ea]">
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#25225a]">
                    Especificaciones Clave:
                  </h4>
                  <ul className="space-y-2 text-xs text-[#6e6e73]">
                    {project.keyFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#25225a] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#e5e5ea]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#25225a]">
                    Materialidad Resumen:
                  </h4>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#25225a]">
                    {project.materials.map((mat, idx) => (
                      <span key={idx}>
                        {mat}
                        {idx < project.materials.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desglose de Materialidad Noble & Artesanía Constructiva (Fase 1) */}
            {project.detailedMaterials && project.detailedMaterials.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-[#e5e5ea]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-[#25225a] tracking-tight">
                      Materialidad & Especificación Técnica
                    </h4>
                    <p className="text-xs text-[#6e6e73]">
                      Catálogo de materiales nobles, ensayos y métodos constructivos aplicados en la obra.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#86868b] hidden sm:inline">
                    {project.detailedMaterials.length} Componentes
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.detailedMaterials.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 bg-white rounded-2xl border border-[#e5e5ea] space-y-2.5 shadow-2xs hover:border-[#25225a]/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#86868b] uppercase font-semibold">
                          0{idx + 1} · Material
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25225a]" />
                      </div>

                      <h5 className="text-sm font-bold text-[#25225a]">
                        {item.name}
                      </h5>

                      <div className="space-y-1 text-xs">
                        <div className="text-[#86868b] text-[11px] font-medium">Especificación:</div>
                        <div className="text-[#25225a] font-mono text-[11px] bg-[#f5f5f7] p-2 rounded-lg leading-relaxed">
                          {item.spec}
                        </div>
                      </div>

                      <div className="space-y-1 text-xs pt-1">
                        <div className="text-[#86868b] text-[11px] font-medium">Aplicación en obra:</div>
                        <div className="text-[#6e6e73] text-xs leading-relaxed">
                          {item.application}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#f5f5f7] border-t border-[#e5e5ea] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#86868b]">
            GARAM CONSTRUCTORES · PORTAFOLIO 2026
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-semibold rounded-full bg-[#25225a] text-white hover:bg-[#1d1b46] transition-all cursor-pointer shadow-sm"
            >
              Cerrar Ficha de Obra
            </button>
          </div>
        </div>

      </div>

      {/* Full-Screen 8K Ultra-HD Master Lightbox Overlay */}
      {isLightboxOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(false);
            setZoomLevel(1);
          }}
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 select-none animate-fade-in cursor-default"
        >
          {/* Lightbox Top Control Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between gap-4 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-white z-20 shrink-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-wider text-amber-400 flex items-center gap-1.5 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Visor 8K Ultra-HD</span>
              </span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-xs font-semibold text-white/90 hidden sm:inline">
                {project.title} · Foto {activeMediaIdx + 1} de {project.gallery.length}
              </span>
              {activeMedia?.resolution && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-semibold hidden md:inline">
                  {activeMedia.resolution}
                </span>
              )}
            </div>

            {/* Zoom & Action Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-black/40 rounded-full p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.75, +(z - 0.25).toFixed(2)))}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white cursor-pointer"
                  title="Reducir zoom"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono px-2 text-white/90 min-w-12 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white cursor-pointer"
                  title="Aumentar zoom 8K"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white cursor-pointer ml-1"
                  title="Restablecer tamaño (100%)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomLevel(1);
                }}
                className="p-2 bg-white/15 hover:bg-white/30 rounded-full text-white transition-colors cursor-pointer ml-2"
                aria-label="Cerrar visor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Image Viewport with Pan/Zoom and Navigation */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 flex items-center justify-center overflow-hidden my-3"
          >
            {/* Left Nav Arrow */}
            {project.gallery.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  setActiveMediaIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
                  setZoomLevel(1);
                }}
                className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-xl"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main High-Res 8K Master Image */}
            <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
              <img
                src={displayUrl}
                alt={activeMedia?.caption}
                referrerPolicy="no-referrer"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.18s ease-out',
                  imageRendering: '-webkit-optimize-contrast',
                  maxHeight: '82vh',
                }}
                className="max-w-full object-contain rounded-xl shadow-2xl pointer-events-auto transition-transform"
                onError={(e) => handleImageError(e, project.heroImage)}
              />

            </div>

            {/* Right Nav Arrow */}
            {project.gallery.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  setActiveMediaIdx((prev) => (prev + 1) % project.gallery.length);
                  setZoomLevel(1);
                }}
                className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-xl"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Info & Thumbnails Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-white z-20 shrink-0 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs sm:text-sm font-medium text-white/95">
                {activeMedia?.caption}
              </p>
              <div className="text-[11px] font-mono text-white/60 flex items-center gap-2">
                <span>{project.location}</span>
                <span>·</span>
                <span className="text-amber-300 font-bold">GARAM 8K MASTER ARCHIVE</span>
              </div>
            </div>

            {/* Thumbnails strip in Lightbox */}
            {project.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
                {project.gallery.map((media, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveMediaIdx(idx);
                      setZoomLevel(1);
                    }}
                    className={`relative w-16 h-11 sm:w-20 sm:h-13 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                      activeMediaIdx === idx
                        ? 'border-amber-400 ring-2 ring-amber-400 scale-105 opacity-100'
                        : 'border-white/20 opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={media.url}
                      alt={media.caption}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
