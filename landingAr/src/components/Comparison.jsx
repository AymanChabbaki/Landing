import { useEffect, useRef, useState } from 'react'
import useReveal from '../hooks/useReveal'

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const start = performance.now()
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          setCount(Math.round((1 - Math.pow(1 - progress, 3)) * target))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref} className="tabular-nums">{count}</span>
}

const dangerItems = [
  'احتجاز البضائع بالموانئ لأسابيع طويلة',
  'غرامات مالية ورسوم أرضيات غير متوقعة',
  'تأخير مكلف يضر بجدول التسليم',
  'تآكل هامش الأرباح وفقدان ثقة العملاء',
  'قلق وضغط مستمر في كل عملية استيراد',
]

const successItems = [
  'إجراءات دخول سلسة وسريعة للبضائع',
  'مطابقة مستندية مسبقة ومضمونة 100%',
  'وصول وتسليم البضائع في الوقت المحدد',
  'حماية 100% لهامش أرباحك الصافية',
  'أمان وثقة كاملة في جميع شحناتك',
]

export default function Comparison() {
  const r1 = useReveal()
  const r2 = useReveal(150)
  const r3 = useReveal(250)

  return (
    <section id="comparison" className="relative bg-slate-50 pt-16 pb-8 sm:py-32 overflow-hidden">

      {/* Subtle background dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(circle, #0159A3 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[1100px] mx-auto px-6 sm:px-12">

        {/* ─── Top: Eyebrow + Giant Stat ─── */}
        <div ref={r1} className="reveal-el mb-8 sm:mb-14">
          <span className="text-xs font-bold tracking-widest text-[#0159A3] uppercase mb-5 block">
            الواقع بالأرقام
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8">
            {/* Big number */}
            <div className="font-heading font-bold leading-none tracking-tighter text-[#002B49]"
              style={{ fontSize: 'clamp(6rem, 16vw, 12rem)' }}>
              <AnimatedCounter target={80} />
              <span className="text-emerald-500">%</span>
            </div>
            {/* Subtitle right of number */}
            <div className="sm:pb-5 max-w-[380px]">
              <p className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                من نجاح المستوردين والتجار بالمغرب
              </p>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                يعتمد على الإعداد المستندي المبكر والتحكم الدقيق في المعايير الجمركية.
              </p>
            </div>
          </div>

        </div>

        {/* ─── Comparison: two columns ─── */}
        <div ref={r2} className="reveal-el grid grid-cols-1 lg:grid-cols-[1fr_64px_1fr] items-start gap-0">

          {/* RIGHT (First in RTL): مع نظام أولتكس */}
          <div className="mb-6 sm:mb-12 lg:mb-0">
            <div className="flex items-center gap-3 mb-3 pb-2 sm:mb-8 sm:pb-4 border-b border-slate-100 mt-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-emerald-500 shrink-0">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h3 className="font-heading font-bold text-lg text-slate-800">مع نظام أولتكس بورتنيت</h3>
            </div>
            <ul className="flex flex-col gap-0">
              {successItems.map((item, i) => (
                <li key={i}
                  className="flex items-center gap-4 py-2 sm:py-4 text-slate-700 text-sm sm:text-base leading-snug border-b border-slate-100 last:border-0 group hover:text-slate-900 transition-colors duration-150 font-medium"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-500 shrink-0 group-hover:text-emerald-600 transition-colors">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* CENTER: VS divider */}
          <div className="hidden lg:flex flex-col items-center justify-start pt-2 gap-0 h-full">
            <div className="flex-1 w-px bg-slate-200" style={{ minHeight: '40px' }} />
            <span className="my-4 text-xs font-bold tracking-widest text-slate-400 uppercase rotate-0">مقابل</span>
            <div className="flex-1 w-px bg-slate-200" style={{ minHeight: '40px' }} />
          </div>
          {/* LEFT: بدون تحقق مسبق */}
          <div>
            <div className="flex items-center gap-3 mb-3 pb-2 sm:mb-8 sm:pb-4 border-b border-slate-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-rose-400 shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <h3 className="font-heading font-bold text-base sm:text-lg text-slate-800 whitespace-nowrap">الطريقة التقليدية (بدون تدقيق مسبق)</h3>
            </div>
            <ul className="flex flex-col gap-0">
              {dangerItems.map((item, i) => (
                <li key={i}
                  className="flex items-center gap-4 py-2 sm:py-3 text-slate-600 text-sm sm:text-base leading-snug border-b border-slate-100 last:border-0 group hover:text-slate-900 transition-colors duration-150 font-medium"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-rose-400 shrink-0 group-hover:text-rose-500 transition-colors">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ─── Bottom accent ─── */}
        <div ref={r3} className="reveal-el mt-6 pt-4 sm:mt-16 sm:pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            النتائج المحققة لعملائنا من الشركات والمستوردين والتجار بالمملكة المغربية.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-slate-600 uppercase">أكثر من 500 ملف مكتمل</span>
          </div>
        </div>

      </div>
    </section>
  )
}
