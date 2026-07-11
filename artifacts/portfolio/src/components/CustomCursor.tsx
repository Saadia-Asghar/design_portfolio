import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.3 });

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
      const interactive =
        !!t?.closest?.(
          "a, button, [role='button'], input, textarea, select, [data-cursor='hover']"
        );
      setHovering(interactive);
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
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
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-ink" />
      </motion.div>

      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[99] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            scale: hovering ? 3.2 : 1,
            backgroundColor: hovering ? "rgba(246,241,231,0.9)" : "rgba(246,241,231,0)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="h-10 w-10 rounded-full border border-paper/90"
        />
      </motion.div>
    </>
  );
}
