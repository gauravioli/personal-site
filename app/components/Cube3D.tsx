'use client'

interface Cube3DProps {
  gradient: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  size?: number
  animationDelay?: number
}

export function Cube3D({ gradient, position, rotation, size = 120, animationDelay = 0 }: Cube3DProps) {
  const cubeStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
    animationDelay: `${animationDelay}s`,
  }

  const faceStyle = {
    width: `${size}px`,
    height: `${size}px`,
  }

  return (
    <div className="cube-container absolute" style={cubeStyle}>
      <div className="cube" style={{ width: `${size}px`, height: `${size}px` }}>
        <div className={`cube-face cube-front ${gradient}`} style={faceStyle}></div>
        <div className={`cube-face cube-back ${gradient}`} style={faceStyle}></div>
        <div className={`cube-face cube-right ${gradient}`} style={faceStyle}></div>
        <div className={`cube-face cube-left ${gradient}`} style={faceStyle}></div>
        <div className={`cube-face cube-top ${gradient}`} style={faceStyle}></div>
        <div className={`cube-face cube-bottom ${gradient}`} style={faceStyle}></div>
      </div>
    </div>
  )
} 