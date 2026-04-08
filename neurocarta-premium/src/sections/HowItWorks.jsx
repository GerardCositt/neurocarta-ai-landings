import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const STEPS = [
  {
    n: '01',
    title: 'Digitaliza tu carta',
    desc: 'Sube tu carta actual en cualquier formato. La IA la lee, la estructura y la prepara para optimización en minutos.',
    detail: 'PDF, imagen, texto o escrito a mano — lo procesamos todo.',
  },
  {
    n: '02',
    title: 'La IA optimiza cada plato',
    desc: 'Copy persuasivo, imágenes generadas o mejoradas, y puntuación de conversión por plato. Todo automático.',
    detail: 'Textos que activan el deseo. Fotos que abren el apetito.',
  },
  {
    n: '03',
    title: 'Destaca lo que más te interesa',
    desc: 'Pon el foco en los platos con más margen, los que rotan mejor o los que necesitas mover hoy.',
    detail: 'Tú mandas. La IA ejecuta.',
  },
  {
    n: '04',
    title: 'Mide, ajusta y mejora',
    desc: 'Analítica por plato, datos de interés y conversión. Cada semana sabes exactamente qué cambiar.',
    detail: 'Decisiones con datos reales, no con intuición.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hiw-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.hiw-header', start: 'top 85%' },
      })

      // Steps cascade in one by one
      gsap.from('.hiw-step', {
        opacity: 0,
        x: -30,
        stagger: 0.18,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.hiw-steps', start: 'top 78%' },
      })

      // Progress line grows downward via scaleY
      gsap.from('.hiw-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.hiw-steps', start: 'top 75%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-pad border-t border-nc-border">
      <div className="container-wide">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">

          {/* Header + claim */}
          <div className="hiw-header lg:sticky lg:top-28">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-nc-gold">
              Cómo funciona
            </p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              En 4 pasos.
              <br />
              <span className="gold-text">Sin complicaciones.</span>
            </h2>
            <p className="mt-4 text-nc-muted leading-relaxed">
              No necesitas saber de tecnología. No necesitas formación larga.
              No necesitas integrarte con tu TPV.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'Sin TPV obligatorio',
                'Setup en 5 minutos',
                'Soporte en español',
                'Sin permanencia',
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-nc-border bg-nc-surface px-3 py-1.5 text-xs font-medium text-nc-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href="#cta"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-nc-gold hover:bg-nc-gold-dim px-6 py-3 text-sm font-bold text-nc-bg transition-colors btn-gold-glow"
            >
              Empezar ahora
            </a>
          </div>

          {/* Steps */}
          <div className="hiw-steps relative pl-8">
            {/* Vertical line */}
            <div className="hiw-line absolute left-3 top-2 bottom-2 w-px bg-nc-border" />

            <div className="space-y-10">
              {STEPS.map((step, i) => (
                <div key={step.n} className="hiw-step relative">
                  {/* Step dot */}
                  <div className="absolute -left-8 flex h-6 w-6 items-center justify-center rounded-full border-2 border-nc-gold bg-nc-bg">
                    <span className="text-[9px] font-black text-nc-gold">{i + 1}</span>
                  </div>

                  <div className="rounded-xl border border-nc-border bg-nc-surface p-5 hover:border-nc-gold/30 transition-colors">
                    <span className="text-xs font-bold text-nc-gold/50">{step.n}</span>
                    <h3 className="mt-1 text-base font-bold text-nc-text">{step.title}</h3>
                    <p className="mt-2 text-sm text-nc-muted leading-relaxed">{step.desc}</p>
                    <p className="mt-3 text-xs font-medium text-nc-gold/70 italic">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
