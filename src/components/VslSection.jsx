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
        videoRef.current.play()
        setIsPlaying(true)
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

      {/* ─── Animated Floating Background ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        {/* Floating elements spread across the background */}
        <img src="/avionicon.png" alt="" className="absolute top-[10%] left-[8%] w-16 sm:w-20 opacity-20 animate-drift" style={{ animationDelay: '0s' }} />
        <img src="/boaticon.png" alt="" className="absolute top-[65%] left-[4%] w-20 sm:w-28 opacity-15 animate-float-slow" style={{ animationDelay: '1s' }} />
        <img src="/avionicon.png" alt="" className="absolute top-[20%] right-[6%] w-12 sm:w-16 opacity-25 animate-float" style={{ animationDelay: '2s' }} />
        <img src="/boaticon.png" alt="" className="absolute bottom-[10%] right-[10%] w-24 sm:w-32 opacity-15 animate-drift" style={{ animationDelay: '0.5s' }} />
        <img src="/avionicon.png" alt="" className="absolute top-[5%] left-[45%] w-20 sm:w-24 opacity-10 animate-float-slow" style={{ animationDelay: '3s' }} />
        <img src="/boaticon.png" alt="" className="absolute bottom-[15%] left-[35%] w-16 sm:w-20 opacity-25 animate-float" style={{ animationDelay: '1.5s' }} />
        <img src="/avionicon.png" alt="" className="absolute top-[80%] left-[60%] w-14 sm:w-16 opacity-20 animate-float-slow" style={{ animationDelay: '2.5s' }} />
        <img src="/boaticon.png" alt="" className="absolute top-[45%] left-[55%] w-16 sm:w-20 opacity-15 animate-drift" style={{ animationDelay: '4s' }} />
        <img src="/avionicon.png" alt="" className="absolute top-[35%] left-[20%] w-12 sm:w-14 opacity-20 animate-float" style={{ animationDelay: '0.8s' }} />
        <img src="/boaticon.png" alt="" className="absolute top-[75%] right-[30%] w-16 sm:w-20 opacity-15 animate-float-slow" style={{ animationDelay: '3.5s' }} />
      </div>

      {/* ─── MAIN SPLIT LAYOUT ─── */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 sm:px-12 pt-16 pb-16 sm:pt-28 sm:pb-24">
        
        {/* ─── MOBILE ONLY TITLE (Appears above video) ─── */}
        <div className="flex lg:hidden flex-col gap-3 mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h2 className="font-heading font-black text-[clamp(2.6rem,4.5vw,4rem)] leading-[1.06] tracking-tight text-slate-900">
            Le Secret des Importateurs{' '}
            <span className="text-[#0159A3]">Rentables</span>
          </h2>
          <span className="text-sm font-bold tracking-[0.2em] text-orange-500 uppercase">
            Pourquoi regarder cette vidéo ?
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center">

          {/* ─── LEFT: Text column ─── */}
          <div ref={r1} className="reveal-el flex flex-col gap-7 relative z-10 order-last lg:order-first">

            {/* DESKTOP ONLY TITLE (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col gap-7">
              <h2 className="font-heading font-black text-[clamp(2.6rem,4.5vw,4rem)] leading-[1.06] tracking-tight text-slate-900">
                Le Secret des Importateurs{' '}
                <span className="text-[#0159A3]">Rentables</span>
              </h2>
              <span className="text-sm font-bold tracking-[0.2em] text-orange-500 uppercase">
                Pourquoi regarder cette vidéo ?
              </span>
            </div>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-[520px]">
              Sécurisez <strong className="text-slate-900">100% de votre dédouanement</strong> avant même l'embarquement de votre marchandise.
            </p>

            {/* Divider */}


            {/* Body */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-[500px]">
              Ne laissez plus l'administration et les imprévus dicter vos marges. Regardez cette courte vidéo pour découvrir comment le <strong className="text-slate-800">Système d'Anticipation Ultex</strong> élimine définitivement les blocages en douane et les frais de magasinage.
            </p>

            {/* Proof bullets */}
            <ul className="flex flex-col gap-3 mt-1">
              {[
                { icon: 'shield', text: '0% de blocages au port sur 500+ dossiers traités' },
                { icon: 'clock', text: 'Validation documentaire en moins de 24h' },
                { icon: 'check', text: 'Conforme aux exigences PortNet & Douane B2B Maroc' },
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
                  JE VEUX SÉCURISER MA PROCHAINE IMPORTATION
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

            {/* ─── Premium Import/Export Video Card ─── */}
            <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#0159A3] to-[#003865] p-3 sm:p-5 border-[3px] border-[#FFC90D] shadow-[0_20px_60px_rgba(255,201,13,0.15)] transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(255,201,13,0.25)]">
              
              {/* Subtle background textures for import/export feel */}
              <img src="/boat.png" alt="" className="absolute -bottom-10 -right-10 w-72 h-auto opacity-10 pointer-events-none mix-blend-overlay" aria-hidden="true" />
              <img src="/avion.png" alt="" className="absolute top-10 -left-10 w-56 h-auto opacity-10 pointer-events-none mix-blend-overlay" aria-hidden="true" />

              {/* Card Header with Logo */}
              <div className="relative z-10 flex items-center justify-between px-2 pb-4 pt-1">
                <img src="/logo.svg" alt="Ultex PortNet" className="h-5 sm:h-6 brightness-0 invert opacity-90" />
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFC90D] animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white/90 uppercase">Système Sécurisé</span>
                </div>
              </div>

              {/* Video Inner Wrapper */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 shadow-inner ring-1 ring-white/20 group z-10">
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
                  src="/WhatsApp Video 2026-07-28 at 18.58.42.mp4"
                  className="w-full aspect-video object-cover block"
                  muted
                  loop
                  playsInline
                  controls
                  onEnded={() => { setIsPlaying(false); onVideoPlayChange?.(false); }}
                  onPause={() => { setIsPlaying(false); onVideoPlayChange?.(false); }}
                  onPlay={() => { setIsPlaying(true); onVideoPlayChange?.(true); }}
                />
              </div>
            </div>

            {/* Bottom trust row — no box, just inline text */}
            <div ref={r3} className="reveal-el flex items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2.5 text-xs text-slate-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#0159A3] shrink-0">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Certifié PortNet & Douane B2B Maroc</span>
              </div>
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
