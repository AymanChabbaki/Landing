import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const testimonials = [
  {
    name: 'Ahmed B.',
    role: 'Importateur Textile',
    city: 'Casablanca',
    initials: 'AB',
    color: '#0159A3',
    // video: '/testimonial-ahmed.mp4'  ← add video file here later
  },
  {
    name: 'Karim M.',
    role: 'E-Commerçant',
    city: 'Rabat',
    initials: 'KM',
    color: '#7C3AED',
    // video: '/testimonial-karim.mp4'  ← add video file here later
  },
  {
    name: 'Sofia L.',
    role: 'Sourcing Manager',
    city: 'Tanger',
    initials: 'SL',
    color: '#059669',
    // video: '/testimonial-sofia.mp4'  ← add video file here later
  },
]

export default function Testimonials() {
  const [modalVideo, setModalVideo] = useState(null)
  const r1 = useReveal()
  const r2 = useReveal(100)
  const r3 = useReveal(200)
  const r4 = useReveal(300)
  const refs = [r2, r3, r4]

  return (
    <>
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
              <h2 className="font-heading font-black text-[clamp(2.5rem,5vw,4rem)] leading-[1.06] tracking-tight text-slate-900">
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

          {/* ─── 3 Reel-sized video placeholders ─── */}
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 gap-5 sm:gap-6 pb-6 sm:pb-0 snap-x snap-mandatory [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t, i) => (
              <div
                key={i}
                ref={refs[i]}
                className="reveal-el group flex flex-col gap-4 w-[260px] sm:w-auto shrink-0 snap-center first:ml-4 sm:first:ml-0 last:mr-4 sm:last:mr-0"
              >
                {/* Reel container: 9:16 portrait aspect ratio */}
                <div
                  className="relative w-full overflow-hidden rounded-2xl bg-slate-100 cursor-pointer"
                  style={{ aspectRatio: '9 / 16' }}
                  onClick={() => t.video && setModalVideo(t.video)}
                >
                  {t.video ? (
                    <video
                      src={t.video}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                      loop
                    />
                  ) : (
                    /* Placeholder while video not yet added */
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                      style={{ background: `linear-gradient(160deg, ${t.color}18 0%, ${t.color}08 100%)` }}>
                      {/* Avatar initials */}
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-sm"
                        style={{ background: t.color }}
                      >
                        {t.initials}
                      </div>
                      {/* Play icon ring */}
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
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
                  
                  {/* Overlay content: Stars + Name */}
                  <div className="absolute bottom-4 left-4 text-white z-20">
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

                  {/* Play button overlay (for when video is added) */}
                  {t.video && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 z-30 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-slate-900 ml-1">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Full-screen Modal Video Player */}
      {modalVideo && (
        <div
          className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={() => setModalVideo(null)}
        >
          <div
            className="relative w-[90%] max-w-[400px]"
            style={{ aspectRatio: '9 / 16' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all hover:rotate-90"
              onClick={() => setModalVideo(null)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <video
              src={modalVideo}
              className="w-full h-full rounded-2xl object-cover"
              autoPlay
              controls
              playsInline
            />
          </div>
        </div>
      )}
    </>
  )
}
