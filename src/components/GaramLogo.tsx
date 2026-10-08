import React from 'react';

interface GaramLogoProps {
  variant?: 'dark' | 'light' | 'white' | 'blue';
  showSubtitles?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
}

const logoWidths = {
  sm: 77,
  md: 116,
  lg: 177,
  xl: 243,
  xxl: 423,
} as const;

export const GaramLogo: React.FC<GaramLogoProps> = ({
  variant = 'dark',
  showSubtitles = true,
  size = 'md',
  className = '',
}) => {
  const fillColor =
    variant === 'light' || variant === 'white'
      ? '#ffffff'
      : variant === 'blue'
        ? '#1d4ed8'
        : '#353261';

  const logoWidth = logoWidths[size];
  const artworkId = showSubtitles ? 'garam-logo' : 'garam-mark';

  return (
    <div className={`inline-flex max-w-full items-center ${className}`}>
      <svg
        viewBox="0 0 423 153"
        width="423"
        height="153"
        style={{ color: fillColor, height: 'auto', maxWidth: '100%', width: logoWidth }}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={showSubtitles ? 'GARAM CONSTRUCTORES' : 'GARAM'}
      >
        <use
          href={`/garam-logo.svg#${artworkId}`}
          color={fillColor}
          fill={fillColor}
          stroke={fillColor}
        />
      </svg>
    </div>
  );
};
