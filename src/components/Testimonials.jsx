import { useState, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const testimonials = [
  {
    name: 'Ahmed B.',
    role: 'Co Fondateur',
    city: 'Casablanca',
    initials: 'AB',
    color: '#059669',
    video: '/tem2.mp4',
  },
  {
    name: 'Rachid T.',
    role: 'Importateur Matériel',
    city: 'Casablanca',
    initials: 'RT',
    color: '#0159A3',
    video: '/WhatsApp Video 2026-08-02 at 01.09.49.mp4',
  },
  {
    name: 'Karim M.',
    role: 'Importateur Textile',
    city: 'Casablanca',
    initials: 'KM',
    color: '#0159A3',
    video: '/WhatsApp Video 2026-08-02 at 00.01.26.mp4',
  },
  {
    name: 'Youssef K.',
    role: 'E-Commerçant',
    city: 'Rabat',
    initials: 'YK',
    color: '#7C3AED',
    video: '/WhatsApp Video 2026-08-02 at 00.03.41.mp4',
  },
  {
    name: 'Omar L.',
    role: 'Importateur Multicanal',
    city: 'Tanger',
    initials: 'OL',
    color: '#6082B6',
    video: '/tem3.mov',
  },
]

export default function Testimonials() {
  const [playingMap, setPlayingMap] = useState({})
  const [unmutedMap, setUnmutedMap] = useState({})
  const videoRefs = useRef({})

  const r1 = useReveal()
  const r2 = useReveal(100)
  const r3 = useReveal(200)
  const r4 = useReveal(300)
  const r5 = useReveal(400)
  const r6 = useReveal(500)
  const refs = [r2, r3, r4, r5, r6]

  const handlePlayClick = (i) => {
    const video = videoRefs.current[i]
    if (!video) return
    if (playingMap[i]) {
      video.pause()
      setPlayingMap(prev => ({ ...prev, [i]: false }))
    } else {
      video.muted = false
      setUnmutedMap(prev => ({ ...prev, [i]: true }))
      video.play().then(() => {
        setPlayingMap(prev => ({ ...prev, [i]: true }))
      }).catch(err => console.log('Video play error:', err))
    }
  }

  const toggleSound = (i, e) => {
    e.stopPropagation()
    setUnmutedMap(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <section id="testimonials" className="relative bg-white pt-6 pb-16 sm:py-32 overflow-hidden">

      {/* Subtle dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #0159A3 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[1100px] mx-auto px-6 sm:px-12">

        {/* ─── Header ─── */}
        <div ref={r1} className="reveal-el mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-[#0159A3] uppercase mb-4 block">
            Témoignages
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-heading font-black text-[clamp(2.5rem,5vw,4rem)] leading-[1.06] tracking-tight text-[#002B49]">
              Ils Nous Font{' '}
              <span className="text-[#0159A3]">Confiance</span>
            </h2>
            <div className="flex items-center gap-3 pb-1">
              <div className="flex -space-x-2">
                {testimonials.map((t, i) => (
                  <div key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: t.color }}>
                    {t.initials}
                  </div>
                ))}
              </div>
              <span className="text-sm text-slate-500">500+ clients satisfaits</span>
            </div>
          </div>

        </div>

        {/* ─── 5 Reel-sized video cards ─── */}
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 pb-6 sm:pb-0 snap-x snap-mandatory [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={refs[i]}
              className="reveal-el group flex flex-col gap-4 w-[260px] sm:w-auto shrink-0 snap-center first:ml-4 sm:first:ml-0 last:mr-4 sm:last:mr-0"
            >
              {/* Reel container: 9:16 portrait aspect ratio */}
              <div
                className="relative w-full overflow-hidden rounded-2xl bg-slate-950"
                style={{ aspectRatio: '9 / 16' }}
              >
                {/* Audio Mute/Unmute Toggle Button */}
                {t.video && (
                  <button
                    onClick={(e) => toggleSound(i, e)}
                    className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-slate-900 transition-all duration-200"
                    title={unmutedMap[i] ? "Couper le son" : "Activer le son"}
                  >
                    {unmutedMap[i] ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-emerald-400">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Play Button Visual Overlay (Visible & Clickable ONLY when paused) */}
                <div 
                  onClick={() => handlePlayClick(i)}
                  className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    playingMap[i] ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100 bg-black/30 backdrop-blur-[2px] pointer-events-auto'
                  }`}
                >
                  <div className="w-14 h-14 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#0159A3] ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {t.video ? (
                  <video
                    ref={el => videoRefs.current[i] = el}
                    src={t.video}
                    className="w-full h-full object-cover cursor-pointer"
                    playsInline
                    muted={!unmutedMap[i]}
                    loop
                    controls={playingMap[i]}
                    onClick={() => handlePlayClick(i)}
                  />
                ) : (
                  /* Placeholder while video not yet added */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                    style={{ background: `linear-gradient(160deg, ${t.color}18 0%, ${t.color}08 100%)` }}>
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-sm"
                      style={{ background: t.color }}
                    >
                      {t.initials}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center shadow-sm">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-400 ml-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                        Vidéo bientôt
                      </span>
                    </div>
                  </div>
                )}

                {/* Dark gradient at bottom of reel for name overlay */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${playingMap[i] ? 'opacity-0' : 'opacity-100'}`} />
                
                {/* Overlay content: Stars + Name */}
                <div className={`absolute bottom-4 left-4 text-white z-10 pointer-events-none transition-opacity duration-300 ${playingMap[i] ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="flex items-center gap-0.5 mb-2 drop-shadow-md">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} viewBox="0 0 24 24" fill="#FFC90D" className="w-4 h-4">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-bold text-sm leading-tight drop-shadow-md">{t.name}</p>
                  <p className="text-xs text-white/90 drop-shadow-md">{t.role} {t.city}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
