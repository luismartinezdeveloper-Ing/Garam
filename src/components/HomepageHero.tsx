import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

interface HomepageHeroProps {
  onOpenPresentation: () => void;
  onOpenInquiry: () => void;
}

const HERO_POSTER = '/obras/casa-33-exterior-2-garam.jpeg';

const HERO_STATS = [
  { value: String(PROJECTS.length), label: 'obras en portafolio' },
  { value: '+25k', label: 'm² construidos' },
  { value: '15+', label: 'años de trayectoria' },
  { value: '100%', label: 'rigor técnico' },
];

export const HomepageHero: React.FC<HomepageHeroProps> = ({
  onOpenPresentation,
  onOpenInquiry,
}) => (
  <section
    id="inicio"
    aria-labelledby="homepage-hero-title"
    className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-brand-ink text-white sm:min-h-[calc(100svh-5rem)]"
  >
    <img
      src={HERO_POSTER}
      alt=""
      aria-hidden="true"
      fetchPriority="high"
      loading="eager"
      decoding="async"
      className="absolute inset-0 size-full object-cover object-[69%_center]"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-r from-brand-ink/95 via-brand-ink/80 to-brand-ink/30 lg:via-brand-ink/75 lg:to-brand-ink/10"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-transparent to-brand-ink/30"
    />

    <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 pb-6 pt-7 sm:px-6 sm:pb-8 sm:pt-9 lg:px-8 lg:pb-10 lg:pt-10">
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">
          <span className="size-2 rounded-full bg-brand-copper-light ring-4 ring-brand-copper-light/20" />
          <span>GARAM Constructores</span>
        </div>
        <p className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/75 sm:block">
          Caracas <span aria-hidden="true">·</span> Galipán · Venezuela
        </p>
      </div>

      <div className="max-w-3xl py-12 sm:py-16 lg:py-20">
        <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-copper-light sm:text-xs">
          <span aria-hidden="true" className="h-px w-9 bg-brand-copper-light" />
          Promoción · Gerencia · Construcción
        </p>
        <h1
          id="homepage-hero-title"
          className="font-editorial text-5xl font-normal leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
        >
          De la visión
          <span className="block italic text-brand-copper-light">a la obra.</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
          Construimos los espacios donde habita la excelencia, integrando promoción,
          gerencia y construcción de principio a fin.
        </p>

        <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row sm:mt-9">
          <a
            href="#obras"
            onClick={(event) => {
              event.preventDefault();
              onOpenPresentation();
            }}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-brand-copper-light px-5 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-white focus-visible:outline-white"
          >
            <span>Explorar proyectos</span>
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-white/45 bg-brand-ink/20 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-white"
          >
            <span>Hablemos de tu proyecto</span>
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </button>
        </div>

        <a
          href="#estimador"
          className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-white/70 transition-colors hover:text-white sm:text-sm"
        >
          Calcular el alcance de una obra
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </a>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/25 pt-4 sm:gap-6 sm:pt-5 md:flex-row md:items-end md:justify-between">
        <dl className="grid max-w-3xl flex-1 grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4 sm:gap-0">
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 sm:border-r sm:border-white/20 sm:px-5 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className="order-2 text-[9px] leading-snug text-white/65 sm:text-[11px]">
                {stat.label}
              </dt>
              <dd className="order-1 font-editorial text-2xl leading-none text-white sm:text-3xl lg:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:justify-end">
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/60 sm:text-[10px] md:text-right">
            Obra en foco
            <span className="mt-1 block font-medium tracking-[0.12em] text-white/90">
              Casa 33 · Altamira
            </span>
          </p>
          <a
            href="#obras"
            className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white sm:text-[10px]"
          >
            <span className="hidden sm:inline">Baja para explorar</span>
            <ArrowDown aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HomepageHero;
