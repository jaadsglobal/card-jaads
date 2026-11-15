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
        x: node.x + Math.sin(time * 0.00055 + node.phase) * 36,
        y: node.y + Math.cos(time * 0.00045 + node.phase) * 29,
      }));
      const reach = width < 600 ? 160 : 220;

      for (let i = 0; i < positions.length; i++) {
        const a = positions[i];
        for (let j = i + 1; j < positions.length; j++) {
          const b = positions[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > reach) continue;
          const accent = a.accent || b.accent;
          const opacity = (1 - distance / reach) * (accent ? 0.6 : 0.36);
          context.strokeStyle = accent ? `rgba(227,6,19,${opacity})` : `rgba(190,195,205,${opacity})`;
          context.lineWidth = 0.85;
          context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();

          // Visible signals flow between adjacent nodes, with a soft trail.
          if (accent && (i + j) % 3 === 0) {
            const progress = (time * 0.00016 + i * 0.17) % 1;
            const signalX = a.x + (b.x - a.x) * progress;
            const signalY = a.y + (b.y - a.y) * progress;
            const tail = Math.max(0, progress - 0.14);
            const trail = context.createLinearGradient(a.x + (b.x - a.x) * tail, a.y + (b.y - a.y) * tail, signalX, signalY);
            trail.addColorStop(0, 'rgba(227,6,19,0)');
            trail.addColorStop(1, `rgba(255,94,105,${Math.min(0.85, opacity * 3)})`);
            context.strokeStyle = trail;
            context.lineWidth = 1.5;
            context.beginPath(); context.moveTo(a.x + (b.x - a.x) * tail, a.y + (b.y - a.y) * tail); context.lineTo(signalX, signalY); context.stroke();
            context.fillStyle = `rgba(255,132,140,${Math.min(0.95, opacity * 4)})`;
            context.beginPath();
            context.arc(signalX, signalY, 2, 0, Math.PI * 2);
            context.fill();
          }
        }
        context.fillStyle = a.accent ? 'rgba(239,35,49,0.85)' : 'rgba(210,215,225,0.5)';
        context.beginPath(); context.arc(a.x, a.y, a.accent ? 2.1 : 1.5, 0, Math.PI * 2); context.fill();
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
