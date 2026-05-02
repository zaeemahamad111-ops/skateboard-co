"use client";
import { useRef, useEffect } from 'react';
import './MagnetLines.css';

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}: {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('span');
    let cachedRects: { centerX: number; centerY: number }[] = [];

    const calculateRects = () => {
      cachedRects = Array.from(items).map((item) => {
        const rect = item.getBoundingClientRect();
        return {
          centerX: rect.x + rect.width / 2,
          centerY: rect.y + rect.height / 2,
        };
      });
    };

    calculateRects();
    window.addEventListener('resize', calculateRects);

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach((item, index) => {
        const { centerX, centerY } = cachedRects[index];

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      requestAnimationFrame(() => onPointerMove({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('pointermove', handlePointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const { centerX, centerY } = cachedRects[middleIndex];
      onPointerMove({ x: centerX, y: centerY });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', calculateRects);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        '--rotate': `${baseAngle}deg`,
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        borderRadius: "4px"
      } as React.CSSProperties}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container ${className}`}
      style={{
        '--columns': columns,
        '--rows': rows,
        width: containerSize,
        height: containerSize,
        ...style
      } as React.CSSProperties}
    >
      {spans}
    </div>
  );
}
