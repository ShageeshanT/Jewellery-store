'use client';

import React, { useRef, useEffect, ReactNode } from 'react';

export interface Logo {
  node?: ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
}

export interface LogoLoopProps {
  logos: Logo[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  className?: string;
}

export default function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  logoHeight = 48,
  gap = 40,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo carousel',
  className = '',
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isHoveredRef = useRef(false);

  const isHorizontal = direction === 'left' || direction === 'right';
  const isReverse = direction === 'right' || direction === 'down';

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    // Duplicate logos to create seamless loop
    const totalLogos = logos.length;
    const duplicateCount = Math.ceil(3); // Duplicate 3 times for smooth looping

    let currentSpeed = speed;

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Adjust speed based on hover state
      const targetSpeed = isHoveredRef.current ? hoverSpeed : speed;
      currentSpeed += (targetSpeed - currentSpeed) * 0.1; // Smooth transition

      // Calculate movement
      const movement = (currentSpeed / 1000) * deltaTime;
      positionRef.current += isReverse ? -movement : movement;

      // Get dimensions
      const containerSize = isHorizontal ? container.offsetWidth : container.offsetHeight;
      const innerSize = isHorizontal ? inner.offsetWidth : inner.offsetHeight;
      const singleSetSize = innerSize / duplicateCount;

      // Reset position for seamless loop
      if (!isReverse && positionRef.current >= singleSetSize) {
        positionRef.current -= singleSetSize;
      } else if (isReverse && positionRef.current <= -singleSetSize) {
        positionRef.current += singleSetSize;
      }

      // Apply transform
      if (isHorizontal) {
        inner.style.transform = `translateX(${-positionRef.current}px)`;
      } else {
        inner.style.transform = `translateY(${-positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [logos, speed, direction, hoverSpeed, isHorizontal, isReverse]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  // Create tripled array for seamless looping
  const tripledLogos = [...logos, ...logos, ...logos];

  return (
    <div
      ref={containerRef}
      className={`relative ${isHorizontal ? 'w-full' : 'h-full'} overflow-hidden ${className}`}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fade out effect on edges */}
      {fadeOut && (
        <>
          {isHorizontal ? (
            <>
              <div
                className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
                }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
                }}
              />
            </>
          ) : (
            <>
              <div
                className="absolute left-0 right-0 top-0 h-24 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, ${fadeOutColor}, transparent)`,
                }}
              />
              <div
                className="absolute left-0 right-0 bottom-0 h-24 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${fadeOutColor}, transparent)`,
                }}
              />
            </>
          )}
        </>
      )}

      {/* Logo container */}
      <div
        ref={innerRef}
        className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} items-center`}
        style={{
          gap: `${gap}px`,
          willChange: 'transform',
        }}
      >
        {tripledLogos.map((logo, index) => {
          const LogoContent = logo.node ? (
            <div
              className={`flex items-center justify-center transition-transform duration-300 ${
                scaleOnHover ? 'hover:scale-110' : ''
              }`}
              style={{ height: `${logoHeight}px` }}
            >
              {logo.node}
            </div>
          ) : logo.src ? (
            <img
              src={logo.src}
              alt={logo.alt || `Logo ${index + 1}`}
              className={`object-contain transition-transform duration-300 ${
                scaleOnHover ? 'hover:scale-110' : ''
              }`}
              style={{ height: `${logoHeight}px` }}
            />
          ) : null;

          return (
            <div key={`logo-${index}`} className="flex-shrink-0">
              {logo.href ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={logo.title}
                  className="block"
                >
                  {LogoContent}
                </a>
              ) : (
                LogoContent
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
