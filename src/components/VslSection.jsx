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
      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-12 pt-16 pb-16 sm:pt-28 sm:pb-24">
        
        {/* ─── MOBILE ONLY TITLE (Appears above video) ─── */}
        <div className="flex lg:hidden flex-col gap-3 mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h2 className="font-heading font-black text-[clamp(1.85rem,7vw,2.75rem)] leading-[1.12] tracking-tight text-[#002B49] text-center">
            Rentabiliser vos opérations <br />
            <span className="text-[#0159A3] whitespace-nowrap inline-block text-[0.88em]">d'import-export</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.6fr] gap-12 lg:gap-16 items-center">

          {/* ─── LEFT: Text column ─── */}
          <div ref={r1} className="reveal-el flex flex-col gap-7 relative z-10 order-last lg:order-first">

            {/* DESKTOP ONLY TITLE (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col gap-7">
              <h2 className="font-heading font-black text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.08] tracking-tight text-[#002B49]">
                Rentabiliser vos opérations <br />
                <span className="text-[#0159A3] whitespace-nowrap inline-block text-[0.88em]">d'import-export</span>
              </h2>
              <span className="text-sm font-bold tracking-[0.2em] text-orange-500 uppercase">
                Pourquoi regarder cette vidéo ?
              </span>
            </div>

            {/* MOBILE ONLY EYEBROW (Appears below video) */}
            <span className="lg:hidden text-sm font-bold tracking-[0.2em] text-orange-500 uppercase">
              Pourquoi regarder cette vidéo ?
            </span>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-[520px]">
              Sécurisez <strong className="text-slate-900">100% de vos import-export</strong> avant même l'embarquement de votre marchandise.
            </p>

            {/* Divider */}


            {/* Body */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-[500px]">
              Ne laissez plus les imprévus dicter vos marges. Regardez cette courte vidéo pour découvrir comment le <strong className="text-slate-800">Système d'Anticipation Ultex</strong> élimine définitivement les blocages en port et les frais de magasinage.
            </p>

            {/* Proof bullets */}
            <ul className="flex flex-col gap-3 mt-1">
              {[
                { icon: 'shield', text: '0% de blocages au port sur 500+ dossiers traités' },
                { icon: 'clock', text: 'Validation documentaire en moins de 24h' },
                { icon: 'check', text: 'Conforme aux normes PortNet et Douane' },
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
                  <span className="text-sm text-slate-600 leading-snug">{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#form-section"
                onClick={handleCtaClick}
                className="group relative inline-flex items-center gap-2 sm:gap-4 px-5 py-3 sm:px-8 sm:py-4 rounded-full font-heading font-black text-[11px] sm:text-base text-slate-950 transition-all duration-300 hover:scale-[1.03] active:scale-95 overflow-hidden border-2 border-[#FFC90D]"
                style={{
                  background: 'linear-gradient(135deg, #FFC90D 0%, #ffe680 50%, #FFC90D 100%)',
                  boxShadow: '0 12px 35px rgba(255,201,13,0.40)',
                }}
              >
                <span className="absolute inset-0 animate-shimmer" style={{
                  background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.45) 55%, transparent 75%)',
                  backgroundSize: '250% 100%',
                }} />
                <span className="relative z-10 uppercase tracking-wide text-center leading-tight max-w-[220px] sm:max-w-none">
                  JE VEUX SÉCURISER MA PROCHAINE OPERATION
                </span>
                <span className={`relative z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#0159A3] ${isFlying ? 'animate-plane-fly' : ''}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
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
                <span className="text-xs font-bold tracking-widest text-slate-800 uppercase font-mono">Présentation Vidéo</span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">01:55 MIN</span>
            </div>

            {/* ─── Video, framed with a neon blue border only ─── */}
            <div className="relative -mx-6 sm:mx-0 rounded-none sm:rounded-2xl overflow-hidden bg-slate-950 border-2 border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.55),0_0_50px_rgba(0,217,255,0.3)] group z-10">
              {/* Play Button Visual Overlay (Visible & Clickable ONLY when paused) */}
              <div
                onClick={handlePlayClick}
                className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isPlaying ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100 bg-black/30 backdrop-blur-[2px] pointer-events-auto'
                }`}
              >
                <div className="w-20 h-20 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#0159A3] ml-1">
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
                <span>100% Conforme</span>
              </div>
            </div>


          </div>

        </div>
      </div>

    </section>
  )
}
