export function GlowPanel({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className={`absolute top-0 bottom-0 w-24 glow-strip pointer-events-none ${
        side === 'left' ? 'left-0 border-r border-primary/20' : 'right-0 border-l border-primary/20'
      }`}
      aria-hidden="true"
    >
      <div
        className={`absolute top-[30%] bottom-[30%] w-[2px] bg-gradient-to-b from-transparent via-primary to-accent`}
        style={{
          [side === 'left' ? 'right' : 'left']: '20px',
          boxShadow: '0 0 16px #1F7FFE, 0 0 40px rgba(31,127,254,0.3)',
        }}
      />
    </div>
  )
}
