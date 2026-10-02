import React, { useRef, useState, useEffect } from 'react';

/**
 * ParallaxCard
 * High-performance 3D parallax tilt & specular hover glare component.
 * Features:
 * - 60fps rAF throttled mouse-tracking
 * - Perspective 3D tilt with smooth cubic-bezier return
 * - Dynamic radial cursor glare spotlight
 * - Prefers-reduced-motion safe
 */
export default function ParallaxCard({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.02,
  glareColor = 'rgba(0, 113, 227, 0.16)',
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const rafId = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [transformStyle, setTransformStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  });
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
    background: 'transparent'
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (rotateX is vertical, rotateY is horizontal)
      const rotateX = ((centerY - y) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      // Calculate glare coordinates in percentage
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTransformStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 0.08s ease-out'
      });

      setGlareStyle({
        opacity: 1,
        background: `radial-gradient(400px circle at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, ${glareColor}, transparent 75%)`,
        transition: 'opacity 0.2s ease-out'
      });
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    setGlareStyle({
      opacity: 0,
      background: 'transparent',
      transition: 'opacity 0.4s ease-out'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={transformStyle}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Specular Glare Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-inherit z-20 pointer-events-none"
        style={glareStyle}
      />
      {children}
    </div>
  );
}
