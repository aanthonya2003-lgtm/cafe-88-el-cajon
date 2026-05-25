"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
};

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  ariaLabel,
  external = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.4;
    const dy = (e.clientY - cy) * 0.4;
    const max = 15;
    x.set(Math.max(-max, Math.min(max, dx)));
    y.set(Math.max(-max, Math.min(max, dy)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <a
          href={href}
          aria-label={ariaLabel}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {content}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      aria-label={ariaLabel}
      className="inline-block"
    >
      {content}
    </div>
  );
}
