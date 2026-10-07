// SVG Fallback for Architectural Images
export const ARCHITECTURAL_FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1b4b" />
          <stop offset="50%" stop-color="#25225a" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      <!-- Architectural Framing Lines -->
      <line x1="80" y1="80" x2="720" y2="80" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="6 4" />
      <line x1="80" y1="420" x2="720" y2="420" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="6 4" />
      <line x1="80" y1="80" x2="80" y2="420" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="6 4" />
      <line x1="720" y1="80" x2="720" y2="420" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="6 4" />

      <!-- Center Monogram Emblem -->
      <circle cx="400" cy="230" r="54" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
      <text x="400" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="3">GARAM</text>
      <text x="400" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="rgba(255,255,255,0.6)" text-anchor="middle" letter-spacing="1.5">REGISTRO ARQUITECTÓNICO OFICIAL</text>
    </svg>
  `);

export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc?: string
) {
  const target = e.currentTarget;
  if (fallbackSrc && target.src !== fallbackSrc && !target.src.endsWith(fallbackSrc)) {
    target.src = fallbackSrc;
  } else if (target.src !== ARCHITECTURAL_FALLBACK_SVG) {
    target.src = ARCHITECTURAL_FALLBACK_SVG;
  }
}
