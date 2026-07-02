import { useEffect, useState } from 'react'

const words = ['Bowl', 'SUSHI', 'BAO', 'SANDO']

const RotatingText = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <span className="text-black text-2xl sm:text-3xl md:text-4xl font-light tracking-wide">
        Creative
      </span>

      <div className="relative h-[70px] overflow-hidden">
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateY(-${index * 70}px)`,
          }}
        >
          {words.map((word) => (
            <div
              key={word}
              className="
                h-[70px]
                flex
                items-center
                justify-center
                text-5xl
                sm:text-6xl
                md:text-7xl
                font-black
                tracking-tight
                bg-gradient-to-r
                from-ruchi-purple
                via-ruchi-blue
                to-ruchi-yellow
                bg-clip-text
                text-transparent
                drop-shadow-sm
              "
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RotatingText