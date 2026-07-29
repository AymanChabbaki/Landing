import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const urgencyOptions = [
  {
    value: 'search',
    label: 'Recherche de fournisseur',
    desc: 'Je cherche encore le bon fournisseur',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    value: 'production',
    label: 'En cours de production',
    desc: 'Ma marchandise est en fabrication',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2z" />
      </svg>
    ),
  },
  {
    value: 'enroute',
    label: 'Marchandise en route',
    desc: 'Mon conteneur est déjà expédié',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    ),
  },
  {
    value: 'arrived',
    label: 'Arrivée au port',
    desc: 'Ma marchandise est au port URGENT',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" />
      </svg>
    ),
    urgent: true,
  },
]

const trustPoints = [
  { text: '500+ dossiers traités avec succès' },
  { text: 'Réponse sous 24h garantie' },
  { text: 'Conformité PortNet & Douane B2B' },
]

export default function VipForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [direction, setDirection] = useState('right')
  const [formData, setFormData] = useState({
    nom: '', ice: '', whatsapp: '', email: '',
    marchandise: '', budget: '', volume: '',
    urgency: '',
  })
  const [errors, setErrors] = useState({})
  const r1 = useReveal()
  const r2 = useReveal(150)

  const update = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: false }))
  }

  const validateStep = () => {
    const errs = {}
    if (step === 1) {
      if (!formData.nom.trim()) errs.nom = true
      if (!formData.ice.trim()) errs.ice = true
      if (!formData.whatsapp.trim()) errs.whatsapp = true
      if (!formData.email.trim() || !formData.email.includes('@')) errs.email = true
    } else if (step === 2) {
      if (!formData.marchandise) errs.marchandise = true
      if (!formData.budget) errs.budget = true
      if (!formData.volume) errs.volume = true
    } else if (step === 3) {
      if (!formData.urgency) errs.urgency = true
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const nextStep = () => { if (!validateStep()) return; setDirection('right'); setStep(s => Math.min(s + 1, 3)) }
  const prevStep = () => { setDirection('left'); setStep(s => Math.max(s - 1, 1)) }
  const handleSubmit = (e) => { e.preventDefault(); if (!validateStep()) return; setSubmitted(true) }

  const progressWidth = `${(step / 3) * 100}%`

  const inputCls = (field) =>
    `w-full px-5 py-4 rounded-xl border outline-none text-base transition-all duration-200 bg-white text-slate-900 placeholder:text-slate-400 focus:shadow-[0_0_0_3px_rgba(1,89,163,0.12)] ${
      errors[field]
        ? 'border-rose-400 shadow-[0_0_0_3px_rgba(244,63,94,0.08)]'
        : 'border-slate-200 focus:border-[#0159A3]'
    }`

  const stepLabels = ['Vos coordonnées', 'Votre profil', 'Votre projet']

  return (
    <section id="form-section" className="relative bg-white py-16 sm:py-40 overflow-hidden">

      {/* Pulsing glow border around entire section */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 80px rgba(1,89,163,0.06), inset 0 0 1px rgba(1,89,163,0.15)',
        }} />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #0159A3 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

      {/* Urgency top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0159A3] via-[#FFC90D] to-[#0159A3] animate-[gradient-shift_3s_ease_infinite]" style={{ backgroundSize: '200% 100%' }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-16">

        {/* ─── Two-column: Left headline, Right Form ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20 lg:gap-28 items-start">

          {/* Left Column: Text / Trust */}
          <div ref={r1} className="reveal-el flex flex-col gap-7 lg:sticky lg:top-24">
            <span className="text-xs font-bold tracking-[0.3em] text-[#0159A3] uppercase">
              Qualification VIP
            </span>

            <h2 className="font-heading font-black text-[clamp(3rem,5vw,5rem)] leading-[1.06] tracking-tight text-slate-900">
              Formulaire de{' '}
              <span className="text-[#0159A3]">Pré-Validation</span>
            </h2>

            <p className="text-base text-slate-500 leading-relaxed max-w-[420px]">
              Accédez au service prioritaire PortNet & Douane. Notre équipe analyse votre dossier et vous contacte sous 24h.
            </p>

            {/* Live urgency counter */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-200 bg-amber-50">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                </span>
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider">PLACES LIMITÉES</span>
              </div>
              <span className="text-xs text-amber-700 font-medium">Plus que <strong className="text-amber-900 font-black">3 créneaux</strong> disponibles ce mois-ci</span>
            </div>

            {/* Live social proof */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex -space-x-1.5">
                {['AB','KM','SL','MN'].map((initials,i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-[9px] shrink-0"
                    style={{ background: ['#0159A3','#7C3AED','#059669','#D97706'][i] }}>
                    {initials}
                  </div>
                ))}
              </div>
              <span><strong className="text-slate-700">12 importateurs</strong> ont soumis leur dossier cette semaine</span>
            </div>

            {/* Trust list */}
            <ul className="flex flex-col gap-4 mt-1">
              {trustPoints.map(({ text }, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5 text-emerald-600">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            {/* WhatsApp contact */}
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-3 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <span className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" className="w-5 h-5" />
              </span>
              Contacter directement via WhatsApp
            </a>
          </div>

          {/* Right Column: Form */}
          <div ref={r2} className="reveal-el">
            {!submitted ? (
              <div>
                {/* Step label + Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Étape {step} / 3
                    </span>
                    <span className="text-xs font-bold text-[#0159A3]">
                      {stepLabels[step - 1]}
                    </span>
                  </div>
                  {/* Progress track */}
                  <div className="h-1 rounded-full overflow-hidden bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: progressWidth,
                        background: 'linear-gradient(90deg, #0159A3, #FFC90D)',
                        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                      }}
                    />
                  </div>
                  {/* Step dots */}
                  <div className="flex items-center justify-between mt-3">
                    {stepLabels.map((label, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          i + 1 <= step ? 'bg-[#0159A3]' : 'bg-slate-200'
                        }`} />
                        <span className={`text-xs font-medium transition-colors ${
                          i + 1 === step ? 'text-slate-800 font-bold' : i + 1 < step ? 'text-[#0159A3]' : 'text-slate-400'
                        }`}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form content */}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="overflow-hidden">
                    {step === 1 && (
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        style={{ animation: `${direction === 'right' ? 'slide-in-right' : 'slide-in-left'} 0.4s cubic-bezier(0.16,1,0.3,1)` }}
                      >
                        {[
                          { field: 'nom', label: 'Nom complet', type: 'text', placeholder: 'Votre nom complet' },
                          { field: 'ice', label: 'Numéro ICE', type: 'text', placeholder: 'Identifiant Commun de l\'Entreprise' },
                          { field: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '+212 6XX XXX XXX' },
                          { field: 'email', label: 'Email professionnel', type: 'email', placeholder: 'votre@email.com' },
                        ].map(({ field, label, type, placeholder }) => (
                          <div key={field} className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</label>
                            <input
                              type={type}
                              placeholder={placeholder}
                              value={formData[field]}
                              onChange={e => update(field, e.target.value)}
                              className={inputCls(field)}
                            />
                            {errors[field] && (
                              <span className="text-xs text-rose-500 font-medium">Ce champ est requis</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {step === 2 && (
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        style={{ animation: `${direction === 'right' ? 'slide-in-right' : 'slide-in-left'} 0.4s cubic-bezier(0.16,1,0.3,1)` }}
                      >
                        {[
                          {
                            field: 'marchandise', label: 'Type de marchandise',
                            options: [
                              { v: 'textile', l: 'Textile & Habillement' },
                              { v: 'electronique', l: 'Électronique' },
                              { v: 'alimentaire', l: 'Produits Alimentaires' },
                              { v: 'cosmetique', l: 'Cosmétique & Beauté' },
                              { v: 'industriel', l: 'Matériel Industriel' },
                              { v: 'autre', l: 'Autre' },
                            ]
                          },
                          {
                            field: 'budget', label: 'Budget mensuel estimé',
                            options: [
                              { v: '50k', l: 'Moins de 50 000 MAD' },
                              { v: '100k', l: '50 000 — 100 000 MAD' },
                              { v: '500k', l: '100 000 — 500 000 MAD' },
                              { v: '1m', l: '500 000 — 1 000 000 MAD' },
                              { v: '1m+', l: 'Plus de 1 000 000 MAD' },
                            ]
                          },
                        ].map(({ field, label, options }) => (
                          <div key={field} className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</label>
                            <select value={formData[field]} onChange={e => update(field, e.target.value)} className={inputCls(field) + ' pr-10'}>
                              <option value="" disabled>Sélectionner</option>
                              {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                            </select>
                            {errors[field] && <span className="text-xs text-rose-500 font-medium">Ce champ est requis</span>}
                          </div>
                        ))}
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Volume d'importation mensuel</label>
                          <select value={formData.volume} onChange={e => update('volume', e.target.value)} className={inputCls('volume') + ' pr-10'}>
                            <option value="" disabled>Sélectionner le volume</option>
                            <option value="1-5">1 à 5 conteneurs</option>
                            <option value="5-20">5 à 20 conteneurs</option>
                            <option value="20+">Plus de 20 conteneurs</option>
                            <option value="groupage">Groupage / LCL</option>
                          </select>
                          {errors.volume && <span className="text-xs text-rose-500 font-medium">Ce champ est requis</span>}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div style={{ animation: `${direction === 'right' ? 'slide-in-right' : 'slide-in-left'} 0.4s cubic-bezier(0.16,1,0.3,1)` }}>
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">Stade de votre projet</p>
                        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${errors.urgency ? 'ring-2 ring-rose-200 rounded-2xl p-2' : ''}`}>
                          {urgencyOptions.map(opt => (
                            <label key={opt.value} className="cursor-pointer">
                              <input type="radio" name="urgency" value={opt.value} className="hidden"
                                checked={formData.urgency === opt.value} onChange={() => update('urgency', opt.value)} />
                              <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                                formData.urgency === opt.value
                                  ? 'border-[#0159A3] bg-[#0159A3]/5 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-slate-300'
                              } ${opt.urgent ? 'border-amber-200 hover:border-amber-300' : ''}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                  formData.urgency === opt.value ? 'bg-[#0159A3] text-white' :
                                  opt.urgent ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'
                                } transition-colors duration-200`}>
                                  {opt.icon}
                                </div>
                                <div>
                                  <p className="font-bold text-sm text-slate-900">{opt.label}</p>
                                  <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.urgency && <p className="text-xs text-rose-500 font-medium mt-2">Veuillez sélectionner une option</p>}
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 gap-4">
                    {step > 1 ? (
                      <button type="button" onClick={prevStep}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-200">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Précédent
                      </button>
                    ) : <div />}

                    {step < 3 ? (
                      <button type="button" onClick={nextStep}
                        className="ml-auto flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-extrabold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #0159A3, #003862)' }}>
                        Suivant
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    ) : (
                      <button type="submit"
                        className="ml-auto flex items-center gap-3 px-7 py-3.5 rounded-xl text-sm font-extrabold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden relative"
                        style={{ background: 'linear-gradient(135deg, #FFC90D, #ffe066)', boxShadow: '0 8px 25px rgba(255,201,13,0.35)' }}>
                        <span className="absolute inset-0 animate-shimmer" style={{
                          background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 75%)',
                          backgroundSize: '250% 100%',
                        }} />
                        <span className="relative z-10">ENVOYER MA DEMANDE VIP</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 relative z-10">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-16 px-4" style={{ animation: 'slide-in-right 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl mb-3 text-slate-900">Demande Envoyée !</h3>
                <p className="text-slate-500 max-w-[380px] mx-auto leading-relaxed">
                  Notre équipe vous contactera dans les <strong className="text-slate-900">24h</strong> via WhatsApp pour démarrer votre pré-validation.
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Confirmé — Référence de dossier générée</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
