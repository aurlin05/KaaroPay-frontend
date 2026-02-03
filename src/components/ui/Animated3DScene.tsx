import { useEffect, useRef } from 'react'

export function Animated3DScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 20
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.05
      currentY += (mouseY - currentY) * 0.05
      
      const scene = container.querySelector('.scene-container') as HTMLElement
      if (scene) {
        scene.style.transform = `rotateY(${currentX}deg) rotateX(${-currentY}deg)`
      }
      
      animationId = requestAnimationFrame(animate)
    }

    container.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden relative" style={{ perspective: '1600px' }}>
      
      <div className="scene-container relative w-full h-full flex items-center justify-center transition-transform duration-100" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Grille de fond animée */}
        <div className="grid-layer">
          <div className="grid-lines horizontal" />
          <div className="grid-lines vertical" />
        </div>

        {/* Sphère centrale - Hub KaaroPay */}
        <div className="central-sphere">
          <div className="sphere-outer">
            <div className="sphere-middle">
              <div className="sphere-inner">
                <div className="sphere-logo">K</div>
              </div>
            </div>
          </div>
          <div className="sphere-rings">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
          </div>
        </div>

        {/* Nœuds satellites - Canaux de paiement */}
        <div className="satellite-node node-1">
          <div className="node-core" />
          <div className="node-label">Wave</div>
          <div className="connection-line line-1" />
        </div>

        <div className="satellite-node node-2">
          <div className="node-core" />
          <div className="node-label">Orange Money</div>
          <div className="connection-line line-2" />
        </div>

        <div className="satellite-node node-3">
          <div className="node-core" />
          <div className="node-label">MTN MoMo</div>
          <div className="connection-line line-3" />
        </div>

        <div className="satellite-node node-4">
          <div className="node-core" />
          <div className="node-label">Banques</div>
          <div className="connection-line line-4" />
        </div>

        <div className="satellite-node node-5">
          <div className="node-core" />
          <div className="node-label">Cartes</div>
          <div className="connection-line line-5" />
        </div>

        <div className="satellite-node node-6">
          <div className="node-core" />
          <div className="node-label">API</div>
          <div className="connection-line line-6" />
        </div>

        {/* Particules de données circulant */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="data-particle"
            style={{
              '--particle-delay': `${i * 0.3}s`,
              '--particle-duration': `${3 + (i % 3)}s`,
              '--particle-path': i % 6,
            } as React.CSSProperties}
          />
        ))}

        {/* Ondes d'impulsion */}
        <div className="pulse-wave wave-1" />
        <div className="pulse-wave wave-2" />
        <div className="pulse-wave wave-3" />

        {/* Éléments flottants - Symboles financiers */}
        <div className="floating-element elem-1">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
          </svg>
        </div>

        <div className="floating-element elem-2">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
          </svg>
        </div>

        <div className="floating-element elem-3">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
          </svg>
        </div>

        <div className="floating-element elem-4">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z"/>
          </svg>
        </div>

      </div>

      <style>{`
        /* Grille de fond */
        .grid-layer {
          position: absolute;
          inset: 0;
          opacity: 0.15;
        }

        .grid-lines {
          position: absolute;
          inset: 0;
        }

        .grid-lines.horizontal {
          background-image: repeating-linear-gradient(
            0deg,
            hsl(160, 84%, 39%, 0.3) 0px,
            transparent 1px,
            transparent 40px,
            hsl(160, 84%, 39%, 0.3) 41px
          );
          animation: grid-move-y 20s linear infinite;
        }

        .grid-lines.vertical {
          background-image: repeating-linear-gradient(
            90deg,
            hsl(160, 84%, 39%, 0.3) 0px,
            transparent 1px,
            transparent 40px,
            hsl(160, 84%, 39%, 0.3) 41px
          );
          animation: grid-move-x 20s linear infinite;
        }

        @keyframes grid-move-y {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }

        @keyframes grid-move-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(40px); }
        }

        /* Sphère centrale */
        .central-sphere {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
        }

        .sphere-outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, hsl(160, 84%, 50%), hsl(160, 84%, 35%));
          box-shadow: 
            0 0 60px hsl(160, 84%, 39%, 0.6),
            0 0 100px hsl(160, 84%, 39%, 0.4),
            inset -20px -20px 40px rgba(0, 0, 0, 0.2),
            inset 20px 20px 40px rgba(255, 255, 255, 0.1);
          animation: sphere-pulse 4s ease-in-out infinite;
        }

        .sphere-middle {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, hsl(160, 84%, 55%), hsl(160, 84%, 40%));
          box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.2);
        }

        .sphere-inner {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, hsl(160, 84%, 60%), hsl(160, 84%, 45%));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sphere-logo {
          font-size: 64px;
          font-weight: 900;
          color: white;
          text-shadow: 
            0 0 20px rgba(255, 255, 255, 0.8),
            0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .sphere-rings {
          position: absolute;
          inset: 0;
        }

        .ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid hsl(160, 84%, 39%, 0.4);
        }

        .ring-1 {
          inset: -30px;
          animation: ring-rotate-1 15s linear infinite;
        }

        .ring-2 {
          inset: -60px;
          border-style: dashed;
          border-color: hsl(160, 84%, 39%, 0.3);
          animation: ring-rotate-2 20s linear infinite reverse;
        }

        .ring-3 {
          inset: -90px;
          border-width: 1px;
          border-color: hsl(160, 84%, 39%, 0.2);
          animation: ring-rotate-3 25s linear infinite;
        }

        @keyframes sphere-pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 
              0 0 60px hsl(160, 84%, 39%, 0.6),
              0 0 100px hsl(160, 84%, 39%, 0.4),
              inset -20px -20px 40px rgba(0, 0, 0, 0.2),
              inset 20px 20px 40px rgba(255, 255, 255, 0.1);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 
              0 0 80px hsl(160, 84%, 39%, 0.8),
              0 0 140px hsl(160, 84%, 39%, 0.6),
              inset -20px -20px 40px rgba(0, 0, 0, 0.2),
              inset 20px 20px 40px rgba(255, 255, 255, 0.1);
          }
        }

        @keyframes ring-rotate-1 {
          from { transform: rotateZ(0deg) rotateY(60deg); }
          to { transform: rotateZ(360deg) rotateY(60deg); }
        }

        @keyframes ring-rotate-2 {
          from { transform: rotateZ(0deg) rotateX(60deg); }
          to { transform: rotateZ(360deg) rotateX(60deg); }
        }

        @keyframes ring-rotate-3 {
          from { transform: rotateZ(0deg) rotateY(75deg) rotateX(15deg); }
          to { transform: rotateZ(360deg) rotateY(75deg) rotateX(15deg); }
        }

        /* Nœuds satellites */
        .satellite-node {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
        }

        .node-core {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
          border: 3px solid hsl(160, 84%, 39%);
          box-shadow: 
            0 0 20px hsl(160, 84%, 39%, 0.5),
            0 4px 15px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.5);
          animation: node-pulse 3s ease-in-out infinite;
        }

        .node-label {
          position: absolute;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          white-space: nowrap;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .connection-line {
          position: absolute;
          top: 25px;
          left: 25px;
          width: 2px;
          height: 100px;
          background: linear-gradient(to bottom, hsl(160, 84%, 39%, 0.6), transparent);
          transform-origin: top center;
        }

        .node-1 {
          animation: orbit-node-1 12s linear infinite;
        }

        .node-2 {
          animation: orbit-node-2 12s linear infinite;
        }

        .node-3 {
          animation: orbit-node-3 12s linear infinite;
        }

        .node-4 {
          animation: orbit-node-4 12s linear infinite;
        }

        .node-5 {
          animation: orbit-node-5 12s linear infinite;
        }

        .node-6 {
          animation: orbit-node-6 12s linear infinite;
        }

        @keyframes node-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes orbit-node-1 {
          from { transform: translate(-50%, -50%) rotateY(0deg) translateX(220px) rotateY(0deg); }
          to { transform: translate(-50%, -50%) rotateY(360deg) translateX(220px) rotateY(-360deg); }
        }

        @keyframes orbit-node-2 {
          from { transform: translate(-50%, -50%) rotateY(60deg) translateX(220px) rotateY(-60deg); }
          to { transform: translate(-50%, -50%) rotateY(420deg) translateX(220px) rotateY(-420deg); }
        }

        @keyframes orbit-node-3 {
          from { transform: translate(-50%, -50%) rotateY(120deg) translateX(220px) rotateY(-120deg); }
          to { transform: translate(-50%, -50%) rotateY(480deg) translateX(220px) rotateY(-480deg); }
        }

        @keyframes orbit-node-4 {
          from { transform: translate(-50%, -50%) rotateY(180deg) translateX(220px) rotateY(-180deg); }
          to { transform: translate(-50%, -50%) rotateY(540deg) translateX(220px) rotateY(-540deg); }
        }

        @keyframes orbit-node-5 {
          from { transform: translate(-50%, -50%) rotateY(240deg) translateX(220px) rotateY(-240deg); }
          to { transform: translate(-50%, -50%) rotateY(600deg) translateX(220px) rotateY(-600deg); }
        }

        @keyframes orbit-node-6 {
          from { transform: translate(-50%, -50%) rotateY(300deg) translateX(220px) rotateY(-300deg); }
          to { transform: translate(-50%, -50%) rotateY(660deg) translateX(220px) rotateY(-660deg); }
        }

        /* Particules de données */
        .data-particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background: hsl(160, 84%, 50%);
          border-radius: 50%;
          box-shadow: 0 0 10px hsl(160, 84%, 39%, 0.8);
          animation: particle-flow var(--particle-duration) linear infinite;
          animation-delay: var(--particle-delay);
        }

        @keyframes particle-flow {
          0% {
            transform: translate(-50%, -50%) rotateY(calc(var(--particle-path) * 60deg)) translateX(70px) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translate(-50%, -50%) rotateY(calc(var(--particle-path) * 60deg)) translateX(70px) scale(1);
          }
          90% {
            opacity: 1;
            transform: translate(-50%, -50%) rotateY(calc(var(--particle-path) * 60deg)) translateX(220px) scale(1);
          }
          100% {
            transform: translate(-50%, -50%) rotateY(calc(var(--particle-path) * 60deg)) translateX(220px) scale(0);
            opacity: 0;
          }
        }

        /* Ondes d'impulsion */
        .pulse-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid hsl(160, 84%, 39%);
          animation: pulse-expand 3s ease-out infinite;
        }

        .wave-1 {
          animation-delay: 0s;
        }

        .wave-2 {
          animation-delay: 1s;
        }

        .wave-3 {
          animation-delay: 2s;
        }

        @keyframes pulse-expand {
          0% {
            width: 140px;
            height: 140px;
            opacity: 0.8;
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
          }
        }

        /* Éléments flottants */
        .floating-element {
          position: absolute;
          width: 40px;
          height: 40px;
          color: rgba(255, 255, 255, 0.6);
          filter: drop-shadow(0 0 8px hsl(160, 84%, 39%, 0.4));
        }

        .floating-element svg {
          width: 100%;
          height: 100%;
        }

        .elem-1 {
          top: 15%;
          left: 15%;
          animation: float-elem 6s ease-in-out infinite;
        }

        .elem-2 {
          top: 20%;
          right: 18%;
          animation: float-elem 7s ease-in-out infinite 1s;
        }

        .elem-3 {
          bottom: 20%;
          left: 12%;
          animation: float-elem 6.5s ease-in-out infinite 0.5s;
        }

        .elem-4 {
          bottom: 15%;
          right: 15%;
          animation: float-elem 7.5s ease-in-out infinite 1.5s;
        }

        @keyframes float-elem {
          0%, 100% {
            transform: translateY(0) translateZ(30px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-25px) translateZ(60px) rotate(10deg);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  )
}
