const originalLogoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logogaram-BHc8IVNECjd3kvWeAp5tFxSpWUBOer.jpeg';

const typographyOptions = [
  {
    number: '01',
    direction: 'MÁS FIEL AL ORIGINAL',
    title: 'Refinamiento fiel',
    description: 'Conserva la contundencia del logo y afina el interletraje para una lectura más uniforme.',
    family: '"Plus Jakarta Sans", sans-serif',
    familyName: 'Plus Jakarta Sans',
    letterSpacing: '-0.06em',
    subtitleSpacing: '0.24em',
    recommended: true,
  },
  {
    number: '02',
    direction: 'GEOMÉTRICA',
    title: 'Geometría rotunda',
    description: 'Una sans geométrica de trazo firme, cercana al carácter arquitectónico de las letras actuales.',
    family: 'Montserrat, sans-serif',
    familyName: 'Montserrat',
    letterSpacing: '-0.065em',
    subtitleSpacing: '0.26em',
    recommended: false,
  },
  {
    number: '03',
    direction: 'LECTURA EQUILIBRADA',
    title: 'Ajuste contemporáneo',
    description: 'Abre ligeramente el ritmo de lectura sin cambiar el peso ni la presencia de GARAM.',
    family: 'Manrope, sans-serif',
    familyName: 'Manrope',
    letterSpacing: '-0.045em',
    subtitleSpacing: '0.22em',
    recommended: false,
  },
];

export const LogoConcepts = () => (
  <div className="flex flex-col gap-10">
    <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
      <figure className="min-w-0 overflow-hidden border border-brand-stone bg-white">
        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-stone px-5 py-3">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-ink">ORIGINAL ADJUNTO</p>
            <p className="mt-1 text-xs text-brand-muted">Referencia que se conserva intacta.</p>
          </div>
          <span className="border border-brand-stone px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-brand-muted">
            GARAM CONSTRUCTORES
          </span>
        </figcaption>
        <div className="flex min-h-[170px] items-center justify-center p-4 sm:min-h-[205px] sm:p-6">
          <img
            src={originalLogoUrl}
            alt="Logotipo original de GARAM Constructores: letras geométricas en índigo, símbolo de edificio a la derecha y CONSTRUCTORES debajo."
            width={423}
            height={150}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full max-w-[423px]"
          />
        </div>
      </figure>

      <aside className="flex flex-col justify-center gap-6 border border-brand-stone bg-white p-5 sm:p-7">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-muted">NO SE CAMBIA</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-6 text-brand-ink">
            <li>El símbolo arquitectónico del edificio.</li>
            <li>El índigo y la composición horizontal.</li>
            <li>La jerarquía y proporciones del conjunto.</li>
          </ul>
        </div>
        <div className="border-t border-brand-stone pt-5">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-copper">SÍ SE PUEDE AJUSTAR</p>
          <p className="mt-3 text-sm leading-6 text-brand-muted">
            Solo la familia, el peso y el espaciado de las letras de “GARAM” y “CONSTRUCTORES”.
          </p>
        </div>
      </aside>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-copper">TRES RUTAS TIPOGRÁFICAS</p>
      <h3 className="font-editorial text-2xl leading-tight text-brand-ink sm:text-3xl">
        Mismo logo. Solo cambia la letra.
      </h3>
      <p className="max-w-2xl text-sm leading-6 text-brand-muted">
        Las muestras comparan tipografías sans geométricas y ajustes de espaciado; el símbolo, el color y la estructura permanecen fijos.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {typographyOptions.map((option) => (
        <article key={option.number} className="flex h-full flex-col overflow-hidden border border-brand-stone bg-white transition-colors hover:border-brand-ink/30">
          <div className="flex items-center justify-between gap-3 border-b border-brand-stone px-5 py-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-brand-muted">{option.number} / 03</span>
            {option.recommended ? (
              <span className="bg-brand-paper px-2 py-1 text-[9px] font-semibold tracking-[0.12em] text-brand-copper">MÁS FIEL</span>
            ) : (
              <span className="text-[9px] font-medium tracking-[0.12em] text-brand-muted">VARIANTE TIPOGRÁFICA</span>
            )}
          </div>

          <div className="flex min-h-[190px] flex-col items-center justify-center bg-brand-paper px-4 py-8 text-center sm:min-h-[220px]">
            <p
              className="whitespace-nowrap text-[clamp(2.6rem,6vw,4rem)] leading-none text-brand-ink"
              style={{ fontFamily: option.family, fontWeight: 700, letterSpacing: option.letterSpacing }}
            >
              GARAM
            </p>
            <p
              className="mt-3 whitespace-nowrap text-[0.76rem] font-semibold text-brand-ink"
              style={{ fontFamily: option.family, letterSpacing: option.subtitleSpacing }}
            >
              CONSTRUCTORES
            </p>
          </div>

          <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-copper">{option.direction}</p>
            <h4 className="mt-2 font-editorial text-2xl leading-tight text-brand-ink">{option.title}</h4>
            <p className="mt-3 flex-1 text-sm leading-6 text-brand-muted">{option.description}</p>
            <div className="mt-5 border-t border-brand-stone pt-4">
              <p className="text-[9px] font-semibold tracking-[0.14em] text-brand-muted">FAMILIA TIPOGRÁFICA</p>
              <p className="mt-1 text-xs font-medium text-brand-ink">{option.familyName} · Semibold</p>
            </div>
          </div>
        </article>
      ))}
    </div>

    <p className="border-y border-brand-stone py-4 text-xs leading-5 text-brand-muted">
      Son muestras para comparar la tipografía; el logotipo vigente permanece intacto hasta que elijas una dirección.
    </p>
  </div>
);
