import { useEffect, useRef, useState } from 'react'

const MOBILE_BREAKPOINT = 768

/* ─── Inline SVG icons (no external icon library) ─── */
const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)
const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
)
const TikTokIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
)
const MailIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
  </svg>
)
const MapPinIcon = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const PhoneIcon = ({ size = 11, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

/* ─── Social config ─── */
const SOCIALS = [
  { icon: FacebookIcon, href: "https://www.facebook.com/ULTex.ma", label: "Facebook", color: "#1877F2" },
  { icon: InstagramIcon, href: "https://www.instagram.com/ult.ex", label: "Instagram", color: "#E1306C" },
  { icon: LinkedinIcon, href: "https://ma.linkedin.com/company/ultex", label: "LinkedIn", color: "#0A66C2" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@ul.tex", label: "TikTok", color: "#ffffff" },
  { icon: YoutubeIcon, href: "https://youtube.com/@joinultex", label: "YouTube", color: "#FF0000" },
  { icon: MailIcon, href: "mailto:contact@ultex.ma", label: "Email", color: "#FFC90D" },
]

/* ─── Offices ─── */
const OFFICES = [
  {
    label: "Casablanca",
    mapsHref: "https://maps.app.goo.gl/kszsin7F9V6aGX647?g_st=ic",
    phones: ["(+212) 522-862135", "(+212) 674-755993"],
  },
  {
    label: "Marrakech",
    mapsHref: "https://maps.app.goo.gl/E942KwMG9gycFg6y8?g_st=ic",
    phones: ["(+212) 524-304462", "(+212) 774-004544"],
  },
]

/* ─── One-page navigation (section ids) ─── */
const NAV_LINKS = [
  { label: "ACCUEIL", id: "top" },
  { label: "LE PROCESSUS", id: "process" },
  { label: "LE CONSTAT (80%)", id: "comparison" },
  { label: "TÉMOIGNAGES", id: "testimonials" },
  { label: "QUALIFICATION VIP", id: "form-section" },
]

/* ─── Social Button — color only on hover, no border, no lift ─── */
const SocialBtn = ({ icon: Icon, href, label, color }) => {
  const [hovered, setHovered] = useState(false)
  const isEmail = href.startsWith('mailto')
  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 32, height: 32,
        color: hovered ? color : "rgba(255,255,255,0.38)",
        transition: "color 0.18s ease",
        cursor: "pointer", textDecoration: "none", flexShrink: 0,
      }}
    >
      <Icon size={17} />
    </a>
  )
}

/* ══════════════════════════════════════ */
export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)
  const [triggered, setTriggered] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const css = `
        @keyframes footer-fade-up {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes footer-from-left {
            from { opacity: 0; transform: translateX(-50px); }
            to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes footer-from-right {
            from { opacity: 0; transform: translateX(50px); }
            to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes footer-map-bloom {
            0%   { opacity: 0; transform: scale(0.5); filter: blur(20px) brightness(3); }
            60%  { opacity: 1; filter: blur(0px) brightness(1); }
            100% { opacity: 1; transform: scale(1); filter: blur(0px) brightness(1); }
        }
        @keyframes footer-border-draw {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
        }

        .footer-map-anim    { animation: footer-map-bloom 1.2s cubic-bezier(0.34,1.2,0.64,1) 0.1s both; }
        .footer-border-anim { transform-origin: left; animation: footer-border-draw 1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .footer-col-0       { animation: footer-from-left  0.8s cubic-bezier(0.16,1,0.3,1) 0.5s  both; }
        .footer-col-1       { animation: footer-from-right 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .footer-col-2       { animation: footer-from-left  0.8s cubic-bezier(0.16,1,0.3,1) 0.8s  both; }
        .footer-col-3       { animation: footer-from-right 0.8s cubic-bezier(0.16,1,0.3,1) 0.95s both; }
        .footer-bottom      { animation: footer-fade-up    0.7s ease 1.1s both; }

        .footer-mob-logo   { animation: footer-fade-up 0.7s ease 0.4s both; }
        .footer-mob-col-l  { animation: footer-from-left  0.7s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .footer-mob-col-r  { animation: footer-from-right 0.7s cubic-bezier(0.16,1,0.3,1) 0.7s  both; }
        .footer-mob-social { animation: footer-fade-up 0.7s ease 0.85s both; }
        .footer-mob-copy   { animation: footer-fade-up 0.7s ease 1s   both; }

        .footer-nav-link {
            color: #FFF;
            font-size: 14px;
            font-weight: 300;
            line-height: 1;
            text-decoration: none;
            transition: color 0.18s ease;
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            text-align: inherit;
        }
        .footer-nav-link:hover { color: #FFC90D; }

        .footer-city-link {
            display: flex;
            align-items: center;
            gap: 6px;
            text-decoration: none;
            transition: opacity 0.18s ease;
        }
        .footer-city-link:hover { opacity: 0.75; }
    `

  const TopBorder = ({ animate }) => (
    <div className="w-full flex" style={{ height: "3px" }}>
      <div style={{ flex: 1, background: "#ffffff" }} />
      <div
        className={animate ? "footer-border-anim" : ""}
        style={{ width: "73.6%", background: "#FFC90D" }}
      />
      <div style={{ flex: 1, background: "#ffffff" }} />
    </div>
  )

  /* ────────── MOBILE ────────── */
  if (isMobile) {
    return (
      <>
        <style>{css}</style>
        <div
          ref={footerRef}
          className="w-full relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, #11131A 0%, #0159A3 100%)" }}
        >
          <TopBorder animate={triggered} />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: "3px" }}>
            <img
              src="/footermap.webp" alt=""
              className={triggered ? "footer-map-anim" : ""}
              style={{ width: "140%", height: "auto", opacity: triggered ? undefined : 0 }}
            />
          </div>

          <div className="relative w-[88%] mx-auto" style={{ zIndex: 2 }}>
            {/* Logo */}
            <div className={`flex flex-col items-center pt-10 pb-8 text-center ${triggered ? "footer-mob-logo" : ""}`}
              style={{ opacity: triggered ? undefined : 0 }}>
              <img src="/logo.svg" alt="Ultex PortNet" className="h-8 w-auto mb-4" />
              <p className="font-body text-white font-light leading-relaxed" style={{ fontSize: "12px", opacity: 0.5, maxWidth: "75%" }}>
                La solution leader en pré-validation douanière B2B &amp; PortNet au Maroc. Sécurisez vos importations et éliminez les blocages au port.
              </p>
            </div>

            <div className="w-full h-px mb-8" style={{ background: "rgba(255,255,255,0.12)" }} />

            {/* Nav + Service */}
            <div className="grid grid-cols-2 gap-6 pb-8">
              <div className={triggered ? "footer-mob-col-l" : ""} style={{ opacity: triggered ? undefined : 0 }}>
                <h4 className="font-heading mb-3" style={{ color: "#FFC90D", fontSize: "15px", fontWeight: 600 }}>
                  NAVIGATION
                </h4>
                <div className="flex flex-col gap-2">
                  {NAV_LINKS.map((item) => (
                    <button key={item.id} onClick={() => scrollTo(item.id)} className="font-heading footer-nav-link" style={{ fontSize: "12px" }}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className={triggered ? "footer-mob-col-r" : ""} style={{ opacity: triggered ? undefined : 0 }}>
                <h4 className="font-heading mb-3" style={{ color: "#FFC90D", fontSize: "15px", fontWeight: 600 }}>
                  SERVICE CLIENT
                </h4>
                <div className="flex flex-col gap-4">
                  {OFFICES.map(o => (
                    <div key={o.label}>
                      <a href={o.mapsHref} target="_blank" rel="noopener noreferrer" className="footer-city-link" style={{ marginBottom: 5 }}>
                        <MapPinIcon size={11} color="#FFC90D" />
                        <span className="font-heading" style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>
                          {o.label}
                        </span>
                      </a>
                      {o.phones.map(p => {
                        const phoneNumber = p.replace(/[^0-9+]/g, '')
                        return (
                          <div key={p} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                            <PhoneIcon size={10} color="rgba(255,255,255,0.25)" />
                            <a
                              href={`tel:${phoneNumber}`}
                              className="font-body"
                              style={{ fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
                              onMouseEnter={e => (e.currentTarget.style.color = "#FFC90D")}
                              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                            >
                              {p}
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className={`pb-8 ${triggered ? "footer-mob-social" : ""}`} style={{ opacity: triggered ? undefined : 0 }}>
              <h4 className="font-heading mb-3" style={{ color: "#FFC90D", fontSize: "15px", fontWeight: 600 }}>
                REJOIGNEZ-NOUS
              </h4>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {SOCIALS.map(s => <SocialBtn key={s.label} {...s} />)}
              </div>
            </div>

            <div className="w-full h-px mb-4" style={{ background: "rgba(255,255,255,0.12)" }} />

            {/* Copyright */}
            <div className={`flex flex-col items-center gap-1 pb-6 text-center ${triggered ? "footer-mob-copy" : ""}`}
              style={{ opacity: triggered ? undefined : 0 }}>
              <span className="font-body" style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", fontWeight: 300 }}>
                © 2026 Ultex Accompagnement Import-Export. Tous droits réservés.
              </span>
              <span className="font-body" style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", fontWeight: 300 }}>
                Casablanca, Maroc
              </span>
            </div>
          </div>
        </div>
      </>
    )
  }

  /* ────────── DESKTOP ────────── */
  return (
    <>
      <style>{css}</style>
      <div
        ref={footerRef}
        className="w-full h-[587px] relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #11131A 0%, #0159A3 100%)" }}
      >
        <TopBorder animate={triggered} />

        <div className="absolute flex items-center justify-center" style={{ inset: "3px 0 0 0" }}>
          <img
            src="/footermap.webp" alt=""
            className={`h-auto mx-auto mt-0 ${triggered ? "footer-map-anim" : ""}`}
            style={{ width: "70%", opacity: triggered ? undefined : 0 }}
          />
        </div>

        <div className="w-[73.6%] mx-auto h-[90%] mt-[4%] bg-transparent relative" style={{ zIndex: 2 }}>
          <div className="flex flex-row pt-16 pb-[80px]">

            {/* COL A — Brand + Socials */}
            <div className={triggered ? "footer-col-0" : ""} style={{ width: "60%", opacity: triggered ? undefined : 0 }}>
              <img src="/logo.svg" alt="Ultex PortNet" className="h-12 w-auto" />
              <p className="font-body mt-4" style={{ color: "#ffffff", fontSize: "14px", fontWeight: 300, lineHeight: "1.4", maxWidth: "57%" }}>
                La solution leader en pré-validation douanière B2B &amp; PortNet au Maroc. Sécurisez vos importations et éliminez les blocages au port.
              </p>
              <div style={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 32 }}>
                {SOCIALS.map(s => <SocialBtn key={s.label} {...s} />)}
              </div>
            </div>

            {/* COL B — Quick access */}
            <div className={triggered ? "footer-col-1" : ""} style={{ width: "20%", opacity: triggered ? undefined : 0 }}>
              <h4 className="font-heading" style={{ color: "#FFC90D", fontSize: "21px", fontWeight: 600, lineHeight: "normal" }}>
                NAVIGATION
              </h4>
              <div className="mt-4 flex flex-col gap-2">
                {NAV_LINKS.map((item) => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} className="font-heading footer-nav-link">
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* COL C — Service client */}
            <div className={triggered ? "footer-col-3" : ""} style={{ width: "20%", opacity: triggered ? undefined : 0 }}>
              <h4 className="font-heading" style={{ color: "#FFC90D", fontSize: "21px", fontWeight: 600, lineHeight: "normal" }}>
                SERVICE CLIENT
              </h4>
              <div className="mt-4 flex flex-col gap-5">
                {OFFICES.map(o => (
                  <div key={o.label}>
                    <a href={o.mapsHref} target="_blank" rel="noopener noreferrer" className="footer-city-link" style={{ marginBottom: 6 }}>
                      <MapPinIcon size={13} color="#FFC90D" />
                      <span className="font-heading" style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
                        {o.label}
                      </span>
                    </a>
                    {o.phones.map(p => {
                      const phoneNumber = p.replace(/[^0-9+]/g, '')
                      return (
                        <div key={p} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <PhoneIcon size={11} color="rgba(255,255,255,0.25)" />
                          <a
                            href={`tel:${phoneNumber}`}
                            className="font-body"
                            style={{ fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#FFC90D")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                          >
                            {p}
                          </a>
                        </div>
                      )
                    })}
                  </div>
                ))}
                {/* Email */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MailIcon size={12} color="#FFC90D" />
                  <a
                    href="mailto:contact@ultex.ma"
                    className="font-body"
                    style={{ fontSize: "13px", fontWeight: 300, color: "rgba(255,201,13,0.75)", textDecoration: "none", transition: "color 0.18s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#FFC90D")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,201,13,0.75)")}
                  >
                    contact@ultex.ma
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div
            className={`absolute w-[100%] bottom-[10%] ${triggered ? "footer-bottom" : ""}`}
            style={{ opacity: triggered ? undefined : 0 }}
          >
            <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            <div className="flex flex-row justify-between items-center py-4">
              <span className="font-body" style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", fontWeight: 300, lineHeight: "normal" }}>
                © 2026 Ultex Accompagnement Import-Export. Tous droits réservés.
              </span>
              <span className="font-body" style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", fontWeight: 300, lineHeight: "normal" }}>
                Casablanca, Maroc
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
