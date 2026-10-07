import { GaramLogo } from './GaramLogo';

const ArchitecturalLockup = () => (
  <div className="flex items-center gap-4" role="img" aria-label="Propuesta arquitectónica: monograma GA geométrico y nombre GARAM">
    <svg className="size-[76px] shrink-0" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17 17V79H79" stroke="#e6ded1" strokeWidth="1" />
      <path d="M55 25H31V70H58V55H47" stroke="#25225a" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M49 70L68 25L87 70M57 51H79" stroke="#25225a" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M68 25H87" stroke="#8b5e3c" strokeWidth="3" />
    </svg>
    <div>
      <span className="block text-lg font-semibold tracking-[0.2em] text-brand-ink">GARAM</span>
      <span className="mt-2 block h-px w-8 bg-brand-copper" />
      <span className="mt-2 block text-[8px] font-semibold tracking-[0.28em] text-brand-ink">CONSTRUCTORES</span>
    </div>
  </div>
);

const EditorialWordmark = () => (
  <div className="text-center" role="img" aria-label="Propuesta tipográfica: GARAM en serif editorial con CONSTRUCTORES">
    <span className="block font-editorial text-[2.75rem] leading-none tracking-[0.1em] text-brand-ink sm:text-5xl">GARAM</span>
    <span className="mt-5 flex items-center justify-center gap-3">
      <span className="h-px w-7 bg-brand-copper" />
      <span className="text-[9px] font-semibold tracking-[0.3em] text-brand-ink">CONSTRUCTORES</span>
      <span className="h-px w-7 bg-brand-copper" />
    </span>
  </div>
);

const EssentialLockup = () => (
  <div className="flex items-center gap-4" role="img" aria-label="Propuesta minimalista: inicial G en un módulo cuadrado junto al nombre GARAM">
    <span className="relative grid size-[68px] shrink-0 place-items-center bg-brand-ink text-white">
      <span className="font-editorial text-[2.7rem] leading-none">G</span>
      <span className="absolute bottom-3 right-3 size-2 bg-brand-copper" />
    </span>
    <span>
      <span className="block text-lg font-semibold tracking-[0.2em] text-brand-ink">GARAM</span>
      <span className="mt-1 block text-[8px] font-semibold tracking-[0.28em] text-brand-muted">CONSTRUCTORES</span>
    </span>
  </div>
);

const concepts = [
  {
    number: '01',
    direction: 'ARQUITECTÓNICA',
    title: 'Monograma estructural',
    description: 'Integra la G y la A en trazos de plano. Sustituye las torres por un símbolo propio y reconocible.',
    application: 'Fachadas, placas y señalética',
    recommended: true,
    logo: <ArchitecturalLockup />,
  },
  {
    number: '02',
    direction: 'EDITORIAL',
    title: 'Wordmark tipográfico',
    description: 'Hace que GARAM sea el protagonista: más carácter en las letras, sin sumar un ícono adicional.',
    application: 'Presentaciones y publicaciones',
    recommended: false,
    logo: <EditorialWordmark />,
  },
  {
    number: '03',
    direction: 'MINIMALISTA',
    title: 'Sello esencial',
    description: 'Reduce la identidad a una G dentro de un módulo simple, acompañado por el nombre completo.',
    application: 'Favicon, avatar y bordado',
    recommended: false,
    logo: <EssentialLockup />,
  },
];

export const LogoConcepts = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {concepts.map((concept) => (
        <article key={concept.number} className="flex h-full flex-col overflow-hidden border border-brand-stone bg-white transition-colors hover:border-brand-ink/30">
          <div className="flex items-center justify-between border-b border-brand-stone px-5 py-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-brand-muted">{concept.number} / 03</span>
            {concept.recommended ? (
              <span className="bg-brand-paper px-2 py-1 text-[9px] font-semibold tracking-[0.12em] text-brand-copper">RECOMENDADA</span>
            ) : (
              <span className="text-[9px] font-medium tracking-[0.12em] text-brand-muted">PROPUESTA</span>
            )}
          </div>

          <div className="flex min-h-[220px] items-center justify-center bg-brand-paper/70 px-4 py-8 sm:min-h-[240px]">
            {concept.logo}
          </div>

          <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-copper">{concept.direction}</p>
            <h3 className="mt-2 font-editorial text-2xl leading-tight text-brand-ink">{concept.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-brand-muted">{concept.description}</p>
            <div className="mt-5 border-t border-brand-stone pt-4">
              <p className="text-[9px] font-semibold tracking-[0.14em] text-brand-muted">APLICACIÓN IDEAL</p>
              <p className="mt-1 text-xs font-medium text-brand-ink">{concept.application}</p>
            </div>
          </div>
        </article>
      ))}
    </div>

    <div className="flex flex-col gap-4 border-y border-brand-stone py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex min-h-[64px] min-w-[172px] items-center justify-center border border-brand-stone bg-white px-3">
          <GaramLogo variant="dark" size="md" showSubtitles />
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.16em] text-brand-ink">MARCA VIGENTE · REFERENCIA</p>
          <p className="mt-1 max-w-xl text-xs leading-5 text-brand-muted">
            Son rutas conceptuales para comparar; el logo actual y la cabecera del sitio permanecen sin cambios.
          </p>
        </div>
      </div>
      <span className="self-start bg-brand-stone/50 px-3 py-2 text-[9px] font-semibold tracking-[0.12em] text-brand-ink sm:self-center">
        ESTUDIO CONCEPTUAL · 2026
      </span>
    </div>
  </div>
);
