import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface Props {
  baseSrc: string;
  detailSrc: string;
  alt: string;
  className?: string;
  hintText?: string;
}

export default function RevealImage({
  baseSrc,
  detailSrc,
  alt,
  className = "",
  hintText = "Наведіть або торкніться, щоб побачити деталі композиції",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const radius = useSpring(0, { stiffness: 140, damping: 20, mass: 0.6 });
  const clipPath = useMotionTemplate`circle(${radius}% at ${x}% ${y}%)`;

  function updatePointer(clientX: number, clientY: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((clientX - rect.left) / rect.width) * 100);
    y.set(((clientY - rect.top) / rect.height) * 100);
  }

  function activate(clientX: number, clientY: number) {
    updatePointer(clientX, clientY);
    setActive(true);
    radius.set(65);
  }

  function deactivate() {
    setActive(false);
    radius.set(0);
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-blush/40 ${className}`}
      onPointerEnter={(e) => activate(e.clientX, e.clientY)}
      onPointerMove={(e) => (active ? updatePointer(e.clientX, e.clientY) : undefined)}
      onPointerDown={(e) => activate(e.clientX, e.clientY)}
      onPointerLeave={deactivate}
    >
      <img src={baseSrc} alt={alt} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      <motion.img
        src={detailSrc}
        alt=""
        aria-hidden
        draggable={false}
        style={{ clipPath }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" />
      <motion.span
        animate={{ opacity: active ? 0 : 1, y: active ? 4 : 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-full bg-charcoal/70 px-3 py-1.5 text-center text-xs font-medium text-cream backdrop-blur-sm"
      >
        {hintText}
      </motion.span>
    </div>
  );
}
