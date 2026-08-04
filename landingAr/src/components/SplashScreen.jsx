import { useEffect, useState } from 'react'

export default function SplashScreen({ onComplete }) {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true)
      document.body.classList.remove('splash-active')
      setTimeout(() => onComplete?.(), 900)
    }, 3200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-all duration-900 ${
        hide ? '-translate-y-full opacity-0 pointer-events-none' : ''
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="flex flex-col items-center gap-6 relative">
        {/* Glow */}
        <div className="absolute w-[300px] h-[300px] rounded-full pointer-events-none top-1/2 left-1/2 animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(1,89,163,0.12) 0%, rgba(255,201,13,0.06) 40%, transparent 70%)' }} />

        {/* Logo */}
        <img src="/logo.svg" alt="Ultex PortNet" className="w-[200px] relative z-10 opacity-0 animate-splash-logo"
          style={{ filter: 'drop-shadow(0 0 20px rgba(1,89,163,0.15))' }} />

        {/* Tagline */}
        <div className="opacity-0 text-txt-dim text-sm font-medium tracking-widest"
          style={{ animation: 'var(--animate-fade-up)', animationDelay: '1s' }}>
          التحقق الجمركي المسبق
        </div>

        {/* Loader */}
        <div className="w-[120px] h-[3px] bg-bg-elevated rounded-full overflow-hidden opacity-0"
          style={{ animation: 'var(--animate-fade-up)', animationDelay: '1.4s' }}>
          <div className="h-full w-0 rounded-full animate-loader-fill"
            style={{ background: 'linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-gold))' }} />
        </div>
      </div>
    </div>
  )
}
