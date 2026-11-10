"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { ChevronDown, Play } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { GlassOrb } from "@/components/ui/GlassOrb";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const personY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const bgX = useTransform(sx, (v) => v * -14);
  const bgYp = useTransform(sy, (v) => v * -10);
  const orbX = useTransform(sx, (v) => v * 34);
  const orbY = useTransform(sy, (v) => v * 26);
  const personX = useTransform(sx, (v) => v * 8);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden lg:min-h-[max(100svh,760px)]"
    >
      {/* Background artwork */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <motion.div style={{ x: bgX, y: bgYp }} className="absolute -inset-6">
          <Image
            src="/images/hero-bg.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
        </motion.div>
      </motion.div>
      {/* Legibility wash on the text side */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/30 to-transparent lg:bg-gradient-to-r lg:from-white/75 lg:via-white/25 lg:to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-mist to-transparent" />

      {/* Extra floating orbs (pointer-reactive) */}
      <motion.div aria-hidden style={{ x: orbX, y: orbY }} className="pointer-events-none absolute inset-0 -z-10">
        <GlassOrb className="top-[13%] left-[40%] hidden size-10 animate-float lg:block" ring />
        <GlassOrb className="bottom-[6%] left-[3%] size-6 animate-float-slow" />
        <GlassOrb className="top-[14%] right-[6%] hidden size-8 animate-float-slow sm:block" />
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="absolute size-1 animate-pulse rounded-full bg-violet/60"
            style={{
              top: `${12 + ((i * 37) % 70)}%`,
              left: `${38 + ((i * 53) % 58)}%`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center px-5 pt-32 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
        {/* Copy */}
        <motion.div
          style={{ y: textY, opacity: fade }}
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-2xl"
        >
          <motion.p variants={item} className="eyebrow flex items-center gap-4">
            {siteConfig.pillarsLine.map((p, i) => (
              <span key={p} className="flex items-center gap-4">
                {i > 0 && <span className="size-1.5 rounded-full bg-violet" />}
                {p}
              </span>
            ))}
          </motion.p>

          <h1 id="hero-title" className="mt-6 flex flex-wrap items-end gap-x-4 leading-none">
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
              className="font-script text-[6.5rem] text-ink sm:text-[8.5rem] lg:text-[8.5rem] xl:text-[9.5rem]"
            >
              Why
            </motion.span>
            <span className="relative inline-block pb-5">
              <motion.span
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ type: "spring", stiffness: 170, damping: 14, delay: 0.9 }}
                className="text-gradient inline-block origin-bottom-left pr-3 text-7xl font-extrabold tracking-tight italic sm:text-8xl lg:text-[5.5rem] xl:text-[6.5rem]"
                style={{ skewX: -10 }}
              >
                NOT?
              </motion.span>
              {/* Brush underline */}
              <svg aria-hidden viewBox="0 0 320 30" className="absolute -bottom-1 left-0 w-full overflow-visible" fill="none">
                <defs>
                  <linearGradient id="underline" x1="0" x2="1">
                    <stop offset="0" stopColor="#7b3cf2" />
                    <stop offset="1" stopColor="#c86af0" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M4 22 C 80 6, 200 4, 316 10"
                  stroke="url(#underline)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 1.35, ease }}
                />
              </svg>
            </span>
            <span className="sr-only">Reimagine what&apos;s possible.</span>
          </h1>

          <motion.p
            variants={item}
            aria-hidden
            className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[2.75rem] xl:text-5xl"
          >
            Reimagine What&apos;s Possible.
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            {siteConfig.description}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/journal" size="lg" arrow>
              Explore More
            </Button>
            <Button href="/videos" size="lg" variant="glass">
              <span className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-brand text-white">
                  <Play className="size-3.5 fill-current" />
                </span>
                Watch videos
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          style={{ y: personY, x: personX }}
          className="relative mt-6 h-[600px] self-end sm:h-[720px] lg:absolute lg:right-[3%] lg:bottom-0 lg:mt-0 lg:h-[95%] lg:w-[46%] xl:right-[6%]"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease }}
            className="relative h-full w-full"
          >
            {/* Soft ambient glow so she sits in the scene's light */}
            <div aria-hidden className="absolute top-[8%] left-1/2 h-[60%] w-[55%] -translate-x-1/2 rounded-full bg-orchid/20 blur-[80px]" />
            {/* Background-removed cutout of natalie-portrait.webp (natural colours).
                The bottom fades into the glass floor like the sample artwork. */}
            <Image
              src="/images/natalie-portrait-cutout.webp"
              alt="Natalie Sit smiling, wearing a white linen shirt and green trousers"
              fill
              priority
              quality={95}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#pillars"
        aria-label="Scroll to content"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase lg:flex"
      >
        Scroll
        <ChevronDown className="size-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
