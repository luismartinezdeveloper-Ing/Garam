import { Download } from 'lucide-react';
import { GaramLogo } from './GaramLogo';

const originalLogoUrl =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logogaram-BHc8IVNECjd3kvWeAp5tFxSpWUBOer.jpeg';

export const LogoDigitalization = () => (
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
    <figure className="overflow-hidden border border-brand-stone bg-white">
      <figcaption className="border-b border-brand-stone px-5 py-3">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-ink">LOGO ORIGINAL</p>
        <p className="mt-1 text-xs text-brand-muted">La referencia que elegiste.</p>
      </figcaption>
      <div className="flex min-h-[176px] items-center justify-center bg-[#ebebed] p-5">
        <img
          src={originalLogoUrl}
          alt="Logo original de GARAM Constructores en índigo, con letras geométricas y símbolo arquitectónico."
          width={423}
          height={153}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full max-w-[423px]"
        />
      </div>
    </figure>

    <figure className="overflow-hidden border border-brand-stone bg-white">
      <figcaption className="border-b border-brand-stone px-5 py-3">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-ink">VERSIÓN WEB · SVG</p>
        <p className="mt-1 text-xs text-brand-muted">El mismo logo, ahora en vector.</p>
      </figcaption>
      <div className="flex min-h-[176px] items-center justify-center bg-[#ebebed] p-5">
        <GaramLogo variant="dark" size="xxl" showSubtitles />
      </div>
      <div className="border-t border-brand-stone px-5 py-4">
        <p className="text-sm leading-6 text-brand-muted">
          Fondo transparente y trazos escalables para cabeceras, impresos y pantallas de alta resolución.
        </p>
        <a
          href="/garam-logo.svg"
          download="GARAM-Constructores.svg"
          className="mt-4 inline-flex min-h-11 items-center gap-2 border border-brand-ink px-4 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-ink hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-copper focus:ring-offset-2"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Descargar SVG
        </a>
      </div>
    </figure>

    <p className="border-y border-brand-stone py-4 text-xs leading-5 text-brand-muted md:col-span-2">
      Se conserva la composición, el símbolo del edificio y el tono índigo original. La versión SVG reemplaza únicamente el fondo de la imagen por transparencia para integrarse mejor en la web.
    </p>
  </div>
);
