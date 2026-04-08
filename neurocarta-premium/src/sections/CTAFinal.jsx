import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function CTAFinal() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Whole block fades and slides in
      gsap.from('.cta-inner', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.cta-inner', start: 'top 82%' },
      })

      // Buttons stagger
      gsap.from('.cta-btn', {
        opacity: 0,
        scale: 0.93,
        stagger: 0.12,
        duration: 0.55,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.cta-inner', start: 'top 82%' },
        delay: 0.35,
      })

      // Subtle glow pulse on primary CTA once in view
      gsap.to('.cta-primary', {
        boxShadow: '0 0 40px 8px rgba(200, 48, 48, 0.35)',
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: 'sine.inOut',
        delay: 1.2,
        scrollTrigger: { trigger: '.cta-inner', start: 'top 82%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="section-pad border-t border-nc-red/20 bg-gradient-to-b from-[#0F0607] to-nc-bg scroll-mt-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-nc-red/[0.06] blur-3xl" />
      </div>

      <div className="container-wide">
        <div className="cta-inner mx-auto max-w-2xl text-center">

          {/* Urgency badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-nc-red/30 bg-nc-red/8 px-3.5 py-1.5 text-xs font-semibold text-nc-red mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-nc-red animate-pulse" />
            Plazas de onboarding guiado limitadas este mes
          </span>

          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Deja de dejar dinero
            <br />
            <span className="gold-text">encima de la mesa.</span>
          </h2>

          <p className="mt-5 text-base text-nc-muted leading-relaxed">
            Cada día sin NeuroCarta.ai® es un día con la carta trabajando en tu contra:
            platos mal posicionados, mermas no controladas, upselling perdido.
            <strong className="text-nc-text"> Empieza hoy.</strong>
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:hola@neurocarta.ai?subject=Demo%20NeuroCarta.ai%C2%AE"
              className="cta-btn cta-primary inline-flex min-w-[220px] items-center justify-center gap-2 rounded-md bg-nc-red hover:bg-nc-red-hover px-8 py-4 text-base font-black text-white transition-colors"
            >
              Solicitar demo gratis
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="mailto:hola@neurocarta.ai?subject=Quiero%20más%20información"
              className="cta-btn inline-flex min-w-[220px] items-center justify-center gap-2 rounded-md border border-nc-border bg-nc-elevated hover:border-nc-subtle px-8 py-4 text-base font-semibold text-nc-text transition-colors"
            >
              Hablar con el equipo
            </a>
          </div>

          {/* Micro guarantees */}
          <p className="mt-5 text-xs text-nc-subtle">
            Sin tarjeta de crédito · Respondemos en menos de 24 h · Sin compromiso de permanencia
          </p>

          {/* Social proof micro */}
          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-nc-subtle">
            <div className="flex -space-x-2">
              {['#C83030', '#D4A84B', '#E07030', '#888'].map((c) => (
                <span
                  key={c}
                  className="h-7 w-7 rounded-full border-2 border-nc-bg flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: c }}
                  aria-hidden="true"
                >
                  R
                </span>
              ))}
            </div>
            <span>+180 restaurantes ya venden más con NeuroCarta.ai®</span>
          </div>
        </div>
      </div>
    </section>
  )
}
