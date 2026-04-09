import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cx = (...c) => c.filter(Boolean).join(' ')

/** Titular principal del hero */
const heroHeadlineClass =
  'text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl sm:leading-[1.08]'

/** Marca bajo “Empieza gratis…”: un escalón por encima del H1 */
const heroBrandBelowMicroClass =
  'text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl sm:leading-[1.06]'

/** T4 — cuerpo destacado (18px en todos los anchos) */
const typeT4Class =
  'text-[18px] font-medium leading-relaxed text-white/90'

/** Titulares de sección “fuertes” (problema / solución): primera línea + promesa dorada */
const sectionAccentTitleLineClass =
  'block text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.08]'
const sectionAccentTitleGoldClass =
  'mt-3 block text-4xl font-black leading-tight tracking-tight text-[#FFC107] sm:text-6xl sm:leading-[1.05]'

/** Marca en UI: NeuroCarta + .ai en dorado + ® */
function BrandName({ regClassName = 'text-white/70', regSizeClass = 'text-[10px]' }) {
  return (
    <>
      NeuroCarta<span className="text-[#FFC107]">.ai</span>
      <span
        className={cx('align-super', regSizeClass, regClassName)}
        aria-label="marca registrada"
      >
        ®
      </span>
    </>
  )
}

/** Señal de “dolor / alerta” en tarjetas problema — visible y sin usar una X */
function ProblemPainIcon() {
  return (
    <span
      className={cx(
        'mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full',
        'bg-[#C52439]/20 shadow-[0_0_0_1px_rgba(255,193,7,0.35),0_0_20px_-8px_rgba(197,36,57,0.65)]'
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-[#FFC107]"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.598 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  )
}

const red = 'bg-[#C52439] hover:bg-[#a01d2e] text-white shadow-lg shadow-[#C52439]/25'
const orange =
  'bg-[#FF7A00] hover:bg-[#e56e00] text-white shadow-lg shadow-[#FF7A00]/20'

function Micro({ children, className = '' }) {
  return (
    <p className={cx('mt-2 text-center text-base leading-relaxed text-white/60 sm:text-lg', className)}>
      {children}
    </p>
  )
}

function ProductBadge({ tone, label, sub }) {
  const isGold = tone === 'gold'
  return (
    <div
      className={cx(
        'inline-flex items-center gap-3 rounded-2xl border px-4 py-2.5',
        'shadow-[0_10px_22px_-14px_rgba(0,0,0,0.35)]',
        isGold
          ? 'border-[#e8d391] bg-[linear-gradient(135deg,#e8d391_0%,#d7b75b_55%,#b58c2f_100%)] text-[#2a1b00]'
          : 'border-emerald-900/35 bg-[linear-gradient(135deg,#173d33_0%,#0f2e27_55%,#0a241f_100%)] text-white'
      )}
    >
      <span
        className={cx(
          'inline-flex h-10 w-10 flex-none items-center justify-center rounded-full',
          'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]',
          isGold ? 'bg-white/30 text-[#2a1b00]' : 'bg-white/10 text-white'
        )}
        aria-hidden="true"
      >
        {isGold ? '♛' : '♥'}
      </span>
      <span className="leading-tight">
        <span className={cx('block text-[12px] font-black uppercase tracking-[0.18em]', isGold ? 'text-[#2a1b00]' : 'text-white')}>
          {label}
        </span>
        <span className={cx('block text-sm font-semibold', isGold ? 'text-[#3a2a0a]/85' : 'text-white/85')}>
          {sub}
        </span>
      </span>
    </div>
  )
}

function AllergenIcon({ type }) {
  const key = (type || '').toLowerCase()
  const isLacteos = key.includes('láct') || key.includes('lact')
  const cfg =
    isLacteos
      ? { abbr: 'LA', label: 'Lácteos', ring: 'ring-[#C52439]/25', border: 'border-[#C52439]/35', text: 'text-[#C52439]' }
      : key.includes('pesc')
        ? { abbr: 'PE', label: 'Pescado', ring: 'ring-sky-500/25', border: 'border-sky-500/40', text: 'text-sky-600' }
        : key.includes('crust')
          ? { abbr: 'CR', label: 'Crustáceos', ring: 'ring-orange-500/20', border: 'border-orange-500/40', text: 'text-orange-600' }
          : key.includes('molus')
            ? { abbr: 'MO', label: 'Moluscos', ring: 'ring-slate-500/20', border: 'border-slate-500/35', text: 'text-slate-600' }
            : key.includes('sulfit')
              ? { abbr: 'SU', label: 'Sulfitos', ring: 'ring-amber-500/20', border: 'border-amber-500/40', text: 'text-amber-700' }
              : { abbr: 'AL', label: type, ring: 'ring-black/10', border: 'border-black/20', text: 'text-black/60' }

  return (
    <div
      className={cx(
        'inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white shadow-sm ring-1',
        cfg.border,
        cfg.ring
      )}
      title={cfg.label}
      aria-label={cfg.label}
    >
      {isLacteos ? (
        <img
          src="/allergenos/lacteos.png"
          alt=""
          className="h-8 w-8 object-contain"
          loading="lazy"
          aria-hidden="true"
        />
      ) : (
        <span className={cx('text-[11px] font-black tracking-wide', cfg.text)}>{cfg.abbr}</span>
      )}
    </div>
  )
}

export default function App() {
  /* ── Refs para cada bloque animable ── */
  const heroRef      = useRef(null)
  const statsRef     = useRef(null)
  const problemRef   = useRef(null)
  const messagesRef  = useRef(null)
  const solutionRef  = useRef(null)
  const demoRef      = useRef(null)
  const benefitsRef  = useRef(null)
  const stepsRef     = useRef(null)
  const pricingRef   = useRef(null)
  const ctaRef       = useRef(null)

  // Pricing (mostrar precios + anclaje neuromarketing)
  const annualBilling = true
  const priceBasic = annualBilling ? '€59' : '€69'
  const pricePro = annualBilling ? '€129' : '€149'
  const pricePremium = annualBilling ? '€249' : '€289'
  const periodLabel = annualBilling ? '/mes (fact. anual)' : '/mes'

  // URLs del producto (cámbialas cuando tengas la app)
  const LOGIN_URL = 'https://app.neurocarta.ai/login/'
  const SIGNUP_URL = 'https://app.neurocarta.ai/login/'

  const demoItems = [
    {
      name: 'Ensalada de la casa (Tomate de temporada con ventresca)',
      desc: 'Tomate de temporada con ventresca, regado con nuestra vinagreta especial.',
      price: '14,00€',
      badge: { label: 'Destacado', sub: 'Nuestra joya de carta', tone: 'gold' },
      imageSrc: '/demo/ensalada-de-la-casa.png',
      imageTone: 'from-[#d6c2a1] via-[#b7c7b4] to-[#0F0F0F]',
      allergens: [],
    },
    {
      name: 'Sopa de marisco',
      desc: 'Preparada con ingredientes frescos y seleccionados. Reconfortante y con sabor intenso.',
      price: '15,90€',
      badge: null,
      imageSrc: '/demo/sopa-de-marisco.png',
      imageTone: 'from-[#c07a2f] via-[#8a4b1b] to-[#0F0F0F]',
      allergens: [],
      pairing: 'Uva: Albariño, Loureiro y Caiño blanco.',
    },
    {
      name: 'Queso manchego',
      desc: 'Curado, sin pasteurizar. Ideal para compartir. Sabor profundo y textura perfecta.',
      price: '12,00€',
      badge: { label: 'Recomendado', sub: 'El que más triunfa', tone: 'green' },
      imageSrc: '/demo/queso-manchego.png',
      imageTone: 'from-[#d9c9a6] via-[#7a5b3a] to-[#0F0F0F]',
      allergens: ['Lácteos'],
    },
  ]

  const [openItem, setOpenItem] = useState(null)

  // En móvil (cambios de viewport por barra de dirección/orientación) los triggers pueden desalinearse.
  // Refrescamos ScrollTrigger de forma barata y segura.
  useEffect(() => {
    let raf = 0
    const refresh = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    // tras carga inicial + cuando cargan imágenes
    refresh()
    window.addEventListener('load', refresh, { passive: true })
    window.addEventListener('resize', refresh, { passive: true })
    window.addEventListener('orientationchange', refresh, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
      window.removeEventListener('orientationchange', refresh)
    }
  }, [])

  /* ──────────────────────────────────────────────────────────────
     HERO — timeline al cargar (en móvil / reduce-motion: sin animación)
  ────────────────────────────────────────────────────────────── */
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isMobile, reduceMotion } = context.conditions
        const targets = [
          '.anim-banner',
          '.anim-badge',
          '.anim-h1',
          '.anim-subtitle',
          '.anim-cta-wrap',
          '.anim-micro',
          '.anim-hero-brand',
        ]

        if (isMobile || reduceMotion) {
          gsap.set(targets, { opacity: 1, clearProps: 'transform' })
          return
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.anim-banner',   { y: -30,  opacity: 0, duration: 0.2 })
          .from('.anim-badge',    { y: -15,  opacity: 0, duration: 0.18 }, '+=0.02')
          .from('.anim-h1',       { y: 50,   opacity: 0, duration: 0.28, skewY: 3 }, '+=0.02')
          .from('.anim-subtitle', { y: 25,   opacity: 0, duration: 0.22 }, '+=0.02')
          .from('.anim-cta-wrap', { y: 20,   opacity: 0, duration: 0.2  }, '+=0.02')
          .from('.anim-micro',       { opacity: 0, duration: 0.18 }, '+=0.02')
          .from('.anim-hero-brand',  { opacity: 0, y: 16, duration: 0.2 }, '+=0.02')
      }
    )

    return () => mm.revert()
  }, { scope: heroRef })

  /* ──────────────────────────────────────────────────────────────
     SCROLL ANIMATIONS — desktop conserva scrub; móvil usa
     entradas más cortas y sin desplazamientos agresivos
  ────────────────────────────────────────────────────────────── */
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, isMobile, reduceMotion } = context.conditions

        // En móvil priorizamos legibilidad y estabilidad: sin dependencias del scroll para “ver” el contenido.
        if (isMobile || reduceMotion) {
          gsap.set(
            [
              '.anim-stat',
              '.anim-problem-title',
              '.anim-problem-card',
              '.anim-msg',
              '.anim-solution-h2',
              '.anim-solution-p',
              '.anim-demo-title',
              '.anim-before',
              '.anim-after',
              '.anim-benefit-title',
              '.anim-benefit-card',
              '.anim-steps-title',
              '.anim-step',
              '.anim-pricing-title',
              '.anim-plan',
              '.anim-cta-h2',
              '.anim-cta-p',
              '.anim-cta-btn',
            ],
            { opacity: 1, clearProps: 'transform' }
          )
          return
        }

        const makeScrollTrigger = (trigger) => {
          return isDesktop
            ? {
                trigger,
                start: 'top 90%',
                end: 'top 72%',
                scrub: 0.15,
              }
            : {
                trigger,
                start: 'top 92%',
                toggleActions: 'play none none none',
                once: true,
              }
        }

        const statTrigger = makeScrollTrigger(statsRef.current)
        if (statTrigger) {
          gsap.from('.anim-stat', {
            y: isDesktop ? 120 : 32,
            opacity: 0,
            scale: isDesktop ? 0.6 : 0.96,
            stagger: isDesktop ? 0.3 : 0.12,
            ease: isDesktop ? 'back.out(2)' : 'power2.out',
            duration: isMobile ? 0.45 : undefined,
            scrollTrigger: statTrigger,
          })

          const obj18 = { val: 0 }
          const el18 = statsRef.current?.querySelector('.stat-18')
          gsap.to(obj18, {
            val: 18,
            ease: 'none',
            duration: isMobile ? 0.6 : undefined,
            onUpdate: () => {
              if (el18) el18.textContent = '+' + Math.round(obj18.val)
            },
            scrollTrigger: statTrigger,
          })

          const obj30 = { val: 0 }
          const el30 = statsRef.current?.querySelector('.stat-30')
          gsap.to(obj30, {
            val: 30,
            ease: 'none',
            duration: isMobile ? 0.6 : undefined,
            onUpdate: () => {
              if (el30) el30.textContent = '+' + Math.round(obj30.val) + '%'
            },
            scrollTrigger: statTrigger,
          })
        }

        const problemTitleTrigger = makeScrollTrigger('.anim-problem-title')
        if (problemTitleTrigger) {
          gsap.from('.anim-problem-title', {
            y: isDesktop ? 80 : 28,
            opacity: 0,
            duration: isMobile ? 0.45 : undefined,
            scrollTrigger: problemTitleTrigger,
          })
        }

        const problemCardTrigger = makeScrollTrigger('.anim-problem-grid')
        if (problemCardTrigger) {
          gsap.from('.anim-problem-card', {
            y: isDesktop ? 150 : 36,
            opacity: 0,
            scale: isDesktop ? 0.85 : 0.98,
            stagger: isDesktop ? 0.15 : 0.08,
            duration: isMobile ? 0.45 : undefined,
            ease: isMobile ? 'power2.out' : undefined,
            scrollTrigger: problemCardTrigger,
          })
        }

        const messagesTrigger = makeScrollTrigger(messagesRef.current)
        if (messagesTrigger) {
          gsap.from('.anim-msg', {
            x: isDesktop ? -200 : 0,
            y: isMobile ? 24 : 0,
            opacity: 0,
            stagger: isDesktop ? 0.12 : 0.08,
            duration: isMobile ? 0.4 : undefined,
            ease: isMobile ? 'power2.out' : undefined,
            scrollTrigger: messagesTrigger,
          })
        }

        const solutionTitleTrigger = makeScrollTrigger('.anim-solution-h2')
        if (solutionTitleTrigger) {
          gsap.from('.anim-solution-h2', {
            y: isDesktop ? 100 : 30,
            opacity: 0,
            skewY: isDesktop ? 4 : 0,
            duration: isMobile ? 0.45 : undefined,
            scrollTrigger: solutionTitleTrigger,
          })
        }

        const solutionTextTrigger = makeScrollTrigger('.anim-solution-p')
        if (solutionTextTrigger) {
          gsap.from('.anim-solution-p', {
            y: isDesktop ? 80 : 24,
            opacity: 0,
            duration: isMobile ? 0.4 : undefined,
            scrollTrigger: solutionTextTrigger,
          })
        }

        const demoTitleTrigger = makeScrollTrigger('.anim-demo-title')
        if (demoTitleTrigger) {
          gsap.from('.anim-demo-title', {
            y: isDesktop ? 80 : 28,
            opacity: 0,
            duration: isMobile ? 0.45 : undefined,
            scrollTrigger: demoTitleTrigger,
          })
        }

        const demoGridTrigger = makeScrollTrigger('.anim-demo-grid')
        if (demoGridTrigger) {
          gsap.from('.anim-before', {
            x: isDesktop ? -250 : 0,
            y: isMobile ? 28 : 0,
            opacity: 0,
            duration: isMobile ? 0.45 : undefined,
            ease: isMobile ? 'power2.out' : undefined,
            scrollTrigger: demoGridTrigger,
          })
          gsap.from('.anim-after', {
            x: isDesktop ? 250 : 0,
            y: isMobile ? 28 : 0,
            opacity: 0,
            duration: isMobile ? 0.45 : undefined,
            ease: isMobile ? 'power2.out' : undefined,
            scrollTrigger: demoGridTrigger,
          })
        }

        const benefitsTitleTrigger = makeScrollTrigger('.anim-benefit-title')
        if (benefitsTitleTrigger) {
          gsap.from('.anim-benefit-title', {
            y: isDesktop ? 80 : 28,
            opacity: 0,
            duration: isMobile ? 0.45 : undefined,
            scrollTrigger: benefitsTitleTrigger,
          })
        }

        const benefitsGridTrigger = makeScrollTrigger('.anim-benefit-grid')
        if (benefitsGridTrigger) {
          gsap.from('.anim-benefit-card', {
            y: isDesktop ? 180 : 36,
            opacity: 0,
            scale: isDesktop ? 0.75 : 0.98,
            stagger: isDesktop ? 0.15 : 0.08,
            duration: isMobile ? 0.45 : undefined,
            ease: isMobile ? 'power2.out' : undefined,
            scrollTrigger: benefitsGridTrigger,
          })
        }

        const stepsTitleTrigger = makeScrollTrigger('.anim-steps-title')
        if (stepsTitleTrigger) {
          gsap.from('.anim-steps-title', {
            y: isDesktop ? 80 : 28,
            opacity: 0,
            duration: isMobile ? 0.45 : undefined,
            scrollTrigger: stepsTitleTrigger,
          })
        }

        const stepsGridTrigger = makeScrollTrigger('.anim-steps-grid')
        if (stepsGridTrigger) {
          gsap.from('.anim-step', {
            y: isDesktop ? 150 : 34,
            opacity: 0,
            scale: isDesktop ? 0.8 : 0.98,
            stagger: isDesktop ? 0.15 : 0.08,
            duration: isMobile ? 0.45 : undefined,
            ease: isMobile ? 'power2.out' : undefined,
            scrollTrigger: stepsGridTrigger,
          })
        }

        const pricingTitleTrigger = makeScrollTrigger('.anim-pricing-title')
        if (pricingTitleTrigger) {
          gsap.from('.anim-pricing-title', {
            y: isDesktop ? 80 : 28,
            opacity: 0,
            duration: isMobile ? 0.45 : undefined,
            scrollTrigger: pricingTitleTrigger,
          })
        }

        const pricingGridTrigger = makeScrollTrigger('.anim-pricing-grid')
        if (pricingGridTrigger) {
          gsap.from('.anim-plan', {
            y: isDesktop ? 200 : 36,
            opacity: 0,
            scale: isDesktop ? 0.8 : 0.98,
            stagger: isDesktop ? 0.12 : 0.08,
            duration: isMobile ? 0.45 : undefined,
            ease: isMobile ? 'power2.out' : undefined,
            scrollTrigger: pricingGridTrigger,
          })
        }

        const ctaTitleTrigger = makeScrollTrigger('.anim-cta-h2')
        if (ctaTitleTrigger) {
          gsap.from('.anim-cta-h2', {
            y: isDesktop ? 100 : 30,
            opacity: 0,
            skewY: isDesktop ? 3 : 0,
            duration: isMobile ? 0.45 : undefined,
            scrollTrigger: ctaTitleTrigger,
          })
          gsap.from('.anim-cta-p', {
            y: isDesktop ? 60 : 24,
            opacity: 0,
            duration: isMobile ? 0.4 : undefined,
            scrollTrigger: ctaTitleTrigger,
          })
        }

        const ctaButtonsTrigger = makeScrollTrigger('.anim-cta-btns')
        if (ctaButtonsTrigger) {
          gsap.from('.anim-cta-btn', {
            y: isDesktop ? 80 : 24,
            opacity: 0,
            scale: isDesktop ? 0.6 : 0.98,
            stagger: isDesktop ? 0.1 : 0.08,
            duration: isMobile ? 0.4 : undefined,
            ease: isMobile ? 'power2.out' : undefined,
            scrollTrigger: ctaButtonsTrigger,
          })
        }

        if (!reduceMotion && isDesktop) {
          gsap.to('.anim-cta-primary', {
            boxShadow: '0 0 50px 14px rgba(197,36,57,0.7)',
            repeat: -1,
            yoyo: true,
            duration: 1.6,
            ease: 'sine.inOut',
            scrollTrigger: { trigger: '.anim-cta-btns', start: 'top 80%' },
          })
        }
      }
    )

    return () => mm.revert()
  })

  /* ──────────────────────────────────────────────────────────────
     JSX — estructura idéntica al original, solo se añaden refs y
     clases anim-* para targeting (ningún cambio visual)
  ────────────────────────────────────────────────────────────── */
  return (
    <div ref={heroRef} className="min-h-screen">
      {/* Urgencia + escasez */}
      <div className="anim-banner border-b border-[#FFC107]/30 bg-[#FFC107] px-4 py-2 text-center text-sm font-bold text-[#0F0F0F]">
        Acceso limitado · Solo{' '}
        <span className="underline decoration-2 underline-offset-2">23 plazas</span>{' '}
        con onboarding guiado este mes
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0F0F0F]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <span className="text-base font-bold tracking-tight sm:text-lg">
            <BrandName />
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={LOGIN_URL}
              className="inline-flex whitespace-nowrap rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs font-black text-white/85 transition hover:border-white/25 hover:bg-white/10 sm:px-4 sm:text-sm"
            >
              Iniciar sesión
            </a>
            <a
              href={SIGNUP_URL}
              className={cx(
                'rounded-md px-3 py-2 text-xs font-black transition sm:px-4 sm:text-sm',
                red
              )}
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </header>

      {/* 1. HERO */}
      <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(197,36,57,0.15),transparent)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="anim-badge mb-4 inline-block rounded-full border border-[#FFC107]/40 bg-[#FFC107]/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-[#FFC107] sm:text-base">
            No es una carta. Es una herramienta de ventas
          </p>
          <h1 className={cx('anim-h1', heroHeadlineClass)}>
            Convierte tu carta en una{' '}
            <span className="text-[#FFC107]">máquina de ventas</span>
          </h1>
          <p className="anim-subtitle mx-auto mt-4 max-w-2xl text-lg text-white/80 sm:text-xl">
            Estás tirando comida sin darte cuenta. Tus clientes no saben qué
            pedir — y tú pierdes ventas.
          </p>

          <div className="anim-cta-wrap mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
          <p className="anim-micro mt-5 text-center text-lg font-medium leading-relaxed text-white/70 sm:text-xl">
            Empieza gratis en 5 minutos · Sin compromiso · Resultados desde el
            primer día
          </p>
          <p className={cx('anim-hero-brand mt-3 text-center', heroBrandBelowMicroClass)}>
            <span className="inline-block w-full max-w-full text-inherit">
              <BrandName regClassName="text-white/70" regSizeClass="text-base sm:text-lg" />
            </span>
          </p>
        </div>
      </section>

      {/* Prueba social */}
      <section ref={statsRef} className="border-y border-white/10 bg-white/[0.03] px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 text-center sm:flex-row sm:gap-16">
          <div className="anim-stat">
            <div className="text-3xl font-black text-[#FFC107] sm:text-4xl">
              <span className="stat-18">+18</span>
            </div>
            <div className="mt-1 text-sm text-white/70">
              restaurantes ya venden más con <BrandName regClassName="text-white/55" />
            </div>
          </div>
          <div className="anim-stat hidden h-12 w-px bg-white/15 sm:block" />
          <div className="anim-stat">
            <div className="text-3xl font-black text-[#FFC107] sm:text-4xl">
              <span className="stat-30">+30%</span>
            </div>
            <div className="mt-1 text-sm text-white/70">
              en platos destacados (media interna)
            </div>
          </div>
          <div className="anim-stat hidden h-12 w-px bg-white/15 sm:block" />
          <div className="anim-stat">
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
      <section ref={problemRef} id="dolor" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="anim-problem-title text-balance">
            <span className={sectionAccentTitleLineClass}>
              Si te pasa esto…{' '}
              <span className="font-semibold text-white/70">no eres tú.</span>
            </span>
            <span className={sectionAccentTitleGoldClass}>Es tu carta.</span>
          </h2>
        </div>
        <ul className="anim-problem-grid mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2">
          {[
            'Los clientes tardan en decidir y piden "lo de siempre".',
            'Tienes platos que no salen y acaban en la basura.',
            'Tiras comida porque no rotas lo que toca.',
            'El ticket medio se queda corto aunque el local esté lleno.',
          ].map((t) => (
            <li
              key={t}
              className={cx(
                'anim-problem-card flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-[0_0_0_1px_rgba(197,36,57,0.18)]',
                typeT4Class
              )}
            >
              <ProblemPainIcon />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Mensajes clave */}
      <section ref={messagesRef} className="border-y border-white/10 bg-[#141414] px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {[
            'Convierte clientes indecisos en pedidos.',
            'Vende lo que te interesa, no lo que el cliente elige al azar.',
            'Reduce mermas automáticamente.',
            'No es una carta bonita. Es una máquina de conversión.',
          ].map((msg) => (
            <blockquote
              key={msg}
              className="anim-msg border-l-4 border-[#FFC107] pl-4 text-xl font-semibold leading-snug text-white sm:text-2xl sm:leading-snug"
            >
              {msg}
            </blockquote>
          ))}
        </div>
      </section>

      {/* 3. SOLUCIÓN */}
      <section ref={solutionRef} className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="anim-solution-h2 text-balance">
            <span className={sectionAccentTitleLineClass}>
              <BrandName /> no &quot;informa&quot;.
            </span>
            <span className={sectionAccentTitleGoldClass}>Empuja a pedir</span>
          </h2>
          <p className="anim-solution-p mt-4 text-lg text-white/75">
            IA que destaca platos rentables, mejora textos e imágenes, y ordena
            tu oferta para que el cliente decida más rápido — y tú vendas lo
            que te conviene.
          </p>
        </div>
      </section>

      {/* 4. DEMO VISUAL antes / después */}
      <section ref={demoRef} id="demo" className="scroll-mt-24 overflow-x-hidden px-4 pb-16 sm:px-6 sm:pb-20">
        <h2 className="anim-demo-title text-center text-balance">
          <span className={sectionAccentTitleLineClass}>Mira la diferencia.</span>
          <span className={sectionAccentTitleGoldClass}>Sin rodeos.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-xl font-semibold leading-snug text-white/80 sm:mt-4 sm:text-2xl sm:leading-snug">
          No explicamos. Enseñamos.
        </p>

        <div className="anim-demo-grid mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* ANTES */}
          <div className="anim-before rounded-xl border border-white/15 bg-[#1a1a1a] p-5">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-white/80">
              <span className="h-2 w-2 rounded-full bg-white/40" aria-hidden="true" />
              Antes
            </div>
            <div className="space-y-3 text-sm text-white/60">
              {demoItems.map((it, idx) => (
                <div
                  key={it.name}
                  className={cx(idx !== demoItems.length - 1 ? 'border-b border-white/10 pb-3' : '')}
                >
                  <div className="max-w-full truncate font-medium text-white/85">
                    {it.name.split(' (')[0]}
                  </div>
                  <div className="mt-1 whitespace-normal break-words text-white/60">
                    {it.desc.split('.').at(0) || it.desc}
                  </div>
                  <div className="mt-2 text-white/45">{it.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DESPUÉS */}
          <div className="anim-after relative overflow-hidden rounded-xl border-2 border-[#FFC107]/50 bg-[#141414] p-5 shadow-[0_0_40px_-10px_rgba(255,193,7,0.25)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FFC107]/30 bg-[#FFC107]/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-[#FFC107]">
                <span className="h-2 w-2 rounded-full bg-[#FFC107]" aria-hidden="true" />
                Después
              </span>
              <span className="rounded-full bg-[#FFC107] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#0F0F0F]">
                IA ACTIVA
              </span>
            </div>
            {/* “Carta pública” (estilo real): claro + foto + badge + CTA */}
            <div className="rounded-xl border border-white/10 bg-white p-4">
              <div className="mb-3 text-sm font-black tracking-tight text-[#1a1a1a]">
                Entrantes
              </div>
              <div className="space-y-3">
                {demoItems.map((it) => (
                  <div
                    key={it.name}
                    className={cx(
                      'group overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition',
                      '[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-black/20',
                      'hover:shadow-[0_24px_60px_-18px_rgba(0,0,0,0.55),0_0_0_2px_rgba(197,36,57,0.18)]'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenItem(it)}
                      className="flex w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C52439]/20"
                      aria-label={`Añadir / ver ficha de ${it.name}`}
                    >
                      {it.imageSrc ? (
                        <img
                          src={it.imageSrc}
                          alt={it.name}
                          className="h-[118px] w-[118px] flex-none object-cover transition duration-300 [@media(hover:hover)]:group-hover:scale-[1.06]"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className={cx(
                            'h-[118px] w-[118px] flex-none bg-gradient-to-br transition duration-300 [@media(hover:hover)]:group-hover:scale-[1.06]',
                            it.imageTone
                          )}
                          aria-hidden="true"
                        />
                      )}
                      <div className="min-w-0 flex-1 p-4">
                        {it.badge ? (
                          <ProductBadge
                            tone={it.badge.tone}
                            label={it.badge.label}
                            sub={it.badge.sub}
                          />
                        ) : null}

                        <div className="mt-2 text-[20px] font-black leading-tight tracking-tight text-[#141414]">
                          {it.name}
                        </div>
                        <div className="mt-2 text-sm leading-relaxed text-black/55">
                          {it.desc}
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="text-lg font-black text-[#C52439]">
                            {it.price}
                          </div>
                          <span className="inline-flex items-center justify-center rounded-full border border-[#C52439]/25 bg-[#C52439]/5 px-4 py-2 text-sm font-black text-[#C52439]">
                            Añadir
                          </span>
                        </div>
                        {it.allergens?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {it.allergens.slice(0, 3).map((a) => (
                              <AllergenIcon key={a} type={a} />
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </button>
                  </div>
                ))}
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
          <p className="mt-4 text-center text-lg text-white/75">
            Únete a los que ya no dejan dinero sobre la mesa
          </p>
        </div>
      </section>

      {/* Modal “ficha de producto” (solo demo, para mostrar el efecto) */}
      {openItem ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Ficha de producto"
          onClick={() => setOpenItem(null)}
        >
          <div
            className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {openItem.imageSrc ? (
                <img
                  src={openItem.imageSrc}
                  alt={openItem.name}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div
                  className={cx('h-56 w-full bg-gradient-to-br', openItem.imageTone)}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                onClick={() => setOpenItem(null)}
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/60"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              {openItem.badge ? (
                <ProductBadge
                  tone={openItem.badge.tone}
                  label={openItem.badge.label}
                  sub={openItem.badge.sub}
                />
              ) : null}

              <div className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#141414]">
                {openItem.name}
              </div>
              <div className="mt-3 text-sm leading-relaxed text-black/55">
                {openItem.desc}
              </div>

              {openItem.pairing ? (
                <div className="mt-5">
                  <div className="text-center text-xs font-black uppercase tracking-widest text-[#7d0f1a]">
                    Maridaje
                  </div>
                  <div className="mt-3 rounded-2xl bg-[#7d0f1a]/5 p-4 text-center text-sm text-black/55 ring-1 ring-[#7d0f1a]/20">
                    {openItem.pairing}
                  </div>
                </div>
              ) : null}

              <div className="mt-5 border-t border-black/10 pt-5 text-center">
                <div className="text-3xl font-black tracking-tight text-[#7d0f1a]">
                  {openItem.price}
                </div>
              </div>

              {openItem.allergens?.length ? (
                <div className="mt-5">
                  <div className="text-center text-xs font-black uppercase tracking-widest text-[#7d0f1a]">
                    Alérgenos
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    {openItem.allergens.map((a) => (
                      <AllergenIcon key={a} type={a} />
                    ))}
                  </div>
                </div>
              ) : null}

              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#7d0f1a] px-5 py-4 text-base font-black text-white shadow-lg shadow-[#7d0f1a]/25 transition hover:bg-[#671017]"
              >
                Añadir al pedido
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 5. BENEFICIOS */}
      <section ref={benefitsRef} className="border-t border-white/10 bg-white/[0.02] px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="anim-benefit-title text-center text-3xl font-bold sm:text-4xl">
          Tres golpes. Un solo objetivo: caja.
        </h2>
        <div className="anim-benefit-grid mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
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
              d: 'Menos "¿qué ponemos?". Más pedidos en menos tiempo.',
              c: 'text-[#FFC107]',
            },
          ].map((b) => (
            <div
              key={b.t}
              className="anim-benefit-card rounded-xl border border-white/10 bg-[#141414] p-7"
            >
              <h3 className={cx('text-3xl font-bold leading-tight tracking-tight sm:text-4xl', b.c)}>
                {b.t}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CÓMO FUNCIONA */}
      <section ref={stepsRef} className="px-4 py-16 sm:px-6 sm:py-20">
        <h3 className="anim-steps-title text-center text-3xl font-bold sm:text-4xl">
          Cómo funciona (sin humo)
        </h3>
        <div className="anim-steps-grid mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-3">
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
            <div key={s.n} className="anim-step text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFC107] text-3xl font-black text-[#0F0F0F]">
                {s.n}
              </div>
              <h4 className="mt-5 text-xl font-black text-white">{s.t}</h4>
              <p className="mt-2 text-base leading-relaxed text-white/65">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-[#FFC107]/30 bg-[#FFC107]/5 p-7 text-center">
          <p className="text-3xl font-black text-[#FFC107] sm:text-4xl">Funciona en 5 minutos</p>
          <p className="mt-2 text-base text-white/75">
            Sin TPV obligatorio · Sin instalación compleja · Sin perder el día
            en formaciones
          </p>
        </div>
      </section>

      {/* 7. PRICING */}
      <section ref={pricingRef} id="precios" className="scroll-mt-24 border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="anim-pricing-title text-center text-2xl font-bold sm:text-3xl">
            Elige cómo quieres dominar la carta
          </h2>

          <div className="anim-pricing-grid mt-12 grid gap-6 lg:grid-cols-3">
            {/* PREMIUM — ancla */}
            <div className="anim-plan order-1 flex flex-col rounded-xl border border-white/15 bg-[#1a1a1a] p-7 lg:order-1">
              <div className="text-xs font-black uppercase tracking-widest text-[#FFC107]">
                Plan
              </div>
              <div className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Premium
              </div>
              <div className="mt-4 flex items-end gap-2">
                <div className="text-4xl font-black tracking-tight text-white">
                  {pricePremium}
                </div>
                <div className="pb-1 text-sm font-semibold text-white/55">
                  {periodLabel}
                </div>
              </div>
              <p className="mt-2 text-sm text-white/55">
                Para máximo rendimiento y equipos exigentes.
              </p>
              <p className="mt-1 text-xs text-white/40">Incluye todo lo del Pro, más:</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-white/75">
                <li>✓ IA avanzada (cuota alta o ilimitada)</li>
                <li>✓ Mayor capacidad de catálogo</li>
                <li>✓ Prioridad en nuevas funcionalidades</li>
                <li>✓ Soporte preferente</li>
              </ul>
              <p className="mt-4 text-xs text-white/40">
                Hasta 2.000 productos y 200 categorías · IA: cuota alta / ilimitada
              </p>
              <a
                href="#cta"
                className={cx(
                  'mt-6 inline-flex w-full justify-center rounded-md py-3 text-center text-sm font-bold transition',
                  orange
                )}
              >
                Pasar a Premium
              </a>
            </div>

            {/* PRO — popular */}
            <div className="anim-plan order-2 relative flex flex-col rounded-xl border-2 border-[#C52439] bg-[#141414] p-7 shadow-[0_0_50px_-15px_rgba(197,36,57,0.5)] lg:order-2 lg:-mt-4 lg:mb-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#C52439] px-4 py-1 text-xs font-black uppercase text-white">
                Más popular
              </div>
              <div className="text-xs font-black uppercase tracking-widest text-white/60">
                Plan
              </div>
              <div className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Pro
              </div>
              <div className="mt-4 flex items-end gap-2">
                <div className="text-4xl font-black tracking-tight text-white">
                  {pricePro}
                </div>
                <div className="pb-1 text-sm font-semibold text-white/60">
                  {periodLabel}
                </div>
              </div>
              <p className="mt-2 text-sm text-white/65">
                Para restaurantes que quieren ahorrar tiempo y vender más.
              </p>
              <p className="mt-1 text-xs text-white/40">Incluye todo lo del Básico, más:</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-white/85">
                <li>✓ Traducciones (multi-idioma)</li>
                <li>✓ Importación de productos (CSV)</li>
                <li>✓ IA para crear/optimizar fichas</li>
                <li>✓ Personalización avanzada de la carta</li>
                <li>✓ Soporte prioritario</li>
              </ul>
              <p className="mt-4 text-xs text-white/40">
                Hasta 500 productos y 60 categorías · IA: cuota mensual incluida
              </p>
              <a
                href="#cta"
                className={cx(
                  'mt-6 inline-flex w-full justify-center rounded-md py-3 text-center text-sm font-bold transition',
                  red
                )}
              >
                Elegir Pro
              </a>
            </div>

            {/* BÁSICO */}
            <div className="anim-plan order-3 flex flex-col rounded-xl border border-white/15 bg-[#1a1a1a] p-7 lg:order-3">
              <div className="text-xs font-black uppercase tracking-widest text-white/45">
                Plan
              </div>
              <div className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Básico
              </div>
              <div className="mt-4 flex items-end gap-2">
                <div className="text-4xl font-black tracking-tight text-white">
                  {priceBasic}
                </div>
                <div className="pb-1 text-sm font-semibold text-white/55">
                  {periodLabel}
                </div>
              </div>
              <p className="mt-2 text-sm text-white/55">
                Ideal para empezar con tu carta digital.
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-white/70">
                <li>✓ Carta pública responsive (móvil y QR)</li>
                <li>✓ Gestión de productos y categorías</li>
                <li>✓ Ofertas y destacados</li>
                <li>✓ Apariencia básica (logo/colores)</li>
                <li>✓ Soporte por email</li>
              </ul>
              <p className="mt-4 text-xs text-white/40">
                Hasta 100 productos y 20 categorías · Sin IA, traducciones ni importaciones avanzadas
              </p>
              <a
                href="#cta"
                className="mt-6 inline-flex w-full justify-center rounded-md border-2 border-[#FF7A00] bg-transparent py-3 text-center text-sm font-bold text-[#FF7A00] transition hover:bg-[#FF7A00] hover:text-white"
              >
                Empezar con Básico
              </a>
            </div>
          </div>

          {/* Franquicias */}
          <div className="mt-10 rounded-xl border border-[#FFC107]/40 bg-[#FFC107]/5 p-6 text-center sm:p-8">
            <h3 className="text-3xl font-black text-[#FFC107] sm:text-4xl">
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
        ref={ctaRef}
        id="cta"
        className="scroll-mt-24 border-t border-[#C52439]/40 bg-gradient-to-b from-[#1a0a0c] to-[#0F0F0F] px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="anim-cta-h2 text-3xl font-black leading-tight sm:text-4xl">
            Deja de regalar margen a la indecisión
          </h2>
          <p className="anim-cta-p mt-4 text-lg text-white/75">
            Cada día sin <BrandName regClassName="text-white/55" /> es dinero que no vuelve.{' '}
            <span className="text-[#FFC107]">Plazas limitadas</span> este mes.
          </p>
          <div className="anim-cta-btns mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:hola@neurocarta.ai?subject=Demo%20NeuroCarta.ai%C2%AE"
              className={cx(
                'anim-cta-btn anim-cta-primary inline-flex min-w-[220px] items-center justify-center rounded-md px-8 py-4 text-lg font-black transition',
                red
              )}
            >
              Empieza ahora
            </a>
            <a
              href="mailto:hola@neurocarta.ai?subject=Quiero%20vender%20más"
              className={cx(
                'anim-cta-btn inline-flex min-w-[220px] items-center justify-center rounded-md px-8 py-4 text-lg font-black transition',
                orange
              )}
            >
              Quiero vender más
            </a>
          </div>
          <Micro>
            Sin compromiso · Te respondemos en menos de 24h · Si no vendes más,
            no seguimos hablando
          </Micro>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center sm:px-6">
        <div className="text-4xl font-bold tracking-tight sm:text-5xl">
          <BrandName regSizeClass="text-base sm:text-lg" />
        </div>
        <p className="mx-auto mt-3 max-w-4xl text-balance text-xl font-bold tracking-tight leading-snug text-white/80 sm:mt-4 sm:text-2xl sm:leading-snug">
          Carta que vende · No es información, es conversión
        </p>
      </footer>
    </div>
  )
}
