export default function Footer() {
  const scrollTo = (id) => {
    if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-b from-[#48CAE4] to-[#003862] text-white pt-24 pb-12 overflow-hidden">
      

      {/* Decorative Orbs in Footer */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/30 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-brand-gold/10 blur-[100px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-20">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start pb-16 border-b border-white/10">
          
          {/* ─── Column 1: Brand & Contact CTA ─── */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-center md:items-start gap-6 text-center md:text-left">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
              <img src="/logo.svg" alt="Ultex PortNet" className="h-8 filter drop-shadow-md brightness-110" />
            </a>
            
            <p className="text-slate-200 font-body text-sm leading-relaxed max-w-[380px]">
              La solution leader en pré-validation douanière B2B & PortNet au Maroc. Sécurisez vos importations et éliminez les blocages au port.
            </p>

            <a
              href="#form-section"
              onClick={(e) => { e.preventDefault(); scrollTo('form-section') }}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border-2 border-brand-gold text-brand-gold font-heading font-extrabold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-brand-gold hover:text-brand-blue-dark shadow-lg hover:shadow-brand-gold/20"
            >
              <span>CONTACTEZ-NOUS</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* ─── Column 2: Navigation ─── */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start gap-8 lg:border-l lg:border-white/15 lg:pl-8 text-center md:text-left">
            <div className="flex flex-col gap-4 items-center md:items-start">
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-brand-gold">
                NAVIGATION
              </h4>
              <ul className="flex flex-col gap-3 font-heading font-semibold text-sm tracking-wide text-slate-200 items-center md:items-start">
                <li>
                  <button onClick={() => scrollTo('top')} className="hover:text-brand-gold transition-colors">ACCUEIL</button>
                </li>
                <li>
                  <button onClick={() => scrollTo('process')} className="hover:text-brand-gold transition-colors">LE PROCESSUS</button>
                </li>
                <li>
                  <button onClick={() => scrollTo('comparison')} className="hover:text-brand-gold transition-colors">LE CONSTAT (80%)</button>
                </li>
                <li>
                  <button onClick={() => scrollTo('testimonials')} className="hover:text-brand-gold transition-colors">TÉMOIGNAGES</button>
                </li>
                <li>
                  <button onClick={() => scrollTo('form-section')} className="hover:text-brand-gold transition-colors">QUALIFICATION VIP</button>
                </li>
              </ul>
            </div>
          </div>

          {/* ─── Column 3: Service Client ─── */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start gap-4 lg:border-l lg:border-white/15 lg:pl-8 text-center md:text-left">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-brand-gold">
              SERVICE CLIENT
            </h4>
            <div className="flex flex-col gap-5 items-center md:items-start w-full font-body">
              {/* Casablanca */}
              <div>
                <span className="flex items-center justify-center md:justify-start gap-2 text-white font-semibold text-sm mb-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 text-brand-gold"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                  Casablanca
                </span>
                <div className="flex flex-col gap-1.5 md:pl-6 text-sm text-slate-200/80">
                  <a href="tel:+212522862135" className="hover:text-white transition-colors">(+212) 522-862135</a>
                  <a href="tel:+212674755993" className="hover:text-white transition-colors">(+212) 674-755993</a>
                </div>
              </div>

              {/* Marrakech */}
              <div>
                <span className="flex items-center justify-center md:justify-start gap-2 text-white font-semibold text-sm mb-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 text-brand-gold"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                  Marrakech
                </span>
                <div className="flex flex-col gap-1.5 md:pl-6 text-sm text-slate-200/80">
                  <a href="tel:+212524304462" className="hover:text-white transition-colors">(+212) 524-304462</a>
                  <a href="tel:+212774004544" className="hover:text-white transition-colors">(+212) 774-004544</a>
                </div>
              </div>

              {/* Email */}
              <a href="mailto:contact@ultex.ma" className="flex items-center justify-center md:justify-start gap-2 text-brand-gold hover:text-white transition-colors font-medium text-sm mt-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/></svg>
                contact@ultex.ma
              </a>
            </div>
          </div>

          {/* ─── Column 4: Social ─── */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start gap-4 lg:border-l lg:border-white/15 lg:pl-8 text-center md:text-left">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-brand-gold">
              REJOIGNEZ-NOUS
            </h4>

            <div className="flex flex-col gap-3 items-center md:items-start font-body">
              <a href="https://www.instagram.com/ult.ex" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-brand-gold transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                </div>
                <span>Instagram</span>
              </a>

              <a href="https://ma.linkedin.com/company/ultex" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-brand-gold transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </div>
                <span>LinkedIn</span>
              </a>

              <a href="https://www.facebook.com/ULTex.ma" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-brand-gold transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </div>
                <span>Facebook</span>
              </a>

              <a href="https://www.tiktok.com/@ul.tex" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-brand-gold transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" /></svg>
                </div>
                <span>TikTok</span>
              </a>

              <a href="https://youtube.com/@joinultex" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-brand-gold transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" /></svg>
                </div>
                <span>YouTube</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-xs text-slate-200/80 text-center">
          <p>© 2026 Ultex Accompagnement Import-Export. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            <span>Casablanca, Maroc</span>
          </p>
        </div>

      </div>
    </footer>
  )
}
