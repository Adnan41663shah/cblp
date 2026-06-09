export default function GlowBullet() {
  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center"
      style={{ width: 40, height: 40 }}
      aria-hidden="true"
    >
      <div
        className="absolute pointer-events-none"
        style={{
          width: 48,
          height: 14,
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(56, 189, 248, 0.38) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 14,
          height: 48,
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(56, 189, 248, 0.38) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 32,
          height: 32,
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(37, 99, 235, 0.22) 42%, transparent 72%)',
        }}
      />
      <div
        className="relative rounded-full"
        style={{
          width: 10,
          height: 10,
          background: '#38bdf8',
          boxShadow:
            '0 0 10px 3px rgba(56, 189, 248, 0.75), 0 0 22px 6px rgba(37, 99, 235, 0.4)',
        }}
      />
    </div>
  )
}
