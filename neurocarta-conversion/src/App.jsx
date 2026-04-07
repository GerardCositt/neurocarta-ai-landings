const cx = (...c) => c.filter(Boolean).join(' ')

const red = 'bg-[#C52439] hover:bg-[#a01d2e] text-white shadow-lg shadow-[#C52439]/25'
const orange =
  'bg-[#FF7A00] hover:bg-[#e56e00] text-white shadow-lg shadow-[#FF7A00]/20'

function Micro({ children, className = '' }) {
  return (
    <p className={cx('mt-2 text-center text-xs text-white/55 sm:text-sm', className)}>
      {children}
    </p>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Urgencia + escasez */}
      <div className="border-b border-[#FFC107]/30 bg-[#FFC107] px-4 py-2 text-center text-sm font-bold text-[#0F0F0F]">
        Acceso limitado · Solo{' '}
        <span className="underline decoration-2 underline-offset-2">23 plazas</span>{' '}
        con onboarding guiado este mes
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0F0F0F]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <span className="text-lg font-bold tracking-tight">
            NeuroCarta<span className="text-[#FFC107]">.ai</span>
          </span>
          <a
            href="#cta"
            className={cx(
              'rounded-md px-4 py-2 text-sm font-bold transition',
              red
            )}
          >
            Quiero vender más
          </a>
        </div>
      </header>

      {/* 1. HERO */}
      <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(197,36,57,0.15),transparent)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-block rounded-full border border-[#FFC107]/40 bg-[#FFC107]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FFC107]">
            No es una carta. Es una herramienta de ventas
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
            Tu carta está{' '}
            <span className="text-[#FFC107]">perdiendo dinero</span> cada día
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 sm:text-xl">
            Estás tirando comida sin darte cuenta. Tus clientes no saben qué
            pedir — y tú pierdes ventas.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium text-white sm:text-lg">
            NeuroCarta.ai convierte tu carta en una máquina de vender platos.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#cta"
              className={cx(
                'inline-flex min-w-[240px] items-center justify-center rounded-md px-8 py-4 text-base font-bold transition',
                red
              )}
            >
              Quiero vender más
            </a>
            <a
              href="#demo"
              className={cx(
                'inline-flex min-w-[240px] items-center justify-center rounded-md px-8 py-4 text-base font-bold transition',
                orange
              )}
            >
              Ver el antes y el después
            </a>
          </div>
          <Micro>
            Empieza gratis en 2 minutos · Sin compromiso · Resultados desde el
            primer día
          </Micro>
        </div>
      </section>

      {/* Prueba social */}
      <section className="border-y border-white/10 bg-white/[0.03] px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 text-center sm:flex-row sm:gap-16">
          <div>
            <div className="text-3xl font-black text-[#FFC107] sm:text-4xl">
              +180
            </div>
            <div className="mt-1 text-sm text-white/70">
              restaurantes ya venden más con NeuroCarta
            </div>
          </div>
          <div className="hidden h-12 w-px bg-white/15 sm:block" />
          <div>
            <div className="text-3xl font-black text-[#FFC107] sm:text-4xl">
              +30%
            </div>
            <div className="mt-1 text-sm text-white/70">
              en platos destacados (media interna)
            </div>
          </div>
          <div className="hidden h-12 w-px bg-white/15 sm:block" />
          <div>
            <div className="text-3xl font-black text-[#FFC107] sm:text-4xl">
              5 min
            </div>
            <div className="mt-1 text-sm text-white/70">
              para tenerla lista. Sin TPV. Sin líos
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEMA + Identificación */}
      <section id="dolor" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Si te pasa esto… no eres tú. Es tu carta.
          </h2>
        </div>
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {[
            'Los clientes tardan en decidir y piden “lo de siempre”.',
            'Tienes platos que no salen y acaban en la basura.',
            'Tiras comida porque no rotas lo que toca.',
            'El ticket medio se queda corto aunque el local esté lleno.',
          ].map((t) => (
            <li
              key={t}
              className="flex gap-3 rounded-lg border border-[#C52439]/30 bg-[#C52439]/5 p-4 text-left text-white/90"
            >
              <span className="text-[#C52439]" aria-hidden="true">
                ✕
              </span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Mensajes clave */}
      <section className="border-y border-white/10 bg-[#141414] px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {[
            'Convierte clientes indecisos en pedidos.',
            'Vende lo que te interesa, no lo que el cliente elige al azar.',
            'Reduce mermas automáticamente.',
            'No es una carta bonita. Es una máquina de conversión.',
          ].map((msg) => (
            <blockquote
              key={msg}
              className="border-l-4 border-[#FFC107] pl-4 text-lg font-semibold text-white"
            >
              {msg}
            </blockquote>
          ))}
        </div>
      </section>

      {/* 3. SOLUCIÓN */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            NeuroCarta no “informa”.{' '}
            <span className="text-[#FFC107]">Empuja a pedir</span>
          </h2>
          <p className="mt-4 text-lg text-white/75">
            IA que destaca platos rentables, mejora textos e imágenes, y ordena
            tu oferta para que el cliente decida más rápido — y tú vendas lo
            que te conviene.
          </p>
        </div>
      </section>

      {/* 4. DEMO VISUAL antes / después */}
      <section id="demo" className="scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-20">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Mira la diferencia. Sin rodeos.
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-white/65">
          No explicamos. Enseñamos.
        </p>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* ANTES */}
          <div className="rounded-xl border border-white/15 bg-[#1a1a1a] p-5">
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
              Antes
            </div>
            <div className="space-y-3 text-sm text-white/60">
              <div className="border-b border-white/10 pb-3">
                <div className="font-medium text-white/80">Ensalada César</div>
                <div className="mt-1">Lechuga, pollo, salsa.</div>
                <div className="mt-2 text-white/50">9,50 €</div>
              </div>
              <div className="border-b border-white/10 pb-3">
                <div className="font-medium text-white/80">Pasta carbonara</div>
                <div className="mt-1">Pasta con nata y bacon.</div>
                <div className="mt-2 text-white/50">11,00 €</div>
              </div>
              <div>
                <div className="font-medium text-white/80">Brownie</div>
                <div className="mt-1">Postre de chocolate.</div>
                <div className="mt-2 text-white/50">4,50 €</div>
              </div>
            </div>
          </div>

          {/* DESPUÉS */}
          <div className="relative rounded-xl border-2 border-[#FFC107]/50 bg-[#141414] p-5 shadow-[0_0_40px_-10px_rgba(255,193,7,0.25)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFC107]">
                Después
              </span>
              <span className="rounded bg-[#FFC107] px-2 py-0.5 text-[10px] font-black text-[#0F0F0F]">
                IA ACTIVA
              </span>
            </div>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0F0F0F]">
                <div className="h-24 bg-gradient-to-br from-white/10 to-white/5" />
                <div className="p-3">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded bg-[#C52439] px-2 py-0.5 text-[10px] font-bold">
                      🔥 Más vendido
                    </span>
                  </div>
                  <div className="mt-2 font-bold text-white">Pasta trufa</div>
                  <div className="mt-1 text-xs text-white/65">
                    Texto corto que vende. Foto que abre el apetito.
                  </div>
                  <div className="mt-2 font-bold text-[#FFC107]">14,90 €</div>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0F0F0F]">
                <div className="h-20 bg-gradient-to-br from-emerald-900/30 to-[#0F0F0F]" />
                <div className="p-3">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded bg-[#FF7A00] px-2 py-0.5 text-[10px] font-bold text-white">
                      ⭐ Recomendado
                    </span>
                    <span className="rounded border border-[#FFC107]/50 bg-[#FFC107]/10 px-2 py-0.5 text-[10px] font-bold text-[#FFC107]">
                      ⚡ Alta demanda
                    </span>
                  </div>
                  <div className="mt-2 font-bold text-white">Bowl temporada</div>
                  <div className="mt-2 font-bold text-white/90">11,50 €</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <a
            href="#cta"
            className={cx(
              'inline-flex w-full items-center justify-center rounded-md px-8 py-4 text-base font-bold transition sm:w-auto',
              red
            )}
          >
            Quiero vender más
          </a>
          <Micro>Únete a los que ya no dejan dinero sobre la mesa</Micro>
        </div>
      </section>

      {/* 5. BENEFICIOS */}
      <section className="border-t border-white/10 bg-white/[0.02] px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Tres golpes. Un solo objetivo: caja.
        </h2>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              t: 'Más ventas',
              d: 'Destacados, copy e imágenes que empujan platos rentables y extras.',
              c: 'text-[#C52439]',
            },
            {
              t: 'Menos mermas',
              d: 'Sugerencias para rotar lo que no sale. Menos basura, más margen.',
              c: 'text-[#FF7A00]',
            },
            {
              t: 'Decisión rápida',
              d: 'Menos “¿qué ponemos?”. Más pedidos en menos tiempo.',
              c: 'text-[#FFC107]',
            },
          ].map((b) => (
            <div
              key={b.t}
              className="rounded-xl border border-white/10 bg-[#141414] p-6"
            >
              <h3 className={cx('text-xl font-bold', b.c)}>{b.t}</h3>
              <p className="mt-3 text-sm text-white/70">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CÓMO FUNCIONA */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Cómo funciona (sin humo)
        </h2>
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
          {[
            {
              n: '1',
              t: 'Subes tu carta',
              d: 'En minutos. Sin complicarte.',
            },
            {
              n: '2',
              t: 'La IA la convierte en ventas',
              d: 'Textos, imágenes y destacados con criterio.',
            },
            {
              n: '3',
              t: 'Tú mides y ajustas',
              d: 'Lo que no vende, se corrige. Rápido.',
            },
          ].map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFC107] text-2xl font-black text-[#0F0F0F]">
                {s.n}
              </div>
              <h3 className="mt-4 font-bold text-white">{s.t}</h3>
              <p className="mt-2 text-sm text-white/65">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-[#FFC107]/30 bg-[#FFC107]/5 p-6 text-center">
          <p className="font-bold text-[#FFC107]">Funciona en 5 minutos</p>
          <p className="mt-2 text-sm text-white/75">
            Sin TPV obligatorio · Sin instalación compleja · Sin perder el día
            en formaciones
          </p>
        </div>
      </section>

      {/* 7. PRICING — ancla: caro primero */}
      <section id="precios" className="scroll-mt-24 border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Elige cómo quieres dominar la carta
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-white/55">
            Plan caro primero a propósito: anclas el valor. El del medio es el
            que más restaurantes eligen.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* PREMIUM — ancla */}
            <div className="order-1 flex flex-col rounded-xl border border-white/15 bg-[#1a1a1a] p-7 lg:order-1">
              <div className="text-xs font-bold uppercase tracking-widest text-[#FFC107]">
                Premium
              </div>
              <div className="mt-2 text-3xl font-black text-white">
                289 €
                <span className="text-base font-normal text-white/45">/mes</span>
              </div>
              <p className="mt-2 text-sm text-white/55">
                Volumen, marca y control total. Para quien quiere exprimir la
                carta.
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-white/75">
                <li>✓ IA ilimitada práctica</li>
                <li>✓ Multi-local / reporting</li>
                <li>✓ Soporte prioritario</li>
              </ul>
              <a
                href="#cta"
                className={cx(
                  'mt-8 inline-flex w-full justify-center rounded-md py-3 text-center text-sm font-bold transition',
                  orange
                )}
              >
                Hablar con ventas
              </a>
              <Micro className="!mt-2">Para equipos y franquicias</Micro>
            </div>

            {/* PRO — popular */}
            <div className="order-2 relative flex flex-col rounded-xl border-2 border-[#C52439] bg-[#141414] p-7 shadow-[0_0_50px_-15px_rgba(197,36,57,0.5)] lg:order-2 lg:-mt-4 lg:mb-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#C52439] px-4 py-1 text-xs font-black uppercase text-white">
                Más popular
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                Pro
              </div>
              <div className="mt-2 text-3xl font-black text-white">
                129 €
                <span className="text-base font-normal text-white/45">/mes</span>
              </div>
              <p className="mt-2 text-sm text-white/65">
                Lo que la mayoría necesita para vende más ya.
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-white/85">
                <li>✓ Destacados inteligentes</li>
                <li>✓ Imágenes + copy IA</li>
                <li>✓ Anti-mermas sugeridas</li>
                <li>✓ Soporte 24h</li>
              </ul>
              <a
                href="#cta"
                className={cx(
                  'mt-8 inline-flex w-full justify-center rounded-md py-3 text-center text-sm font-bold transition',
                  red
                )}
              >
                Quiero vender más
              </a>
              <Micro className="!mt-2">
                Resultados desde el primer día · Sin permanencia en prueba
              </Micro>
            </div>

            {/* BASIC */}
            <div className="order-3 flex flex-col rounded-xl border border-white/15 bg-[#1a1a1a] p-7 lg:order-3">
              <div className="text-xs font-bold uppercase tracking-widest text-white/45">
                Basic
              </div>
              <div className="mt-2 text-3xl font-black text-white">
                59 €
                <span className="text-base font-normal text-white/45">/mes</span>
              </div>
              <p className="mt-2 text-sm text-white/55">
                Entrar fuerte sin arriesgar. Perfecto para un solo local.
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-white/70">
                <li>✓ Carta + QR</li>
                <li>✓ IA base</li>
                <li>✓ Email support</li>
              </ul>
              <a
                href="#cta"
                className={cx(
                  'mt-8 inline-flex w-full justify-center rounded-md border-2 border-[#FF7A00] bg-transparent py-3 text-center text-sm font-bold text-[#FF7A00] transition hover:bg-[#FF7A00] hover:text-white'
                )}
              >
                Empezar
              </a>
              <Micro className="!mt-2">Empieza gratis en 2 minutos</Micro>
            </div>
          </div>

          {/* Franquicias */}
          <div className="mt-10 rounded-xl border border-[#FFC107]/40 bg-[#FFC107]/5 p-6 text-center sm:p-8">
            <h3 className="text-lg font-bold text-[#FFC107]">
              Franquicias & cadenas
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-white/75">
              Misma carta, misma marca, datos por tienda. Precio cerrado bajo
              propuesta.
            </p>
            <a
              href="#cta"
              className={cx(
                'mt-6 inline-flex rounded-md px-8 py-3 text-sm font-bold transition',
                orange
              )}
            >
              Pedir propuesta
            </a>
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section
        id="cta"
        className="scroll-mt-24 border-t border-[#C52439]/40 bg-gradient-to-b from-[#1a0a0c] to-[#0F0F0F] px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black leading-tight sm:text-4xl">
            Deja de regalar margen a la indecisión
          </h2>
          <p className="mt-4 text-lg text-white/75">
            Cada día sin NeuroCarta es dinero que no vuelve.{' '}
            <span className="text-[#FFC107]">Plazas limitadas</span> este mes.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:hola@neurocarta.ai?subject=Demo%20NeuroCarta"
              className={cx(
                'inline-flex min-w-[220px] items-center justify-center rounded-md px-8 py-4 text-lg font-black transition',
                red
              )}
            >
              Empieza ahora
            </a>
            <a
              href="mailto:hola@neurocarta.ai?subject=Quiero%20vender%20más"
              className={cx(
                'inline-flex min-w-[220px] items-center justify-center rounded-md px-8 py-4 text-lg font-black transition',
                orange
              )}
            >
              Quiero vender más
            </a>
          </div>
          <Micro>
            Sin compromiso · Te respondemos en menos de 24h · Si no vendes más
            idea, no seguimos hablando
          </Micro>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-white/40 sm:px-6">
        NeuroCarta.ai · Carta que vende · No es información, es conversión
      </footer>
    </div>
  )
}
