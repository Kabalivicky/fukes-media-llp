import { useRef, useCallback, useState } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
  glareX: number;
  glareY: number;
}

export const use3DTilt = (intensity: number = 15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1, glareX: 50, glareY: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * intensity,
      rotateY: (x - 0.5) * intensity,
      scale: 1.02,
      glareX: x * 100,
      glareY: y * 100,
    });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1, glareX: 50, glareY: 50 });
  }, []);

  return { ref, tilt, handleMouseMove, handleMouseLeave };
};
