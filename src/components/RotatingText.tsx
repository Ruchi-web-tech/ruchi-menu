import { useEffect, useState } from 'react'

// Each word in its category colour (on the dark footer)
const words = [
  { text: 'BOWL', color: 'text-ruchi-yellow' },
  { text: 'BAO', color: 'text-ruchi-pink' },
  { text: 'SUSHI', color: 'text-ruchi-turquoise' },
  { text: 'SANDO', color: 'text-ruchi-purple' },
]

const RotatingText = ({ className = '' }: { className?: string }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 ${className}`}>
      <span className="font-sans text-lg font-medium text-ruchi-cream md:text-[28px]">Creative</span>

      {/* Sizes in em so the rolling window always matches the font size */}
      <span
        className="relative inline-block h-[0.95em] overflow-hidden font-display text-[64px] font-black leading-none tracking-[-0.05em] md:text-[104px]"
        aria-live="off"
      >
        <span
          className="block transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(-${index * 0.95}em)` }}
        >
          {words.map((word) => (
            <span key={word.text} className={`block h-[0.95em] font-display leading-[0.95] ${word.color}`}>
              {word.text}
            </span>
          ))}
        </span>
      </span>
      <span className="sr-only">Bowl, bao, sushi, sando</span>
    </div>
  )
}

export default RotatingText
