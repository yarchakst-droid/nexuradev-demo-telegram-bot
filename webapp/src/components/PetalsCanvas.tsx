import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  angle: number;
  spin: number;
  rotation: number;
  colorIndex: number;
}

const COLORS = ["#E8B4A8", "#F3DED6", "#C1663F", "#F6C9BD"];

export default function PetalsCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    function resize() {
      canvas!.width = canvas!.clientWidth * devicePixelRatio;
      canvas!.height = canvas!.clientHeight * devicePixelRatio;
    }
    resize();
    window.addEventListener("resize", resize);

    petalsRef.current = Array.from({ length: 46 }, () => ({
      x: Math.random() * canvas.clientWidth,
      y: -20 - Math.random() * canvas.clientHeight,
      r: 5 + Math.random() * 6,
      speed: 0.6 + Math.random() * 1.2,
      drift: Math.random() * 1.4 - 0.7,
      angle: Math.random() * Math.PI * 2,
      spin: Math.random() * 0.06 - 0.03,
      rotation: 0,
      colorIndex: Math.floor(Math.random() * COLORS.length),
    }));

    function draw() {
      ctx!.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx!.clearRect(0, 0, canvas!.clientWidth, canvas!.clientHeight);
      for (const p of petalsRef.current) {
        p.y += p.speed;
        p.x += Math.sin(p.angle) * p.drift;
        p.angle += 0.01;
        p.rotation += p.spin;
        if (p.y > canvas!.clientHeight + 20) {
          p.y = -20;
          p.x = Math.random() * canvas!.clientWidth;
        }
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.fillStyle = COLORS[p.colorIndex];
        ctx!.beginPath();
        ctx!.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
      frameRef.current = requestAnimationFrame(draw);
    }
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}
