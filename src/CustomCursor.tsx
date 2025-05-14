'use client';

import { useEffect, useRef } from 'react';

const CustomCursorTrail = () => {
  const coords = useRef({ x: 0, y: 0 });
  const circlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Initialize trailing circles
    const circles = circlesRef.current;
    circles.forEach((circle) => {
      (circle as any).x = 0;
      (circle as any).y = 0;
    });

    const handleMouseMove = (e: MouseEvent) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;

      // Check if hovering over a button
      const isButtonHover = (e.target as HTMLElement).closest('button');
      circles.forEach((circle) => {
        circle.style.backgroundColor = isButtonHover ? 'rgb(0, 0, 0)' : 'rgba(255, 255, 255, 1)';

      });
    };

    const animate = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;
        circle.style.scale = `${(circles.length - index) / circles.length}`;

        (circle as any).x = x;
        (circle as any).y = y;

        const next = circles[index + 1] || circles[0];
        x += ((next as any).x - x) * 0.3;
        y += ((next as any).y - y) * 0.3;
      });

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) circlesRef.current[i] = el;
          }}
          style={{
            height: '24px',
            width: '24px',
            borderRadius: '50%',
            backgroundColor: 'white',
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 99999999,
            transform: 'translate3d(0, 0, 0)',
            transition: 'background-color 0.2s ease',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursorTrail;
