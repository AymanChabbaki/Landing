import { useState, useEffect } from 'react'
import useReveal from '../hooks/useReveal'

const steps = [
  {
    num: '01',
    title: 'Audit Documentaire',
    desc: "Analyse complète de votre dossier d'importation et identification précise des risques de non-conformité avant tout départ.",
    detail: 'Facture commerciale, packing list, certificats d\'origine, licences d\'importation chaque document est passé au crible.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    color: '#0159A3',
    light: '#EFF6FF',
  },
  {
    num: '02',
    title: 'Pré-Validation PortNet',
    desc: "Vérification et correction de chaque document avant l'expédition. Votre dossier est soumis et validé dans le système PortNet.",
    detail: 'Déclaration anticipée, validation TIR & PortNet B2B, correction des codes nomenclature douanière zéro surprise à l\'arrivée.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    color: '#FFC90D',
    light: '#FFFBEB',
  },
  {
    num: '03',
    title: 'Dédouanement Immédiat',
    desc: 'Passage en douane sans blocage. Votre marchandise est libérée rapidement, livrée dans les délais, marge intacte.',
    detail: 'Mainlevée immédiate, coordination transitaire, suivi en temps réel jusqu\'à la livraison finale au Maroc.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    color: '#10B981',
    light: '#F0FDF4',
  },
]

export default function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const [lineWidth, setLineWidth] = useState(0)
  const r1 = useReveal()
  const r2 = useReveal(150)

  // Auto-cycle steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  // Animate progress bar
  useEffect(() => {
    setLineWidth(activeStep === 0 ? 0 : activeStep === 1 ? 50 : 100)
  }, [activeStep])

  return (
    <section id="process" className="relative bg-white pt-8 pb-16 sm:py-32 overflow-hidden">

      {/* Very subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #0159A3 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[1100px] mx-auto px-6 sm:px-12">

        {/* ─── Header ─── */}
        <div ref={r1} className="reveal-el mb-8 md:mb-20">
          <span className="text-xs font-bold tracking-[0.3em] text-[#0159A3] uppercase mb-4 block">
            Le Processus
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-heading font-black text-[clamp(2.5rem,5vw,4rem)] leading-[1.06] tracking-tight text-slate-900">
              Notre Système en <br />
              <span className="text-[#0159A3]"> 3 Étapes</span>
            </h2>
            <p className="text-base text-slate-500 max-w-[340px] sm:text-right leading-relaxed pb-1">
              Un processus éprouvé sur 5000+ dossiers pour sécuriser chaque importation.
            </p>
          </div>

        </div>

        {/* ─── Steps ─── */}
        <div ref={r2} className="reveal-el">

          {/* Progress connector */}
          <div className="relative hidden md:block mb-0">
            <div className="absolute left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] top-8 h-[2px] bg-slate-100 z-0">
              <div
                className="h-full bg-gradient-to-r from-[#0159A3] to-[#FFC90D] transition-all duration-700 ease-in-out"
                style={{ width: `${lineWidth}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative z-10">
            {steps.map((step, i) => {
              const isActive = i === activeStep
              const isPast = i < activeStep

              return (
                <div
                  key={i}
                  className="flex flex-col items-start md:items-center group cursor-pointer"
                  onMouseEnter={() => setActiveStep(i)}
                >
                  {/* Step dot + number */}
                  <div className="flex md:flex-col items-center gap-4 md:gap-3 mb-2 md:mb-6 w-full">
                    <div className={`relative w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isActive
                        ? 'shadow-[0_0_0_6px_rgba(1,89,163,0.12)]'
                        : ''
                    }`}
                      style={{
                        background: isActive ? step.color : isPast ? step.color + '22' : '#F8FAFC',
                        color: isActive ? '#fff' : step.color,
                        border: `2px solid ${isActive ? step.color : isPast ? step.color + '44' : '#E2E8F0'}`,
                      }}
                    >
                      {step.icon}

                      {/* Checkmark for past steps */}
                      {isPast && !isActive && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      )}
                    </div>

                    {/* Step label */}
                    <div className="md:text-center">
                      <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-300">Étape {step.num}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`md:text-center transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}`}>
                    <h3 className={`font-heading font-bold text-lg sm:text-xl mb-2 transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">
                      {step.desc}
                    </p>

                    {/* Detail — only visible on active */}
                    <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-xs text-slate-400 leading-relaxed italic">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {/* Active indicator dot */}
                  <div className="hidden md:flex items-center gap-1 mt-5">
                    {steps.map((_, di) => (
                      <span key={di} className={`rounded-full transition-all duration-300 ${
                        di === i && isActive
                          ? 'w-4 h-1.5 bg-[#0159A3]'
                          : 'w-1.5 h-1.5 bg-slate-200'
                      }`} />
                    ))}
                  </div>

                </div>
              )
            })}
          </div>

          {/* Mobile step indicator */}
          <div className="flex items-center justify-center gap-2 mt-10 md:hidden">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeStep ? 'w-6 h-2 bg-[#0159A3]' : 'w-2 h-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
