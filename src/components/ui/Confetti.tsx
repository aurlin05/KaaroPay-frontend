import { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  size: number
  velocity: { x: number; y: number }
}

interface ConfettiProps {
  active: boolean
  onComplete?: () => void
}

const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

export function Confetti({ active, onComplete }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (!active) {
      setPieces([])
      return
    }

    // Generate confetti pieces
    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      velocity: {
        x: (Math.random() - 0.5) * 4,
        y: Math.random() * 3 + 2,
      },
    }))

    setPieces(newPieces)

    // Animate
    const interval = setInterval(() => {
      setPieces((prev) =>
        prev
          .map((piece) => ({
            ...piece,
            x: piece.x + piece.velocity.x,
            y: piece.y + piece.velocity.y,
            rotation: piece.rotation + 5,
            velocity: {
              x: piece.velocity.x * 0.99,
              y: piece.velocity.y + 0.1, // Gravity
            },
          }))
          .filter((piece) => piece.y < window.innerHeight + 20)
      )
    }, 16)

    // Cleanup after animation
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setPieces([])
      onComplete?.()
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [active, onComplete])

  if (!active || pieces.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  )
}
