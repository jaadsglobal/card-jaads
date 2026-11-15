import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; phase: number; accent: boolean };

export function ConnectionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let previousFrame = 0;
    let elapsed = 0;
    let previousTime = 0;

    function draw(time: number) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      const positions = nodes.map(node => ({
        ...node,
        x: node.x + Math.sin(time * 0.00012 + node.phase) * 19,
        y: node.y + Math.cos(time * 0.0001 + node.phase) * 15,
      }));
      const reach = width < 600 ? 160 : 220;

      for (let i = 0; i < positions.length; i++) {
        const a = positions[i];
        for (let j = i + 1; j < positions.length; j++) {
          const b = positions[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > reach) continue;
          const accent = a.accent || b.accent;
          const opacity = (1 - distance / reach) * (accent ? 0.4 : 0.22);
          context.strokeStyle = accent ? `rgba(227,6,19,${opacity})` : `rgba(190,195,205,${opacity})`;
          context.lineWidth = 0.7;
          context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();

          // Small signals travel along a few connections at a quiet, steady pace.
          if (accent && (i + j) % 4 === 0) {
            const progress = (time * 0.000045 + i * 0.17) % 1;
            context.fillStyle = `rgba(239,63,74,${opacity * 1.8})`;
            context.beginPath();
            context.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 1.3, 0, Math.PI * 2);
            context.fill();
          }
        }
        context.fillStyle = a.accent ? 'rgba(227,6,19,0.65)' : 'rgba(210,215,225,0.3)';
        context.beginPath(); context.arc(a.x, a.y, a.accent ? 1.8 : 1.2, 0, Math.PI * 2); context.fill();
      }
    }

    function tick(time: number) {
      frame = requestAnimationFrame(tick);
      if (time - previousFrame < 1000 / 30) return;
      if (previousTime) elapsed += Math.min(time - previousTime, 60);
      previousTime = time;
      previousFrame = time;
      draw(elapsed);
    }

    function updateMotion() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (motion.matches || document.hidden) { draw(elapsed); return; }
      frame = requestAnimationFrame(tick);
    }

    function resize() {
      if (!canvas || !context) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const columns = Math.min(10, Math.max(3, Math.ceil(width / 180)));
      const rows = Math.min(8, Math.max(4, Math.ceil(height / 180)));
      nodes = Array.from({ length: columns * rows }, (_, index) => {
        const phase = index * 2.39996;
        return {
          x: ((index % columns) + 0.5 + Math.sin(phase) * 0.22) * width / columns,
          y: (Math.floor(index / columns) + 0.5 + Math.cos(phase) * 0.22) * height / rows,
          phase,
          accent: index % 4 === 0,
        };
      });
      draw(elapsed);
    }

    resize();
    updateMotion();
    window.addEventListener('resize', resize);
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateMotion);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="connection-background" aria-hidden="true" />;
}
