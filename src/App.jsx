import { useState, useEffect, useRef } from 'react'
import SplashScreen from './components/SplashScreen'
import VipBar from './components/VipBar'
import Navbar from './components/Navbar'
import ParticleCanvas from './components/ParticleCanvas'
import Hero from './components/Hero'
import VslSection from './components/VslSection'
import Comparison from './components/Comparison'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import VipForm from './components/VipForm'
import Footer from './components/Footer'
import TradeTransitOverlay from './components/TradeTransitOverlay'

const INACTIVITY_DELAY = 25000 // 25 seconds

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [transitActive, setTransitActive] = useState(false)
  const [showFloatingCta, setShowFloatingCta] = useState(false)
  const [showInactivityBanner, setShowInactivityBanner] = useState(false)
  const inactivityTimer = useRef(null)
  const hasAutoScrolled = useRef(false)
  const isVideoPlayingRef = useRef(false)

  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const triggerTransit = () => {
    setTransitActive(true)
    scrollToForm()
  }

  // Show floating CTA after scrolling past Hero
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Inactivity auto-scroll to form
  useEffect(() => {
    if (!splashDone) return

    const resetTimer = () => {
      setShowInactivityBanner(false)
      clearTimeout(inactivityTimer.current)
      if (hasAutoScrolled.current) return
      if (isVideoPlayingRef.current) return // Prevent auto-scroll if watching video
      
      inactivityTimer.current = setTimeout(() => {
        if (hasAutoScrolled.current) return
        hasAutoScrolled.current = true
        setShowInactivityBanner(true)
        setTimeout(() => {
          scrollToForm()
          setShowInactivityBanner(false)
        }, 3000)
      }, INACTIVITY_DELAY)
    }

    const events = ['mousemove', 'scroll', 'click', 'keydown', 'touchstart']
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }))
    resetTimer()

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer))
      clearTimeout(inactivityTimer.current)
    }
  }, [splashDone])

  return (
    <>
      <SplashScreen onComplete={() => setSplashDone(true)} />

      {/* Full-screen Plane & Boat Transit Overlay */}
      <TradeTransitOverlay
        active={transitActive}
        onComplete={() => setTransitActive(false)}
      />

      {/* Sticky Header Wrapper holding VipBar & Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[1000] w-full pointer-events-none">
        <div className="pointer-events-auto">
          <VipBar />
        </div>
        <Navbar onCtaClick={triggerTransit} />
      </div>

      <ParticleCanvas />

      {/* ─── Inactivity Banner ─── */}
      <div
        className={`fixed bottom-32 left-1/2 -translate-x-1/2 z-[900] transition-all duration-500 ${
          showInactivityBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 text-white text-sm font-semibold shadow-2xl">
          <span className="text-lg">👋</span>
          <span>On vous redirige vers le formulaire VIP…</span>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>

      {/* ─── Floating CTA Pill (Hidden on Mobile) ─── */}
      <div
        className={`hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-[900] transition-all duration-500 ${
          showFloatingCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToForm}
          className="group flex items-center gap-3 px-6 py-3.5 rounded-full font-heading font-extrabold text-sm text-slate-950 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFC90D, #ffe066)',
            boxShadow: '0 8px 32px rgba(255,201,13,0.55), 0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {/* Shimmer */}
          <span className="absolute inset-0 animate-shimmer pointer-events-none" style={{
            background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 55%, transparent 75%)',
            backgroundSize: '250% 100%',
          }} />
          {/* Pulse dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-50" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-900" />
          </span>
          <span className="relative z-10 uppercase tracking-wide">
            Sécuriser Mon Importation
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      <main className={`relative transition-opacity duration-700 pb-20 md:pb-0 ${splashDone ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: 1 }}>
        <Hero />

        {/* Middle sections */}
        <div className="relative">
          <div className="sticky top-0 h-0 overflow-visible" style={{ zIndex: 200 }} />
          <VslSection 
            onCtaClick={triggerTransit} 
            onVideoPlayChange={(playing) => {
              isVideoPlayingRef.current = playing
              // Re-trigger the inactivity logic when video stops/starts
              window.dispatchEvent(new Event('mousemove'))
            }}
          />
          <Comparison />
          <Process />
          <Testimonials />
          <VipForm />
        </div>

        <Footer />
      </main>
    </>
  )
}
