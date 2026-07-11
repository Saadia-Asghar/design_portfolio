import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  useMotionTemplate,
} from "framer-motion";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";

/* --------------------------- MagneticButton --------------------------- */

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.3 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------- Counter --------------------------- */

export function Counter({
  value,
  duration = 1.4,
  className,
  suffix = "",
  prefix = "",
}: {
  value: string | number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  const numeric = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
  const isPlus = String(value).includes("+");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, numeric, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, numeric, duration]);

  const formatted = Number.isInteger(numeric)
    ? Math.round(display).toLocaleString()
    : display.toFixed(1);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {isPlus ? "+" : ""}
      {suffix}
    </span>
  );
}

/* --------------------------- Marquee --------------------------- */

export function Marquee({
  items,
  speed = 30,
  reverse = false,
  className,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const row = [...items, ...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex gap-12 whitespace-nowrap will-change-transform"
        animate={{ x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            {item}
            <span className="text-ink/30">✺</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* --------------------------- RevealText --------------------------- */

type RevealTag = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "em" | "div";

export function RevealText({
  text,
  className,
  as = "span",
  once = true,
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: RevealTag;
  once?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const words = text.split(" ");
  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    <Tag className={className}>
      <span ref={ref} aria-label={text} className="inline">
        {words.map((w, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]"
            aria-hidden
          >
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.2, 0.8, 0.2, 1],
                delay: delay + i * 0.05,
              }}
              className="inline-block pr-[0.25em]"
            >
              {w}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* --------------------------- SectionLabel --------------------------- */

export function SectionLabel({
  roman,
  title,
  kicker,
  align = "left",
}: {
  roman: string;
  title: string;
  kicker?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start"
      } gap-4`}
    >
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-ink/60">
        <span className="font-serif-display text-sm not-italic">{roman}.</span>
        <span className="h-px w-10 bg-ink/40" />
        <span>{title}</span>
      </div>
      {kicker && (
        <h2 className="font-serif-display text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-tight max-w-4xl">
          {kicker}
        </h2>
      )}
    </div>
  );
}

/* --------------------------- LocalTime --------------------------- */

export function LocalTime({ timezone = "Asia/Karachi" }: { timezone?: string }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const update = () => {
      try {
        const t = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: timezone,
        }).format(new Date());
        setNow(t);
      } catch {
        setNow("");
      }
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [timezone]);
  if (!now) return null;
  return <span>{now} local</span>;
}

/* --------------------------- RotatingWord --------------------------- */

export function RotatingWord({
  words,
  interval = 2000,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!words.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  if (!words.length) return null;

  const widest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  return (
    <span
      className={`relative inline-flex items-baseline overflow-hidden align-baseline ${className ?? ""}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="invisible whitespace-nowrap">{widest}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0.24, 1] }}
          className="absolute left-0 top-0 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* --------------------------- Spotlight --------------------------- */

export function Spotlight({ className }: { className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const bg = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(201,162,75,0.14), transparent 60%)`;

  return (
    <motion.div
      ref={ref}
      style={{ background: bg }}
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      aria-hidden
    />
  );
}

// Keep forwardRef exported to avoid unused import warning
export { forwardRef };
