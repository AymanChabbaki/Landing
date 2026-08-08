import { useEffect, useState } from 'react'

export default function TradeTransitOverlay({ active, onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (active) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 50)

      const timer = setTimeout(() => {
        onComplete?.()
      }, 1600)

      return () => {
        clearInterval(interval)
        clearTimeout(timer)
      }
    }
  }, [active, onComplete])

  if (!active) return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* ─── Backdrop & High-Tech Radar HUD Background ─── */}
      <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-2xl transition-opacity duration-500 animate-fade-up" />
      
      {/* Laser Scanning Grid */}
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#0159A3_1px,transparent_1px),linear-gradient(to_bottom,#0159A3_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Pulsing Central Target Ring */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-brand-blue/20 animate-ping opacity-20 pointer-events-none" />

      {/* ─── Command Center Container ─── */}
      <div className="relative z-10 w-full max-w-[1050px] px-6 flex flex-col items-center gap-8">
        
        {/* Top Header Badge */}
        <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900/90 border border-brand-blue/30 shadow-[0_0_30px_rgba(1,89,163,0.3)] backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono font-bold tracking-widest text-slate-200 uppercase">
            ultex بورتنيت // مركز المتابعة الجمركية - الدار البيضاء
          </span>
        </div>

        {/* ─── Animated Dual Transit Tracks (Avion & Boat) ─── */}
        <div className="relative w-full h-[220px] flex items-center justify-center my-2">
          
          {/* Curved Flight Path (Air) */}
          <div className="absolute inset-x-0 top-6 h-24">
            <svg className="w-full h-full" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
              <path d="M0,80 Q 500,0 1000,60" stroke="url(#air-gradient)" strokeWidth="3" strokeDasharray="8 6" />
              <defs>
                <linearGradient id="air-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0159A3" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#0a7fd4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FFC90D" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Curved Maritime Path (Sea) */}
          <div className="absolute inset-x-0 bottom-4 h-24">
            <svg className="w-full h-full" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
              <path d="M0,30 Q 500,90 1000,20" stroke="url(#sea-gradient)" strokeWidth="3" />
              <defs>
                <linearGradient id="sea-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFC90D" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FFC90D" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0159A3" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* ✈️ Avion Asset Gliding Animation */}
          <div className="absolute right-[5%] top-[10px] animate-plane-transit flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full bg-brand-blue/40 blur-xl animate-pulse" />
              <img
                src="/avion.png"
                alt="الشحن الجوي ultex"
                className="h-24 sm:h-32 w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(1,89,163,0.9)] transform rotate-6 scale-x-[-1]"
              />
            </div>
            <div className="hidden sm:flex flex-col p-3 rounded-2xl bg-slate-900/90 border border-brand-blue/40 shadow-2xl backdrop-blur-md">
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-gold uppercase">الشحن الجوي</span>
              <span className="text-xs font-bold text-white">تخليص سريع 24h</span>
            </div>
          </div>

          {/* 🚢 Boat Asset Sailing Animation */}
          <div className="absolute right-[0%] bottom-[0px] animate-ship-transit flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full bg-brand-gold/30 blur-xl animate-pulse" />
              <img
                src="/boat.png"
                alt="الشحن البحري ultex"
                className="h-24 sm:h-32 w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] scale-x-[-1]"
              />
            </div>
            <div className="hidden sm:flex flex-col p-3 rounded-2xl bg-slate-900/90 border border-brand-gold/40 shadow-2xl backdrop-blur-md">
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-blue-light uppercase">الشحن البحري</span>
              <span className="text-xs font-bold text-white">تغطية PortNet 100%</span>
            </div>
          </div>

        </div>

        {/* ─── Center Telemetry & Progress Card ─── */}
        <div className="w-full max-w-[540px] p-6 rounded-3xl bg-slate-900/95 border-2 border-brand-gold/60 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl flex flex-col gap-4">
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold text-slate-400 tracking-wider uppercase">تأمين نظام بورتنيت</span>
              <span className="text-sm font-bold text-white">التحقق الجمركي المسبق</span>
            </div>
            <div className="flex items-baseline gap-1 text-brand-gold font-mono font-bold text-2xl">
              <span>{progress}</span>
              <span className="text-sm">%</span>
            </div>
          </div>

          {/* Neon Progress Track */}
          <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-blue via-brand-gold to-emerald-400 transition-all duration-75 shadow-[0_0_15px_rgba(1,89,163,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Live Dynamic Checklist Checklist Items */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-bold text-slate-300">
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${progress >= 30 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'}`}>✓</span>
              <span>التحقق من ICE والسجل</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${progress >= 60 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'}`}>✓</span>
              <span>التدقيق عبر PortNet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${progress >= 85 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'}`}>✓</span>
              <span>تدقيق الترميز الجمركي</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${progress >= 100 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'}`}>✓</span>
              <span>التوجيه لاستمارة VIP</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
