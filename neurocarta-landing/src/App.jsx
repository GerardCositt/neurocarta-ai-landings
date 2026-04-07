const cx = (...classes) => classes.filter(Boolean).join(' ')

/* Azul corporativo tipo LinkedIn (#0A66C2) — colores planos, sin gradientes */
const btnPrimary =
  'inline-flex items-center justify-center rounded-md bg-[#0A66C2] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004182] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A66C2]'

const btnPrimarySm =
  'inline-flex items-center justify-center rounded-md bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004182]'

const btnSecondary =
  'inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1d2226] shadow-sm transition hover:border-slate-400 hover:bg-slate-50'

const cardSurface =
  'rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md'

function Icon({ children }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-[#eef3f8] text-[#0A66C2] shadow-sm">
      {children}
    </span>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-5 shadow-inner shadow-black/20 ring-1 ring-white/10">
      <div className="text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
      <div className="mt-1 text-sm text-white/70">{label}</div>
    </div>
  )
}

function PricingCard({ name, price, periodLabel, description, credits, highlighted, items, ctaLabel }) {
  return (
    <div
      className={cx(
        'relative flex h-full flex-col rounded-lg border p-7 transition',
        highlighted
          ? 'border-[#0A66C2] bg-white shadow-md ring-2 ring-[#0A66C2]/20'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
      )}
    >
      {highlighted ? (
        <div className="absolute -top-3 right-6 rounded-full bg-[#0A66C2] px-3 py-1 text-xs font-semibold text-white">
          Recomendado
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold tracking-tight text-slate-900">
            {name}
          </div>
          <div className="mt-1 text-sm text-slate-600">{description}</div>
        </div>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <div className="text-4xl font-semibold tracking-tight text-slate-900">
          {price}
        </div>
        <div className="pb-1 text-sm text-slate-500">{periodLabel}</div>
      </div>

      <div
        className={cx(
          'mt-3 inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm',
          highlighted
            ? 'border border-[#0A66C2]/25 bg-[#eef3f8] text-slate-800'
            : 'border border-slate-200 bg-slate-50 text-slate-800'
        )}
      >
        <span className="font-semibold text-slate-900">{credits}</span>
        <span className="text-slate-600">créditos IA incluidos</span>
      </div>

      <a
        href="#demo"
        className={cx(
          'mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition',
          highlighted
            ? 'bg-[#0A66C2] text-white shadow-sm hover:bg-[#004182]'
            : 'border border-slate-300 bg-[#1d2226] text-white hover:bg-black'
        )}
      >
        {ctaLabel ?? 'Ver demo'}
      </a>

      <div className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Incluye
      </div>
      <ul className="mt-3 space-y-3 text-sm text-slate-700">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#eef3f8] text-[#0A66C2]">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.25a1 1 0 0 1-1.42 0l-3.6-3.625a1 1 0 1 1 1.42-1.41l2.89 2.912 6.49-6.54a1 1 0 0 1 1.414-.006Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  const annualBilling = true

  const pricing = [
    {
      name: 'Basic',
      price: annualBilling ? '€59' : '€69',
      periodLabel: annualBilling ? '/mes (fact. anual)' : '/mes',
      description: 'Para un local: carta moderna, rápida y optimizada.',
      credits: annualBilling ? '700' : '500',
      highlighted: false,
      items: [
        'Carta digital con QR',
        'Descripciones inteligentes (IA) por plato',
        'Imágenes IA por plato (pack incluido)',
        'Destacados manuales (rentables / recomendados)',
        'Edición rápida: precios, alérgenos y disponibilidad',
        'Soporte por email (24–48h)',
      ],
    },
    {
      name: 'Pro',
      price: annualBilling ? '€129' : '€149',
      periodLabel: annualBilling ? '/mes (fact. anual)' : '/mes',
      description: 'Para crecer: optimización continua del menú.',
      credits: annualBilling ? '2.500' : '2.000',
      highlighted: true,
      items: [
        'Todo lo de Basic',
        'Destacado inteligente de productos (margen/rotación)',
        'Recomendaciones de upselling (bebidas, extras, postres)',
        'Mejoras de copy por IA (iteraciones)',
        'Analítica por plato (interés y rendimiento)',
        'Soporte prioritario (24h)',
      ],
    },
    {
      name: 'Premium',
      price: annualBilling ? '€249' : '€289',
      periodLabel: annualBilling ? '/mes (fact. anual)' : '/mes',
      description: 'Para volumen y operaciones: rendimiento + control.',
      credits: annualBilling ? '6.500' : '6.000',
      highlighted: false,
      items: [
        'Todo lo de Pro',
        'Estilo de marca avanzado (tipos, colores, layout)',
        'Generación masiva de imágenes IA (catálogo)',
        'Flujos para reducir desperdicio (rotación sugerida)',
        'Exportables para campañas y promos',
        'Soporte premium + onboarding',
      ],
    },
  ]

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Fondo neutro + un solo halo azul muy suave (estilo LinkedIn / Meta) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="bg-dot-grid absolute inset-0 opacity-40" />
        <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#0A66C2]/[0.06] blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="group flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#0A66C2] text-white shadow-sm transition group-hover:bg-[#004182]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M7 7c3.5 0 5-1.5 8.5-1.5S21 7 21 12s-2 8-5.5 8S10.5 18.5 7 18.5 3 17 3 12 3.5 7 7 7Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M9 10.5c1.5-1 4.5-1 6 0M9 14c1.5 1 4.5 1 6 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              NeuroCarta
              <span className="text-[#0A66C2]">.AI</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-[#0A66C2]" href="#problema">
              Problema
            </a>
            <a className="transition hover:text-[#0A66C2]" href="#solucion">
              Solución
            </a>
            <a className="transition hover:text-[#0A66C2]" href="#features">
              Features
            </a>
            <a className="transition hover:text-[#0A66C2]" href="#pricing">
              Precios
            </a>
            <a className="transition hover:text-[#0A66C2]" href="#franquicias">
              Franquicias
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#demo"
              className="hidden rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#eef3f8] hover:text-[#0A66C2] sm:inline-flex"
            >
              Ver demo
            </a>
            <a href="#cta" className={btnPrimarySm}>
              Pedir una demo
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1d2226] shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#0A66C2]" />
              Menú inteligente con IA para restaurantes
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#1d2226] sm:text-[2.65rem] sm:leading-[1.08]">
              La carta que{' '}
              <span className="text-[#0A66C2]">maximiza ingresos</span> y reduce
              desperdicio, con IA
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              NeuroCarta.AI transforma tu menú en un motor de ventas: mejora
              descripciones, crea imágenes consistentes y prioriza productos por
              margen y rotación para vender más con menos waste.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#cta" className={btnPrimary}>
                Solicitar demo
              </a>
              <a href="#pricing" className={btnSecondary}>
                Ver precios
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-[#1d2226]">
                  +Ingresos
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Upselling y foco en platos rentables
                </div>
              </div>
              <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-[#1d2226]">
                  -Desperdicio
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Ajustes por demanda y rotación
                </div>
              </div>
              <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-[#0A66C2]">
                  +Velocidad
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Cambios en minutos, no en días
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-md border border-slate-200 bg-white p-1 shadow-md">
              <div className="rounded-[0.4rem] bg-white p-6">
                <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Vista previa de carta
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#eef3f8] px-2.5 py-1 text-xs font-semibold text-[#0A66C2]">
                  <span className="h-2 w-2 rounded-full bg-[#0A66C2]" />
                  IA activa
                </div>
              </div>
              <div className="mt-5 grid gap-4">
                <div className="rounded-md border border-slate-100 bg-[#fafafa] p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-md bg-slate-200" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div className="truncate text-sm font-semibold text-slate-900">
                          Burger Trufa Signature
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          €14,90
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-slate-600">
                        Descripción optimizada por IA para aumentar conversión y
                        ticket medio.
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#eef3f8] px-3 py-1 text-xs font-semibold text-[#0A66C2]">
                        Destacado por margen
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-slate-100 bg-[#fafafa] p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-md bg-slate-200" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div className="truncate text-sm font-semibold text-slate-900">
                          Bowl Mediterráneo
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          €11,50
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-slate-600">
                        Sugiere ingredientes de temporada para reducir
                        desperdicio.
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#e7f3ff] px-3 py-1 text-xs font-semibold text-[#1877F2]">
                        Recomendado hoy
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4">
                  <div className="text-xs font-semibold text-slate-600">
                    Próximamente
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    “Modo stock” para rotar excedentes
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    Ajusta el destacado de platos según inventario y demanda.
                  </div>
                </div>
              </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-8 -left-8 hidden w-[280px] rounded-md border border-slate-200 bg-white p-6 shadow-lg lg:block">
              <div className="text-xs font-semibold text-slate-500">
                Impacto estimado (30 días)
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">Ticket medio</span>
                  <span className="font-semibold text-slate-900">+8–15%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">Platos sin salida</span>
                  <span className="font-semibold text-slate-900">-10–25%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">Tiempo de actualización</span>
                  <span className="font-semibold text-slate-900">-70%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200" />
      </section>

      {/* Problem */}
      <section id="problema" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0A66C2]">
              Diagnóstico
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d2226]">
              El problema: ventas bajas y desperdicio alimentario
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              La carta es tu principal herramienta de venta. Cuando no está
              optimizada, pierdes margen, rotación y oportunidades de
              recomendación.
            </p>
          </div>

          <div className="grid gap-4">
            <div className={cx(cardSurface, 'p-6 hover:-translate-y-0.5')}>
              <div className="flex items-center gap-4">
                <Icon>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-[#0A66C2]"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 7h8M8 11h8M8 15h5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </Icon>
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    Baja conversión
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Descripciones planas y platos mal posicionados reducen el
                    ticket medio.
                  </div>
                </div>
              </div>
            </div>

            <div className={cx(cardSurface, 'p-6 hover:-translate-y-0.5')}>
              <div className="flex items-center gap-4">
                <Icon>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-[#0A66C2]"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3v4m0 14v-4M5.2 5.2l2.8 2.8m8 8 2.8 2.8M3 12h4m14 0h-4M5.2 18.8l2.8-2.8m8-8 2.8-2.8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7 13c1.2 2.6 4.9 4 8 1.8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </Icon>
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    Desperdicio de comida
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Produces de más o rotas mal el stock por falta de señales
                    claras de demanda.
                  </div>
                </div>
              </div>
            </div>

            <div className={cx(cardSurface, 'p-6 hover:-translate-y-0.5')}>
              <div className="flex items-center gap-4">
                <Icon>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-[#0A66C2]"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 7h12M6 12h12M6 17h8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </Icon>
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    Actualizaciones lentas
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Cambios de precio, alérgenos o temporada se vuelven una
                    tarea pesada.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section
        id="solucion"
        className="relative overflow-hidden border-y border-slate-800 bg-[#1d2226]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,102,194,0.2),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                La solución: IA aplicada a tu carta, plato a plato
              </h2>
              <p className="mt-4 text-lg text-white/70">
                NeuroCarta.AI analiza tu oferta y te propone mejoras para vender
                más y desperdiciar menos: copy que convence, imágenes que abren
                el apetito y destacados que empujan el margen.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#42B72A]" />
                  <div>
                    <div className="font-semibold text-white">
                      Optimiza descripciones
                    </div>
                    <div className="mt-1 text-sm text-white/70">
                      Lenguaje claro, persuasivo y coherente con tu marca.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#1877F2]" />
                  <div>
                    <div className="font-semibold text-white">Genera imágenes</div>
                    <div className="mt-1 text-sm text-white/70">
                      Visuales consistentes para platos sin sesión de fotos.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#0A66C2]" />
                  <div>
                    <div className="font-semibold text-white">
                      Destaca lo que conviene
                    </div>
                    <div className="mt-1 text-sm text-white/70">
                      Prioriza productos por margen, rotación y disponibilidad.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-slate-600 bg-slate-800/50 p-6">
              <div className="text-sm font-semibold text-white">
                Panel de optimización (ejemplo)
              </div>
              <div className="mt-4 grid gap-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-semibold text-white">
                      “Tarta de queso”
                    </div>
                    <div className="text-xs font-semibold text-[#70b5f9]">
                      +Impacto alto
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    Reescribir descripción y añadir foto para aumentar pedidos
                    en sobremesa.
                  </div>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-semibold text-white">
                      “Ensalada temporada”
                    </div>
                    <div className="text-xs font-semibold text-[#42B72A]">
                      -Desperdicio
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    Sugerir ingredientes con stock alto y destacar en franja de
                    mediodía.
                  </div>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-semibold text-white">
                      “Combo bebidas”
                    </div>
                    <div className="text-xs font-semibold text-blue-300">
                      Upselling
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    Añadir recomendación automática según plato y margen.
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Stat label="Platos optimizados" value="38" />
                <Stat label="Imágenes generadas" value="62" />
                <Stat label="Acciones sugeridas" value="14" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0A66C2]">
            Producto
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Features pensadas para aumentar ingresos y reducir waste
          </h2>
          <p className="max-w-2xl text-lg text-slate-600">
            Un stack ligero para el restaurante: rápido de desplegar, fácil de
            mantener y medible desde el día 1.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-md border border-slate-200 bg-white p-6 pt-7 shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#0A66C2]" />
            <Icon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-[#0A66C2]"
                aria-hidden="true"
              >
                <path
                  d="M4 7c3.5-2.5 12.5-2.5 16 0v10c-3.5 2.5-12.5 2.5-16 0V7Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 10h8M8 13h6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </Icon>
            <div className="mt-4 text-base font-semibold text-slate-900">
              Imágenes IA de platos
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Genera visuales consistentes por estilo, categoría o temporada.
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-md border border-slate-200 bg-white p-6 pt-7 shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#42B72A]" />
            <Icon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-[#0A66C2]"
                aria-hidden="true"
              >
                <path
                  d="M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M8 9h8M8 12h8M8 15h5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </Icon>
            <div className="mt-4 text-base font-semibold text-slate-900">
              Descripciones inteligentes
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Copy optimizado para conversión, alérgenos y claridad sin
              “fluff”.
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-md border border-slate-200 bg-white p-6 pt-7 shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#1877F2]" />
            <Icon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-[#0A66C2]"
                aria-hidden="true"
              >
                <path
                  d="M12 3l2.4 5.3L20 9l-4 4 .9 5.6-4.9-2.7-4.9 2.7L8 13 4 9l5.6-.7L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </Icon>
            <div className="mt-4 text-base font-semibold text-slate-900">
              Destacado de producto
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Resalta platos por margen, rotación, disponibilidad o campaña.
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section
        id="demo"
        className="border-y border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0A66C2]">
                Demo
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Demo (vídeo)
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">
                Sustituye este placeholder por un vídeo real: onboarding,
                optimización y resultados.
              </p>
            </div>
            <a href="#cta" className={btnPrimary}>
              Quiero verlo en mi restaurante
            </a>
          </div>

          <div className="mt-10 overflow-hidden rounded-md border border-slate-200 bg-slate-100 p-1 shadow-sm">
            <div className="aspect-video w-full overflow-hidden rounded-[0.35rem] bg-[#1d2226]">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="max-w-md rounded-md border border-slate-600 bg-slate-800/80 p-6 text-center">
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0A66C2] text-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                  </div>
                  <div className="mt-4 text-base font-semibold text-white">
                    Placeholder de vídeo
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    Inserta un embed (YouTube/Vimeo) o un MP4.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0A66C2]">
            Precios
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Precios simples, con créditos IA incluidos
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Elige tu plan según volumen y frecuencia de optimización. Los
            créditos IA se usan para imágenes, descripciones y mejoras
            continuas.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricing.map((p) => (
            <PricingCard
              key={p.name}
              {...p}
              ctaLabel={p.name === 'Premium' ? 'Pedir demo Premium' : 'Ver demo'}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-md border border-slate-200 bg-[#eef3f8] p-6 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Cómo se usan los créditos IA</div>
            <div className="mt-2 text-slate-600">
              Se consumen al generar imágenes, reescribir descripciones y ejecutar
              optimizaciones avanzadas (destacados, upselling y sugerencias).
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0A66C2]" />
                Imágenes IA (por plato / variantes)
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0A66C2]" />
                Descripciones inteligentes (iteraciones por conversión)
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#42B72A]" />
                Sugerencias para rotación y reducción de desperdicio
              </li>
            </ul>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-6 text-sm shadow-sm">
            <div className="font-semibold text-slate-900">Add-ons (packs de créditos)</div>
            <div className="mt-2 text-slate-600">
              Para picos de trabajo (cambio de carta, nueva temporada o sesión de
              imágenes IA).
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { name: 'Pack S', credits: '1.000', price: '€19' },
                { name: 'Pack M', credits: '5.000', price: '€79' },
                { name: 'Pack L', credits: '12.000', price: '€149' },
              ].map((x) => (
                <div
                  key={x.name}
                  className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {x.name}
                  </div>
                  <div className="mt-1 text-base font-semibold text-slate-900">
                    {x.credits}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">créditos IA</div>
                  <div className="mt-3 text-sm font-semibold text-slate-900">
                    {x.price}
                  </div>
                </div>
              ))}
            </div>
            <a href="#cta" className={cx(btnPrimary, 'mt-5 w-full')}>
              Hablar con ventas
            </a>
          </div>
        </div>
      </section>

      {/* Franchise */}
      <section
        id="franquicias"
        className="border-y border-slate-200 bg-[#f3f2ef]"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0A66C2]">
                Franquicias
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Para franquicias: consistencia de marca, control centralizado
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Gestiona múltiples locales desde una sola vista: precios,
                descripciones, campañas y destacados por región o por tienda.
              </p>
              <div className="mt-6 rounded-md border border-slate-200 bg-[#eef3f8] p-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Enterprise / Franquicias</span>{' '}
                incluye SSO opcional, roles, plantillas y reporting consolidado.
                <span className="ml-2 font-semibold text-[#0A66C2]">
                  Precio bajo consulta.
                </span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-[#0A66C2]" />
                  Plantillas de carta por marca y temporada
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-[#0A66C2]" />
                  Campañas locales con reglas (margen, stock, demanda)
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-[#42B72A]" />
                  Reportes por tienda y por categoría
                </li>
              </ul>
            </div>

            <div className={cx(cardSurface, 'p-6')}>
              <div className="text-sm font-semibold text-slate-900">
                Vista multi-local (ejemplo)
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { name: 'Barcelona · Eixample', status: 'Optimizado', color: 'bg-emerald-500' },
                  { name: 'Girona · Centre', status: 'Pendiente', color: 'bg-amber-500' },
                  { name: 'Tarragona · Port', status: 'Optimizado', color: 'bg-emerald-500' },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">
                        {s.name}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-600">
                        Destacados y copy alineados con marca
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className={cx('h-2 w-2 rounded-full', s.color)} />
                      {s.status}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Automatiza
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  Reglas por stock y desperdicio
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Si un ingrediente está en excedente, el sistema sugiere platos
                  para rotarlo con destacados temporales.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="cta"
        className="relative overflow-hidden bg-[#1d2226]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(10,102,194,0.25),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70b5f9]">
                Siguiente paso
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                Pasa de “tener carta” a “tener una carta que vende”
              </h2>
              <p className="mt-4 text-lg text-white/70">
                En 15 minutos te enseñamos cómo NeuroCarta.AI puede aumentar tu
                ticket medio y reducir desperdicio sin complicarte la vida.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#demo" className={btnPrimary}>
                  Ver demo
                </a>
                <a
                  href="mailto:demo@neurocarta.ai"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:border-white/35 hover:bg-white/10"
                >
                  Contactar (email)
                </a>
              </div>
              <div className="mt-6 text-sm text-white/60">
                Respuesta en menos de 24h laborables.
              </div>
            </div>

            <div className="rounded-md border border-slate-600 bg-slate-800/40 p-7">
              <div className="text-sm font-semibold text-white">
                Qué recibirás en la demo
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#42B72A]" />
                  Auditoría rápida de tu carta actual
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#1877F2]" />
                  Ejemplos de copy e imágenes con tu estilo
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#70b5f9]" />
                  Plan de destacados para subir ticket y rotación
                </li>
              </ul>
              <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm text-white/70">
                Consejo: trae 10–20 platos y precios. Saldrás con un plan de
                acción.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-slate-600 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold text-[#0A66C2]">NeuroCarta.AI</span>{' '}
            <span className="text-slate-500">
              · Smart restaurant menu powered by AI
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a className="transition hover:text-[#0A66C2]" href="#pricing">
              Precios
            </a>
            <a className="transition hover:text-[#0A66C2]" href="#franquicias">
              Franquicias
            </a>
            <a className="transition hover:text-[#0A66C2]" href="#cta">
              Demo
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
