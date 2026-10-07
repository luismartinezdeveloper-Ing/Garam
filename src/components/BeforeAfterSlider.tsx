import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Antes · Estado Previo',
  afterLabel = 'Después · Obra Entregada',
  caption,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div
        ref={containerRef}
        role="slider"
        aria-label="Comparador interactivo de antes y después"
        aria-valuenow={Math.round(sliderPosition)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            setSliderPosition((p) => Math.max(0, p - 5));
          } else if (e.key === 'ArrowRight') {
            setSliderPosition((p) => Math.min(100, p + 5));
          }
        }}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden select-none cursor-ew-resize border border-[#e5e5ea] bg-slate-950 shadow-md group focus:outline-none focus:ring-2 focus:ring-[#25225a]"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* After Image (Background full width) */}
        <img
          src={afterImage}
          alt={afterLabel}
          referrerPolicy="no-referrer"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            referrerPolicy="no-referrer"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              maxWidth: 'none',
            }}
            className="absolute top-0 left-0 h-full object-cover object-center"
          />
        </div>

        {/* Slider Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Draggable Knob */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#25225a] flex items-center justify-center shadow-2xl border-2 border-[#25225a] transition-transform group-hover:scale-110 active:scale-95">
            <ChevronsLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#25225a]" />
          </div>
        </div>

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 bg-black/70 text-white text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md rounded-full border border-white/20 shadow-sm pointer-events-none">
          {beforeLabel}
        </div>

        <div className="absolute top-3.5 right-3.5 z-10 px-3 py-1 bg-white/90 text-[#25225a] text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md rounded-full border border-[#e5e5ea] shadow-sm pointer-events-none flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>{afterLabel}</span>
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center z-10 pointer-events-none">
          <span className="px-3 py-1 bg-black/50 text-white/80 text-[10px] font-mono tracking-wide backdrop-blur-sm rounded-full">
            ← Arrastre para comparar transformación →
          </span>
        </div>
      </div>

      {caption && (
        <p className="text-xs text-[#6e6e73] font-medium text-center">
          {caption}
        </p>
      )}
    </div>
  );
};
