import { useState, useEffect } from 'react'

export default function Navbar({ onCtaClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isFlying, setIsFlying] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileOpen(false)
    if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' })
    if (id === 'form-section' && window.innerWidth < 768) {
      id = 'vip-form-content'
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCtaClick = (e) => {
    e?.preventDefault()
    setIsFlying(true)
    setTimeout(() => setIsFlying(false), 900)
    if (onCtaClick) {
      onCtaClick()
    } else {
      scrollTo('form-section')
    }
  }

  const links = [
    { label: 'Accueil', id: 'top' },
    { label: 'Processus', id: 'process' },
    { label: 'Résultats', id: 'comparison' },
    { label: 'Témoignages', id: 'testimonials' },
    { label: 'Qualification VIP', id: 'form-section' },
  ]

  return (
    <>
      {/* ─── WHEN SCROLLED: Peloton-Style 2-Row Navbar Sticky at Top below VipBar (HIDDEN ON MOBILE) ─── */}
      <nav className={`hidden md:block w-full transition-all duration-500 pointer-events-auto ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-xl border-b border-slate-200/80 opacity-100'
          : 'opacity-0 pointer-events-none'
      }`}>
        {/* Row 1: Socials (Left), Centered Logo (Center), CTA (Right) */}
        <div className="border-b border-slate-100">
          <div className="max-w-[1240px] mx-auto px-6 h-[56px] flex items-center justify-between relative">
            
            {/* Left: Social Media Icons with WhatsApp SVG */}
            <div className="hidden md:flex items-center gap-2">
              <a href="https://www.instagram.com/ult.ex" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-brand-blue hover:bg-brand-blue/10 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /></svg>
              </a>
              <a href="https://ma.linkedin.com/company/ultex" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-brand-blue hover:bg-brand-blue/10 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /></svg>
              </a>
              <a href="https://www.facebook.com/ULTex.ma" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-brand-blue hover:bg-brand-blue/10 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.tiktok.com/@ul.tex" target="_blank" rel="noreferrer" aria-label="TikTok" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-brand-blue hover:bg-brand-blue/10 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" /></svg>
              </a>
              <a href="https://youtube.com/@joinultex" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-brand-blue hover:bg-brand-blue/10 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" /></svg>
              </a>
            </div>

            {/* Center: CENTERED LOGO */}
            <a href="#" className="absolute left-1/2 -translate-x-1/2 flex items-center" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
              <img src="/logo.svg" alt="Ultex PortNet" className="h-7 sm:h-8" />
            </a>

            {/* Right: Commencer CTA Button */}
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={handleCtaClick}
                className="group relative inline-flex items-center justify-between gap-2.5 px-5 py-2 rounded-full text-xs font-extrabold text-white bg-slate-950 hover:bg-brand-blue transition-all duration-300 shadow-md active:scale-95"
              >
                <span className="font-heading tracking-wide uppercase">Commencer</span>
                <span className={`w-5 h-5 rounded-full bg-white text-slate-950 flex items-center justify-center transition-transform group-hover:bg-brand-gold ${
                  isFlying ? 'animate-plane-fly' : ''
                }`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Row 2: Centered Navigation Links */}
        <div className="hidden md:block bg-slate-50/80 border-b border-slate-100">
          <div className="max-w-[1240px] mx-auto px-6 h-[40px] flex items-center justify-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-1 rounded-full text-[13px] font-bold text-slate-600 hover:text-brand-blue hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── BEFORE SCROLL: Floating White Pill Navbar at Bottom of Video (HIDDEN ON MOBILE) ─── */}
      {!scrolled && (
        <div className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000] w-auto max-w-[95%] transition-all duration-500 animate-fade-up pointer-events-auto">
          <div className="flex items-center gap-3 sm:gap-6 px-6 sm:px-8 py-3 rounded-full bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            
            {/* Logo */}
            <a href="#" className="flex items-center shrink-0 pr-2" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
              <img src="/logo.svg" alt="Ultex PortNet" className="h-6 sm:h-7" />
            </a>

            <div className="w-px h-4 bg-slate-200 hidden sm:block shrink-0" />

            {/* Navigation Links inside the Pill Bar */}
            <div className="hidden md:flex items-center gap-1 shrink-0">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-3.5 py-1 rounded-full text-xs font-bold text-slate-700 hover:text-brand-blue hover:bg-slate-100 transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="w-px h-4 bg-slate-200 shrink-0" />

            {/* Commencer CTA Button */}
            <button
              onClick={handleCtaClick}
              className="group relative inline-flex items-center justify-between gap-2.5 px-5 py-2 rounded-full text-xs font-extrabold text-white bg-slate-950 hover:bg-brand-blue transition-all duration-300 shadow-md shrink-0 active:scale-95"
            >
              <span className="font-heading tracking-wide uppercase">Commencer</span>
              <span className={`w-5 h-5 rounded-full bg-white text-slate-950 flex items-center justify-center transition-transform group-hover:bg-brand-gold ${
                isFlying ? 'animate-plane-fly' : ''
              }`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ─── MOBILE ONLY: iOS-style Bottom Tab Bar ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[2000] bg-white/90 backdrop-blur-xl border-t border-slate-200/80 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pointer-events-auto">
        <div className="flex items-center justify-around h-16 px-2">
          
          <button onClick={() => scrollTo('top')} className="flex flex-col items-center justify-center w-[20%] gap-1 text-slate-500 hover:text-brand-blue active:scale-95 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-[10px] font-semibold leading-none">Accueil</span>
          </button>

          <button onClick={() => scrollTo('process')} className="flex flex-col items-center justify-center w-[20%] gap-1 text-slate-500 hover:text-brand-blue active:scale-95 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-[10px] font-semibold leading-none">Process</span>
          </button>

          {/* Central VIP CTA */}
          <div className="w-[20%] flex items-center justify-center relative -top-4">
            <button 
              onClick={handleCtaClick}
              className="w-14 h-14 rounded-full bg-slate-950 border-4 border-white shadow-lg flex items-center justify-center text-white active:scale-95 transition-all hover:bg-brand-blue"
              style={{ background: 'linear-gradient(135deg, #0159A3, #004472)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6 ml-0.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <button onClick={() => scrollTo('comparison')} className="flex flex-col items-center justify-center w-[20%] gap-1 text-slate-500 hover:text-brand-blue active:scale-95 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
            </svg>
            <span className="text-[10px] font-semibold leading-none">Stats</span>
          </button>

          <button onClick={() => scrollTo('testimonials')} className="flex flex-col items-center justify-center w-[20%] gap-1 text-slate-500 hover:text-brand-blue active:scale-95 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-[10px] font-semibold leading-none">Avis</span>
          </button>

        </div>
      </div>
    </>
  )
}
