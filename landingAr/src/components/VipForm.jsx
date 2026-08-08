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
  { text: 'أكثر من 500 شحنة تمت معالجتها بنجاح' },
  { text: 'استجابة واستشارة مضمونة خلال 24 ساعة' },
  { text: 'مطابقة تامة لقوانين PortNet والجمارك المغربية' },
]

export default function VipForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nom: '', produit: '', pays: '', whatsapp: ''
  })
  const [errors, setErrors] = useState({})
  const r1 = useReveal()
  const r2 = useReveal(150)

  const update = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: false }))
  }

  const validateForm = () => {
    const errs = {}
    if (!formData.nom.trim()) errs.nom = true
    if (!formData.produit.trim()) errs.produit = true
    if (!formData.pays.trim()) errs.pays = true
    if (!formData.whatsapp.trim()) errs.whatsapp = true
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setSubmitting(true)

    const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbz5i1Ngwn1fx_Xx5PTGbWOhj4CIldXrlQs7-gB8AVkOCt85dGii-Eqyc-zWwYz6AU71sA/exec'

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(formData),
        })
      } catch (err) {
        console.error('Google Sheets submission error:', err)
      }
    }

    setSubmitted(true)
    setSubmitting(false)

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Formulaire de Pré-Validation VIP',
        status: 'submitted',
      })
    }
  }

  const inputCls = (field) =>
    `w-full px-5 py-4 rounded-xl border outline-none text-base transition-all duration-200 bg-white text-slate-900 placeholder:text-slate-400 focus:shadow-[0_0_0_3px_rgba(1,89,163,0.12)] ${
      errors[field]
        ? 'border-rose-400 shadow-[0_0_0_3px_rgba(244,63,94,0.08)]'
        : 'border-slate-200 focus:border-[#0159A3]'
    }`

  return (
    <section id="form-section" className="relative bg-white pt-8 pb-16 sm:pt-24 sm:pb-32 overflow-hidden">

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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 sm:gap-12 lg:gap-28 items-start">

          {/* Left Column: Text / Trust */}
          <div ref={r1} className="reveal-el flex flex-col gap-7 lg:sticky lg:top-24">
            <span className="text-xs font-bold tracking-widest text-[#0159A3] uppercase">
              التأهيل المباشر VIP
            </span>

            <h2 className="font-heading font-bold text-[clamp(1.85rem,6vw,3.6rem)] leading-[1.12] tracking-tight text-[#002B49]">
              استمارة{' '}
              <span className="text-[#0159A3] whitespace-nowrap inline-block">التحقق الإستباقي ultex</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed max-w-[420px]">
              يقوم فريقنا الخبير بتحليل ملفك والتواصل معك في أقل من 24 ساعة عبر الواتساب.
            </p>

            {/* Live social proof */}
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <div className="flex -space-x-1.5 space-x-reverse">
                {['أب','كم','س ل','م ن'].map((initials,i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-[9px] shrink-0"
                    style={{ background: ['#0159A3','#7C3AED','#059669','#D97706'][i] }}>
                    {initials}
                  </div>
                ))}
              </div>
              <span>قدّم <strong className="text-slate-900 font-bold">12 مستورداً</strong> ملفاتهم هذا الأسبوع</span>
            </div>

            {/* Trust list */}
            <ul className="flex flex-col gap-4 mt-1">
              {trustPoints.map(({ text }, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5 text-emerald-600">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Form */}
          <div ref={r2} className="reveal-el scroll-mt-12" id="vip-form-content">
            {!submitted ? (
              <div>
                {/* Form Header */}
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    لنبدأ في تأمين شحنتك
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    املأ هذه الاستمارة للحصول على مواكبة استباقية فعالة في أقل من 24 ساعة.
                  </p>
                </div>

                {/* Form content */}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { field: 'nom', label: 'الاسم الكامل أو اسم الشركة', type: 'text', placeholder: 'أدخل اسمك أو اسم الشركة' },
                      { field: 'produit', label: 'نوع البضائع / المنتج', type: 'text', placeholder: 'مثال: نسيج، إلكترونيات، آلات...' },
                      { field: 'pays', label: 'بلد المصدر / الوجهة', type: 'text', placeholder: 'مثال: الصين، تركيا، أوروبا...' },
                      { field: 'whatsapp', label: 'رقم الواتساب', type: 'tel', placeholder: '+212 6XX XXX XXX' },
                    ].map(({ field, label, type, placeholder }) => (
                      <div key={field} className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{label}</label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={formData[field]}
                          onChange={e => update(field, e.target.value)}
                          className={inputCls(field)}
                        />
                        {errors[field] && (
                          <span className="text-xs text-rose-500 font-semibold">هذا الحقل مطلوب</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8">
                    <button type="submit" disabled={submitting}
                      className="w-full flex justify-center items-center gap-3 px-7 py-4 rounded-xl text-sm font-bold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden relative disabled:opacity-75 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg, #FFC90D, #ffe066)', boxShadow: '0 8px 25px rgba(255,201,13,0.35)' }}>
                      <span className="absolute inset-0 animate-shimmer" style={{
                        background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 75%)',
                        backgroundSize: '250% 100%',
                      }} />
                      <span className="relative z-10">{submitting ? 'جاري إرسال الطلب...' : 'إرسال طلب التأهيل VIP الآن'}</span>
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin relative z-10" />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 relative z-10">
                          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 5 5 12 12 19" />
                        </svg>
                      )}
                    </button>
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
                <h3 className="font-heading font-bold text-2xl sm:text-3xl mb-3 text-slate-900">تم إرسال طلبك بنجاح!</h3>
                <p className="text-slate-600 max-w-[380px] mx-auto leading-relaxed font-medium">
                  سيتواصل معك فريقنا الخبير في أقل من <strong className="text-slate-900">24 ساعة</strong> عبر الواتساب للبدء في عملية التحقق المسبق.
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>تم التأكيد — تم تمييز وتوليد مرجع الملف الخاص بك</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
