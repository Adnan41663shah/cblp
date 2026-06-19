export default function CloudblitzShineText() {
  return (
    <div className="w-full bg-black pt-0 pb-[calc(3rem+var(--mobile-sticky-cta-height))] sm:pt-16 sm:pb-16 lg:py-24 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes text-shine-sweep {
          0% {
            background-position: 100% center;
          }
          100% {
            background-position: 15% center;
          }
        }
        .animate-text-shine-sweep {
          animation: text-shine-sweep 4s ease-in-out infinite alternate;
        }
      `}</style>
      <h1 
        className="font-bold tracking-[0.25px] select-none antialiased animate-text-shine-sweep"
        style={{
          fontFamily: 'Mulish, Mulish, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          fontSize: 'clamp(3.5rem, 16vw, 8rem)',
          backgroundImage: 'linear-gradient(90deg, #222 0%, #222 40%, #333 49.5%, #a3a3a3 55%, #333 60.5%, #222 64%, #222 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          lineHeight: '1.1',
          opacity: 0.9,
          textShadow: '0 8px 24px rgba(0,0,0,0.5)'
        }}
      >
        Cloudblitz
      </h1>
    </div>
  )
}
