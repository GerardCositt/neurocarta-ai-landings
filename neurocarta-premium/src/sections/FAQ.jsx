import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const FAQS = [
  {
    q: '¿Sirve para cualquier tipo de restaurante?',
    a: 'Sí. NeuroCarta.ai® funciona para restaurantes de cualquier tamaño y tipo: desde un bar de barrio hasta una cadena de franquicias. Solo necesitas tener una carta de platos y querer vender mejor.',
  },
  {
    q: '¿Es difícil de configurar y usar?',
    a: 'El setup inicial tarda menos de 5 minutos. Subes tu carta, la IA la procesa y puedes empezar a operar. No necesitas conocimientos técnicos ni formación especializada. El panel es tan intuitivo como un gestor de redes sociales.',
  },
  {
    q: '¿Puedo cambiar los platos y precios cuando quiera?',
    a: 'En tiempo real desde cualquier dispositivo. Cambias el precio del chuletón un domingo a las 2 PM y en dos segundos está actualizado en la carta de todos tus clientes. Sin reimprimir nada, sin llamar a nadie.',
  },
  {
    q: '¿Funciona para varios locales?',
    a: 'Perfectamente. El plan Pro permite hasta 3 locales, el Premium hasta 5, y para grupos y franquicias más grandes tenemos un plan Enterprise personalizado con gestión centralizada, coherencia de marca y analítica por establecimiento.',
  },
  {
    q: '¿Qué lo diferencia de una carta QR normal?',
    a: 'Una carta QR es un menú digital estático. NeuroCarta.ai® es una herramienta de ventas activa. Destaca automáticamente los platos más rentables, sugiere upselling en el momento correcto, rota stock para reducir mermas y te da datos de qué platos interesan y cuáles no. La diferencia en resultados es comparable a tener un comercial trabajando en tu carta 24/7.',
  },
  {
    q: '¿Cómo ayuda a vender más exactamente?',
    a: 'Aplicando principios de neuromarketing en la presentación: jerarquía visual, badges de urgencia y recomendación, copy persuasivo por plato, posicionamiento estratégico de los más rentables y sugerencias de complementos. Todo esto guía la decisión del cliente hacia donde te interesa, sin presión y de forma natural.',
  },
  {
    q: '¿En cuánto tiempo se notan los resultados?',
    a: 'La mayoría de restaurantes ven un cambio en el ticket medio y en la rotación de platos estratégicos en las primeras 2–4 semanas. La reducción de mermas suele verse ya en el primer mes gracias a los impulsos diarios de stock.',
  },
  {
    q: '¿Necesito integrarlo con mi TPV o sistema de gestión?',
    a: 'No es obligatorio. NeuroCarta.ai® funciona de forma independiente como capa de carta digital. Si tienes un TPV y quieres integrarlo para obtener datos de ventas en tiempo real, ofrecemos conectores según tu sistema. Consúltanos.',
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)

  const toggle = () => {
    const el = contentRef.current
    if (!el) return

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!open) {
      // Open: measure height, animate from 0 to auto
      el.style.height = '0px'
      el.style.overflow = 'hidden'
      el.style.display = 'block'
      const h = el.scrollHeight
      if (prefersReduced) {
        el.style.height = `${h}px`
      } else {
        gsap.to(el, { height: h, duration: 0.35, ease: 'power2.out', onComplete: () => { el.style.height = 'auto' } })
      }
    } else {
      // Close
      const h = el.offsetHeight
      if (prefersReduced) {
        el.style.height = '0px'
      } else {
        gsap.fromTo(el, { height: h }, { height: 0, duration: 0.28, ease: 'power2.in' })
      }
    }

    setOpen((v) => !v)
  }

  return (
    <div className="border-b border-nc-border last:border-0">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-nc-text hover:text-nc-gold transition-colors"
        aria-expanded={open}
      >
        <span>{item.q}</span>
        <span
          className="flex-shrink-0 text-nc-muted transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ height: 0, overflow: 'hidden', display: open ? 'block' : 'none' }}
      >
        <p className="pb-5 text-sm text-nc-muted leading-relaxed">{item.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.faq-header', {
        opacity: 0, y: 28, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.faq-header', start: 'top 85%' },
      })
      gsap.from('.faq-list', {
        opacity: 0, y: 24, duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="faq" ref={sectionRef} className="section-pad border-t border-nc-border scroll-mt-24">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <div className="faq-header text-center mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-nc-gold">
              FAQ
            </p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-nc-muted">
              Si no encuentras lo que buscas, escríbenos a{' '}
              <a href="mailto:hola@neurocarta.ai" className="text-nc-gold hover:underline">
                hola@neurocarta.ai
              </a>
            </p>
          </div>

          {/* FAQ list */}
          <div className="faq-list rounded-2xl border border-nc-border bg-nc-surface px-6">
            {FAQS.map((item) => (
              <FAQItem key={item.q} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
