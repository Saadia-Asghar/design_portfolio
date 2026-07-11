import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.25 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest?.("a, button, [role='button'], input, textarea, select"));
    };
    const leave = () => { x.set(-100); y.set(-100); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      document.body.style.cursor = "";
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[200] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ scale: hovering ? 2.5 : 1, opacity: hovering ? 0.7 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{
          width: 12,
          height: 12,
          border: "1px solid var(--c-border)",
          background: hovering ? "var(--c-fg)" : "transparent",
          mixBlendMode: "difference",
        }}
      />
    </motion.div>
  );
}
