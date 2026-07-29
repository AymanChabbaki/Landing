export default function Footer() {
  const scrollTo = (id) => {
    if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#003862] text-white pt-24 pb-12 overflow-hidden">
      
      {/* ─── Wave Curve Divider Top ─── */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-14 text-white fill-current">
          <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Decorative Orbs in Footer */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/30 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-brand-gold/10 blur-[100px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-20">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-start pb-16 border-b border-white/10">
          
          {/* ─── Column 1: Brand & Contact CTA ─── */}
          <div className="md:col-span-5 flex flex-col items-start gap-6">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
              <img src="/logo.svg" alt="Ultex PortNet" className="h-8 filter drop-shadow-md brightness-110" />
            </a>
            
            <p className="text-slate-300 text-sm leading-relaxed max-w-[380px]">
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

          {/* ─── Column 2: Quick Links (with Vertical Divider) ─── */}
          <div className="md:col-span-4 flex flex-col md:flex-row gap-8 items-start md:border-l md:border-white/15 md:pl-10">
            <div className="flex flex-col gap-4">
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-brand-gold">
                NAVIGATION
              </h4>
              <ul className="flex flex-col gap-3 font-heading font-semibold text-sm tracking-wide text-slate-200">
                <li>
                  <button onClick={() => scrollTo('top')} className="hover:text-brand-gold transition-colors">
                    ACCUEIL
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('process')} className="hover:text-brand-gold transition-colors">
                    LE PROCESSUS
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('comparison')} className="hover:text-brand-gold transition-colors">
                    LE CONSTAT (80%)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('testimonials')} className="hover:text-brand-gold transition-colors">
                    TÉMOIGNAGES
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('form-section')} className="hover:text-brand-gold transition-colors">
                    QUALIFICATION VIP
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* ─── Column 3: Social & Support (with Vertical Divider) ─── */}
          <div className="md:col-span-3 flex flex-col gap-4 md:border-l md:border-white/15 md:pl-10">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-brand-gold">
              REJOIGNEZ-NOUS
            </h4>

            <div className="flex flex-col gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-brand-gold transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                </div>
                <span>Instagram</span>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-brand-gold transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </div>
                <span>LinkedIn</span>
              </a>

              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-brand-gold transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </div>
                <span>Facebook</span>
              </a>
            </div>

            {/* WhatsApp Direct with custom SVG */}
            <div className="mt-2 pt-3 border-t border-white/10">
              <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" className="w-4 h-4 object-contain" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block leading-tight">WhatsApp Direct</span>
                  <span className="text-sm font-bold text-brand-gold group-hover:underline">+212 600 000 000</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Ultex PortNet Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            <span>Casablanca, Maroc</span>
            <span>•</span>
            <span>Spécialiste Douane B2B</span>
          </p>
        </div>

      </div>
    </footer>
  )
}
