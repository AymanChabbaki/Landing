import useReveal from '../hooks/useReveal'

export default function Hero() {
  const r1 = useReveal()

  return (
    <section id="hero" className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-slate-950 text-white m-0 p-0">
      
      {/* ─── 100% Full Screen Video Background ─── */}
      <video
        src="/hero_vid.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Subtle Dark Vignette & Light Gradient for High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/70 z-10 pointer-events-none" />

      {/* ─── Hero Content Overlay (Exact Text Design Matching Reference Image) ─── */}
      <div ref={r1} className="reveal-el max-w-[1360px] w-full mx-auto px-8 sm:px-14 relative z-20 pt-24 pb-28 flex flex-col justify-between h-full pointer-events-none">
        
        {/* ─── Top Left Text Design (Matching 98% Stat in Reference Image) ─── */}
        <div className="text-left text-white drop-shadow-lg max-w-[320px]">
          <div className="font-heading font-black text-6xl sm:text-8xl tracking-tight text-white leading-none">
            0<span className="text-brand-gold">%</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white/90 leading-snug mt-2">
            Blocages Douaniers Évités.
            <br />
            <span className="text-white/70 font-normal">Dossier Validé Instantanément.</span>
          </p>
        </div>

        {/* ─── Bottom Right Text Design (Matching Advanced Integrations in Reference Image) ─── */}
        <div className="w-full flex justify-end">
          <div className="text-right text-white drop-shadow-lg max-w-[320px]">
            <h2 className="font-heading font-black text-2xl sm:text-4xl tracking-tight text-white mb-2 leading-tight">
              PortNet & Douane B2B
            </h2>
            <p className="text-xs sm:text-sm font-medium text-white/80 leading-relaxed">
              Pré-validation documentaire instantanée avant l'embarquement de votre marchandise.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
