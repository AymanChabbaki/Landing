export default function VipBar() {
  return (
    <div className="w-full bg-brand-gold py-2 px-4 text-center border-b border-brand-gold-dark/20 z-50">
      <div className="max-w-[1240px] mx-auto flex items-center justify-center gap-2 text-xs sm:text-[0.8rem] font-bold tracking-wider text-brand-blue-dark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-brand-blue-dark shrink-0">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span>مخصص للمستوردين والشركات والتجار الجادين فقط (B2B)</span>
      </div>
    </div>
  )
}
