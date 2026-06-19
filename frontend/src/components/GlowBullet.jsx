export default function GlowBullet({ index }) {
  const numberStr = (index !== undefined ? index + 1 : 1).toString().padStart(2, '0')

  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center"
      style={{ width: 40, height: 40, filter: 'drop-shadow(0 3px 6px rgba(37,99,235,0.25))' }}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gradient-to-tr from-[#1e3a8a] via-[#3b82f6] to-[#38bdf8] z-10">
        
        {/* Inner white circle */}
        <div className="relative flex items-center justify-center w-[22px] h-[22px] bg-gradient-to-b from-white to-[#f8fafc] rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.08),_0_1px_2px_rgba(0,0,0,0.15)] z-20">
          <span className="text-[#1e40af] text-[11px] font-medium tracking-tight leading-none pt-[1px]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {numberStr}
          </span>
        </div>

        {/* Triangle arrow pointing right */}
        <div
          className="absolute -right-[6px] w-[11px] h-[14px] z-0"
          style={{
            clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            background: 'linear-gradient(to bottom right, #38bdf8, #0ea5e9)',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      </div>
    </div>
  )
}
