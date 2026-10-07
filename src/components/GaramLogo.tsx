import React from 'react';

interface GaramLogoProps {
  variant?: 'dark' | 'light' | 'white' | 'blue';
  showSubtitles?: boolean;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const GaramLogo: React.FC<GaramLogoProps> = ({
  variant = 'dark',
  showSubtitles = true,
  showTagline = false,
  size = 'md',
  className = '',
}) => {
  // Exact Color from User Screenshot: Deep Indigo Navy #25225a (RGB: 37, 34, 90)
  const fillColor =
    variant === 'light' || variant === 'white'
      ? '#ffffff'
      : variant === 'blue'
      ? '#1d4ed8'
      : '#25225a';

  const strokeColor = fillColor;

  // Heights scaling for Apple-style precision
  const heightMap = {
    sm: { main: 28 },
    md: { main: 42 },
    lg: { main: 64 },
    xl: { main: 88 },
  };

  const { main: hMain } = heightMap[size] || heightMap.md;

  return (
    <div className={`inline-flex flex-col items-start justify-center ${className}`}>
      <svg
        viewBox="0 0 395 105"
        height={hMain}
        className="w-auto max-w-full"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Logo Oficial GARAM CONSTRUCTORES"
      >
        {/* Letterforms: G, A, R, A, M */}
        <g fill={fillColor}>
          {/* G: Clean circular geometry with horizontal inward bar */}
          <path d="M 38 18 C 18 18 8 32 8 50 C 8 68 18 82 38 82 C 52 82 60 70 60 58 L 36 58 L 36 46 L 73 46 L 73 60 C 73 78 57 94 37 94 C 11 94 -2 74 -2 50 C -2 27 12 6 38 6 C 58 6 70 19 72 28 L 60 28 C 58 22 50 18 38 18 Z" transform="translate(4, 0)" />

          {/* First A: Left diagonal leg extends DOWNWARD into a sharp pointed triangular drop past baseline */}
          <path d="M 98 8 L 112 8 L 138 78 L 124 78 L 119 54 L 96 54 L 81 96 L 69 96 L 98 8 Z M 114 23 L 100 42 L 116 42 Z" transform="translate(4, 0)" />

          {/* R: Straight stem, smooth upper loop, outward diagonal right leg */}
          <path d="M 148 8 L 180 8 C 196 8 206 16 206 30 C 206 42 197 49 183 51 L 208 78 L 192 78 L 170 52 L 163 52 L 163 78 L 148 78 Z M 163 20 L 163 39 L 178 39 C 187 39 190 35 190 30 C 190 24 187 20 178 20 Z" transform="translate(4, 0)" />

          {/* Second A: Left diagonal leg ALSO extends DOWNWARD into a sharp pointed triangular drop past baseline */}
          <path d="M 224 8 L 238 8 L 264 78 L 250 78 L 245 54 L 222 54 L 207 96 L 195 96 L 224 8 Z M 240 23 L 226 42 L 242 42 Z" transform="translate(4, 0)" />

          {/* M: Sharp outer diagonal apexes, center V reaches baseline */}
          <path d="M 274 8 L 288 8 L 303 50 L 318 8 L 332 8 L 332 78 L 318 78 L 318 28 L 307 70 L 299 70 L 288 28 L 288 78 L 274 78 Z" transform="translate(4, 0)" />
        </g>

        {/* 3D Perspective Skyscraper Emblem (Right of M) */}
        <g stroke={strokeColor} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="miter" transform="translate(4, 0)">
          {/* Left Tower: Pitched Gable Roof with Center Perspective Crease */}
          <path d="M 342 74 L 342 24 L 356 12 L 370 24 L 370 74" />
          <line x1="356" y1="12" x2="356" y2="74" strokeWidth="2.2" />

          {/* Right Tower: Shorter Pitched Roof with Center Crease */}
          <path d="M 370 74 L 370 34 L 382 24 L 394 34 L 394 74" />
          <line x1="382" y1="24" x2="382" y2="74" strokeWidth="2.2" />

          {/* Horizontal Ground Base Line with L-return */}
          <path d="M 338 56 L 338 80 L 394 80" strokeWidth="2.8" />
        </g>

        {/* Subtitle "CONSTRUCTORES" aligned underneath the 'RAM' section */}
        {showSubtitles && (
          <text
            x="346"
            y="100"
            textAnchor="end"
            fill={fillColor}
            fontFamily="Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight="700"
            fontSize="14.5"
            letterSpacing="0.24em"
          >
            CONSTRUCTORES
          </text>
        )}
      </svg>
    </div>
  );
};
