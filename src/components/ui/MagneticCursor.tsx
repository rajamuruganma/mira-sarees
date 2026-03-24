'use client'

import { useEffect, useRef, useState } from 'react'

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<HTMLDivElement[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    const trailPositions = Array(5).fill(null).map(() => ({ x: 0, y: 0 }))

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = `${mouseX}px`
      cursor.style.top = `${mouseY}px`
    }

    const handleMouseEnterLink = (e: Event) => {
      setIsHovering(true)
      const el = e.currentTarget as HTMLElement
      const text = el.getAttribute('data-cursor-text')
      if (text) setCursorText(text)
    }

    const handleMouseLeaveLink = () => {
      setIsHovering(false)
      setCursorText('')
    }

    const animate = () => {
      // Animate trail dots with staggered following
      for (let i = trailPositions.length - 1; i > 0; i--) {
        trailPositions[i].x += (trailPositions[i - 1].x - trailPositions[i].x) * 0.3
        trailPositions[i].y += (trailPositions[i - 1].y - trailPositions[i].y) * 0.3
      }
      trailPositions[0].x += (mouseX - trailPositions[0].x) * 0.4
      trailPositions[0].y += (mouseY - trailPositions[0].y) * 0.4

      trailRefs.current.forEach((trail, i) => {
        if (trail) {
          trail.style.left = `${trailPositions[i].x}px`
          trail.style.top = `${trailPositions[i].y}px`
        }
      })

      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animate()

    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea, [role="button"]'
    )
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterLink)
      el.addEventListener('mouseleave', handleMouseLeaveLink)
    })

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterLink)
        el.removeEventListener('mouseleave', handleMouseLeaveLink)
      })
    }
  }, [])

  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null

  return (
    <div className={`hidden lg:block ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.3s' }}>
      {/* Trail dots */}
      {Array(5).fill(null).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el }}
          className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${6 - i}px`,
            height: `${6 - i}px`,
            backgroundColor: `rgba(201, 168, 76, ${0.4 - i * 0.07})`,
            transition: 'width 0.3s, height 0.3s',
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ transition: 'width 0.3s ease, height 0.3s ease' }}
      >
        {/* Outer ring */}
        <div
          className={`absolute rounded-full border transition-all duration-300 ease-out ${
            isHovering
              ? 'w-16 h-16 -ml-8 -mt-8 border-gold bg-gold/10 scale-100'
              : 'w-8 h-8 -ml-4 -mt-4 border-gold/50 scale-100'
          }`}
        />
        {/* Inner dot */}
        <div
          className={`absolute rounded-full bg-gold transition-all duration-200 ease-out ${
            isHovering
              ? 'w-2 h-2 -ml-1 -mt-1 opacity-0'
              : 'w-2 h-2 -ml-1 -mt-1 opacity-100'
          }`}
        />
        {/* Text label on hover */}
        {cursorText && (
          <div className="absolute -ml-10 -mt-3 w-20 text-center">
            <span className="font-dm text-[9px] tracking-widest uppercase text-gold">{cursorText}</span>
          </div>
        )}
      </div>
    </div>
  )
}
