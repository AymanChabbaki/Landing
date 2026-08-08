import { useState, useRef } from 'react'
import useReveal from '../hooks/useReveal'

export default function VslSection({ onCtaClick, onVideoPlayChange }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFlying, setIsFlying] = useState(false)
  const videoRef = useRef(null)

  const r1 = useReveal()
  const r2 = useReveal(100)
  const r3 = useReveal(200)

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.muted = false
        videoRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(err => console.log('VSL play error:', err))
      }
    }
  }

  const handleCtaClick = (e) => {
    e.preventDefault()
    setIsFlying(true)
    setTimeout(() => setIsFlying(false), 900)
    if (onCtaClick) {
      onCtaClick()
    } else {
      const targetId = window.innerWidth < 768 ? 'vip-form-content' : 'form-section'
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="vsl-section" className="relative bg-white overflow-hidden">

      {/* ─── MAIN SPLIT LAYOUT ─── */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-12 pt-16 pb-16 sm:pt-28 sm:pb-24">        {/* ─── MOBILE ONLY TITLE (Appears above video) ─── */}
        <div className="flex lg:hidden flex-col gap-3 mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h2 className="font-heading font-bold text-[clamp(1.85rem,7vw,2.75rem)] leading-[1.18] tracking-tight text-[#002B49] text-center">
            ضاعف أرباحك<br />
            <span className="text-[#0159A3] block">في</span>
            الاستيراد والتصدير
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.6fr] gap-12 lg:gap-16 items-center">

          {/* ─── LEFT: Text column ─── */}
          <div ref={r1} className="reveal-el flex flex-col gap-7 relative z-10 order-last lg:order-first">

            {/* DESKTOP ONLY TITLE (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col gap-7">
              <h2 className="font-heading font-bold text-[clamp(2.3rem,3.8vw,3.4rem)] leading-[1.15] tracking-tight text-[#002B49]">
                ضاعف أرباحك <span className="text-[#0159A3]">في</span><br />
                الاستيراد والتصدير
              </h2>
              <span className="text-sm font-bold tracking-widest text-orange-500 uppercase">
                لماذا يجب عليك مشاهدة هذا الفيديو؟
              </span>
            </div>

            {/* MOBILE ONLY EYEBROW (Appears below video) */}
            <span className="lg:hidden text-sm font-bold tracking-widest text-orange-500 uppercase">
              لماذا يجب عليك مشاهدة هذا الفيديو؟
            </span>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold max-w-[520px]">
              تجنب <strong className="text-slate-900">معظم أخطاء عمليات الاستيراد الخاصة بك</strong> قبل الشحن من المصدر.
            </p>

            {/* Body */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-[500px]">
              لا تدع المفاجآت تؤثر على أرباحك. شاهد هذا الفيديو القصير لاكتشاف كيف يقضي <strong className="text-slate-800">نظام التحقق المسبق ultex</strong> نهائياً على احتجاز البضائع في الموانئ ورسوم الغرامات والتخزين.
            </p>

            {/* Proof bullets */}
            <ul className="flex flex-col gap-3 mt-1">
              {[
                { icon: 'shield', text: '0% غرامات أو احتجاز بالموانئ في أكثر من 500 شحنة' },
                { icon: 'clock', text: 'تدقيق مسبق وشامل للمستندات في أقل من 24 ساعة' },
                { icon: 'check', text: 'مطابق تماماً للقوانين وأنظمة بورتنيت والجمارك المغربية' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#0159A3]/10 flex items-center justify-center shrink-0">
                    {icon === 'shield' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#0159A3" strokeWidth="2.5" className="w-3 h-3">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                    {icon === 'clock' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#0159A3" strokeWidth="2.5" className="w-3 h-3">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                    {icon === 'check' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#0159A3" strokeWidth="2.5" className="w-3 h-3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-slate-700 leading-snug font-medium">{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#form-section"
                onClick={handleCtaClick}
                className="group relative inline-flex items-center gap-2 sm:gap-4 px-5 py-3 sm:px-8 sm:py-4 rounded-full font-heading font-bold text-xs sm:text-base text-slate-950 transition-all duration-300 hover:scale-[1.03] active:scale-95 overflow-hidden border-2 border-[#FFC90D]"
                style={{
                  background: 'linear-gradient(135deg, #FFC90D 0%, #ffe680 50%, #FFC90D 100%)',
                  boxShadow: '0 12px 35px rgba(255,201,13,0.40)',
                }}
              >
                <span className="absolute inset-0 animate-shimmer" style={{
                  background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.45) 55%, transparent 75%)',
                  backgroundSize: '250% 100%',
                }} />
                <span className="relative z-10 tracking-wide text-center leading-tight max-w-[240px] sm:max-w-none">
                  أريد تأمين عملية الاستيراد القادمة الآن
                </span>
                <span className={`relative z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#0159A3] ${isFlying ? 'animate-plane-fly' : ''}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 5 5 12 12 19" />
                  </svg>
                </span>
              </a>
            </div>

          </div>

          {/* ─── RIGHT: Video column — raw, no card wrapper ─── */}
          <div ref={r2} className="reveal-el flex flex-col gap-5 order-first lg:order-last">

            {/* Duration tag above video */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                </span>
                <span className="text-xs font-bold tracking-widest text-slate-800 uppercase font-mono">عرض فيديو شريح</span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">01:55 دقيقة</span>
            </div>

            {/* ─── Video, framed with a neon blue border only ─── */}
            <div className="relative -mx-3 sm:mx-0 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border-2 border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.55),0_0_50px_rgba(0,217,255,0.3)] group z-10">
              {/* Play Button Visual Overlay (Visible & Clickable ONLY when paused) */}
              <div
                onClick={handlePlayClick}
                className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isPlaying ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100 bg-black/30 backdrop-blur-[2px] pointer-events-auto'
                }`}
              >
                <div className="w-20 h-20 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#0159A3] mr-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <video
                ref={videoRef}
                src="/vsln.mp4"
                className="w-full aspect-video object-cover block"
                loop
                playsInline
                controls
                onEnded={() => { setIsPlaying(false); onVideoPlayChange?.(false); }}
                onPause={() => { setIsPlaying(false); onVideoPlayChange?.(false); }}
                onPlay={() => { setIsPlaying(true); onVideoPlayChange?.(true); }}
              />
            </div>
            {/* Bottom trust row */}
            <div ref={r3} className="reveal-el flex items-center justify-end pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>100% مطابق للشروط والجودة</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  )
}
