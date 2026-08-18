import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useIsMobile } from '@/lib/useIsMobile';

const EASE = [0.16, 1, 0.3, 1] as const;

// --- Desktop hero visualization (full parallax system) ------------------------

function SignalPoint({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="2"
      fill="#8f72ff"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.3, 1] }}
      transition={{ duration: 3, delay, repeat: Infinity, repeatType: 'reverse' }}
    />
  );
}

function AnimatedLine({
  d,
  duration = 2,
  drawDelay = 0,
}: {
  d: string;
  duration?: number;
  drawDelay?: number;
}) {
  return (
    <motion.path
      d={d}
      stroke="rgba(111, 77, 255, 0.25)"
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration, delay: drawDelay, ease: EASE },
        opacity: { duration: 0.4, delay: drawDelay },
      }}
    />
  );
}

function SystemNode({
  x,
  y,
  label,
  delay,
  children,
}: {
  x: string;
  y: string;
  label: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      <rect x={x} y={y} width="120" height="64" rx="6" fill="rgba(18,18,27,0.9)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {children}
      <text x={parseFloat(x) + 12} y={parseFloat(y) + 18} fill="#9a9ab2" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em">
        {label}
      </text>
    </motion.g>
  );
}

function DesktopHeroVisualization({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const layer1X = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const layer1Y = useTransform(mouseY, [-0.5, 0.5], [-6, 6]);
  const layer2X = useTransform(mouseX, [-0.5, 0.5], [-16, 16]);
  const layer2Y = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);
  const layer3X = useTransform(mouseX, [-0.5, 0.5], [-24, 24]);
  const layer3Y = useTransform(mouseY, [-0.5, 0.5], [-18, 18]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full max-w-[900px] max-h-[700px]"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        {/* Layer 1 — background grid and signals */}
        <motion.g style={{ x: layer1X, y: layer1Y }}>
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.2 }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`h${i}`} x1="100" y1={100 + i * 50} x2="700" y2={100 + i * 50} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            ))}
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={`v${i}`} x1={100 + i * 50} y1="100" x2={100 + i * 50} y2="500" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            ))}
          </motion.g>

          <SignalPoint delay={0.5} x="150" y="150" />
          <SignalPoint delay={1.2} x="650" y="200" />
          <SignalPoint delay={0.8} x="400" y="100" />
          <SignalPoint delay={1.5} x="200" y="450" />
          <SignalPoint delay={2} x="600" y="480" />
        </motion.g>

        {/* Layer 2 — connection lines */}
        <motion.g style={{ x: layer2X, y: layer2Y }}>
          <AnimatedLine d="M 220 250 Q 300 200 400 250 T 580 250" drawDelay={1.5} duration={1.5} />
          <AnimatedLine d="M 220 350 Q 350 400 400 350 T 580 350" drawDelay={1.8} duration={1.5} />
          <AnimatedLine d="M 400 250 L 400 350" drawDelay={2.2} duration={0.8} />
          <AnimatedLine d="M 280 300 L 520 300" drawDelay={2.5} duration={1} />

          <motion.circle r="3" fill="#38b8ff" initial={{ opacity: 0 }}>
            <animateMotion dur="3s" repeatCount="indefinite" begin="3s" path="M 220 250 Q 300 200 400 250 T 580 250" />
            <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="3s" />
          </motion.circle>
          <motion.circle r="3" fill="#8f72ff" initial={{ opacity: 0 }}>
            <animateMotion dur="3.5s" repeatCount="indefinite" begin="3.5s" path="M 220 350 Q 350 400 400 350 T 580 350" />
            <animate attributeName="opacity" values="0;1;1;0" dur="3.5s" repeatCount="indefinite" begin="3.5s" />
          </motion.circle>
        </motion.g>

        {/* Layer 3 — system nodes */}
        <motion.g style={{ x: layer3X, y: layer3Y }}>
          <SystemNode x="160" y="218" label="WEB" delay={1}>
            <rect x="172" y="234" width="96" height="4" rx="2" fill="rgba(111,77,255,0.4)" />
            <rect x="172" y="244" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
            <rect x="172" y="252" width="76" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
            <rect x="172" y="260" width="44" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
          </SystemNode>

          <SystemNode x="520" y="218" label="DASH" delay={1.3}>
            <rect x="532" y="234" width="40" height="20" rx="2" fill="rgba(56,184,255,0.15)" stroke="rgba(56,184,255,0.3)" strokeWidth="0.5" />
            <rect x="580" y="240" width="44" height="14" rx="2" fill="rgba(111,77,255,0.15)" stroke="rgba(111,77,255,0.3)" strokeWidth="0.5" />
            <rect x="532" y="262" width="92" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
            <rect x="532" y="270" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
          </SystemNode>

          <SystemNode x="160" y="318" label="AI" delay={1.6}>
            <circle cx="220" cy="350" r="12" fill="none" stroke="rgba(111,77,255,0.4)" strokeWidth="1" />
            <circle cx="220" cy="350" r="6" fill="rgba(111,77,255,0.2)" />
            <rect x="200" y="334" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
          </SystemNode>

          <SystemNode x="520" y="318" label="FLOW" delay={1.9}>
            <rect x="532" y="334" width="20" height="20" rx="3" fill="rgba(56,184,255,0.15)" stroke="rgba(56,184,255,0.3)" strokeWidth="0.5" />
            <rect x="560" y="334" width="20" height="20" rx="3" fill="rgba(111,77,255,0.15)" stroke="rgba(111,77,255,0.3)" strokeWidth="0.5" />
            <line x1="552" y1="344" x2="560" y2="344" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <rect x="588" y="334" width="20" height="20" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="580" y1="344" x2="588" y2="344" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </SystemNode>

          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.5, ease: EASE }}
          >
            <circle cx="400" cy="300" r="4" fill="#6f4dff" />
            <motion.circle
              cx="400"
              cy="300"
              r="12"
              fill="none"
              stroke="rgba(111,77,255,0.3)"
              strokeWidth="1"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}

// --- Mobile hero visualization (simplified, larger, behind text) --------------

function MobileHeroVisualization() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-50">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[420px] max-h-[420px]"
        fill="none"
      >
        {/* Simplified grid */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`mh${i}`} x1="60" y1={60 + i * 50} x2="340" y2={60 + i * 50} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`mv${i}`} x1={60 + i * 50} y1="60" x2={60 + i * 50} y2="340" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
        </motion.g>

        {/* Signal points */}
        <motion.circle cx="100" cy="100" r="2.5" fill="#8f72ff" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.3, 1] }} transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }} />
        <motion.circle cx="300" cy="120" r="2.5" fill="#38b8ff" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.3, 1] }} transition={{ duration: 3, delay: 1.2, repeat: Infinity, repeatType: 'reverse' }} />
        <motion.circle cx="200" cy="80" r="2.5" fill="#8f72ff" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.3, 1] }} transition={{ duration: 3, delay: 0.8, repeat: Infinity, repeatType: 'reverse' }} />

        {/* Connection lines — fewer, larger */}
        <motion.path
          d="M 120 180 Q 180 140 200 180 T 280 180"
          stroke="rgba(111, 77, 255, 0.3)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 1.5, delay: 1.2, ease: EASE }, opacity: { duration: 0.4, delay: 1.2 } }}
        />
        <motion.path
          d="M 120 260 Q 180 300 200 260 T 280 260"
          stroke="rgba(56, 184, 255, 0.25)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 1.5, delay: 1.5, ease: EASE }, opacity: { duration: 0.4, delay: 1.5 } }}
        />
        <motion.path
          d="M 200 180 L 200 260"
          stroke="rgba(111, 77, 255, 0.3)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.8, delay: 1.8, ease: EASE }, opacity: { duration: 0.4, delay: 1.8 } }}
        />

        {/* Data pulses */}
        <motion.circle r="3" fill="#38b8ff" initial={{ opacity: 0 }}>
          <animateMotion dur="3s" repeatCount="indefinite" begin="2.5s" path="M 120 180 Q 180 140 200 180 T 280 180" />
          <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="2.5s" />
        </motion.circle>

        {/* System nodes — 3 simplified, larger */}
        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.8, ease: EASE }}>
          <rect x="80" y="150" width="80" height="44" rx="6" fill="rgba(18,18,27,0.85)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="92" y="164" width="56" height="3" rx="1.5" fill="rgba(111,77,255,0.5)" />
          <rect x="92" y="172" width="40" height="2.5" rx="1" fill="rgba(255,255,255,0.15)" />
          <rect x="92" y="180" width="48" height="2.5" rx="1" fill="rgba(255,255,255,0.1)" />
          <text x="92" y="142" fill="#9a9ab2" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em">WEB</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1.1, ease: EASE }}>
          <rect x="240" y="150" width="80" height="44" rx="6" fill="rgba(18,18,27,0.85)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="252" y="164" width="28" height="14" rx="2" fill="rgba(56,184,255,0.2)" stroke="rgba(56,184,255,0.35)" strokeWidth="0.5" />
          <rect x="284" y="168" width="30" height="10" rx="2" fill="rgba(111,77,255,0.2)" stroke="rgba(111,77,255,0.35)" strokeWidth="0.5" />
          <rect x="252" y="184" width="56" height="2.5" rx="1" fill="rgba(255,255,255,0.1)" />
          <text x="252" y="142" fill="#9a9ab2" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em">DASH</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1.4, ease: EASE }}>
          <rect x="80" y="250" width="80" height="44" rx="6" fill="rgba(18,18,27,0.85)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="120" cy="272" r="10" fill="none" stroke="rgba(111,77,255,0.5)" strokeWidth="1.5" />
          <circle cx="120" cy="272" r="5" fill="rgba(111,77,255,0.3)" />
          <text x="92" y="242" fill="#9a9ab2" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em">AI</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1.7, ease: EASE }}>
          <rect x="240" y="250" width="80" height="44" rx="6" fill="rgba(18,18,27,0.85)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="252" y="264" width="14" height="14" rx="2" fill="rgba(56,184,255,0.2)" stroke="rgba(56,184,255,0.35)" strokeWidth="0.5" />
          <rect x="272" y="264" width="14" height="14" rx="2" fill="rgba(111,77,255,0.2)" stroke="rgba(111,77,255,0.35)" strokeWidth="0.5" />
          <line x1="266" y1="271" x2="272" y2="271" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <rect x="292" y="264" width="14" height="14" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <line x1="286" y1="271" x2="292" y2="271" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <text x="252" y="242" fill="#9a9ab2" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em">FLOW</text>
        </motion.g>

        {/* Central hub */}
        <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 2, ease: EASE }}>
          <circle cx="200" cy="220" r="5" fill="#6f4dff" />
          <motion.circle
            cx="200"
            cy="220"
            r="14"
            fill="none"
            stroke="rgba(111,77,255,0.4)"
            strokeWidth="1"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>
      </svg>
    </div>
  );
}

// --- Hero text animation ------------------------------------------------------

function HeroHeadline({ isMobile }: { isMobile: boolean }) {
  const lines = isMobile
    ? [
        [{ text: 'Technology' }],
        [{ text: 'built around' }],
        [{ text: 'the way your' }],
        [{ text: 'business' }],
        [{ text: 'actually works.', className: 'text-gradient-violet italic font-serif' }],
      ]
    : [
        [{ text: 'Technology' }],
        [{ text: 'built around' }],
        [{ text: 'the way your' }],
        [{ text: 'business' }, { text: 'actually works.', className: 'text-gradient-violet italic font-serif' }],
      ];

  return (
    <h1 className={`font-medium text-white tracking-tighter leading-[1.05] ${isMobile ? 'text-[clamp(2.25rem,9vw,4.5rem)]' : 'text-[clamp(2.5rem,7vw,6rem)]'}`}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: 0.4 + lineIdx * 0.12, ease: EASE }}
          >
            {line.map((part, partIdx) => (
              <span key={partIdx} className={part.className}>
                {part.text}
              </span>
            ))}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

// --- Main Hero component ------------------------------------------------------

export function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven transitions
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const vizScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const vizOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.8, 0]);
  const vizY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Mouse parallax — desktop only
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 1);
      mouseY.set((e.clientY / innerHeight - 0.5) * 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid mask-radial-faded opacity-40" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(111,77,255,0.08) 0%, transparent 60%)',
          x: '-50%',
          y: '-50%',
        }}
      />

      {/* Visualization layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ scale: vizScale, opacity: vizOpacity, y: vizY }}
      >
        {isMobile ? (
          <MobileHeroVisualization />
        ) : (
          <DesktopHeroVisualization mouseX={smoothMouseX} mouseY={smoothMouseY} />
        )}
      </motion.div>

      {/* Text content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="max-w-4xl">
          {/* Phase indicator */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-soft" />
              <span className="text-xs font-mono tracking-wider text-ink-300 uppercase">Systems Online</span>
            </div>
            <div className="h-px w-12 bg-gradient-to-r from-violet-500/40 to-transparent" />
          </motion.div>

          <HeroHeadline isMobile={isMobile} />

          <motion.p
            className="mt-8 max-w-xl text-base sm:text-lg text-ink-200 leading-relaxed text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          >
            We design and engineer websites, software platforms, intelligent workflows, and AI-powered
            systems for businesses that need more than an off-the-shelf solution.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
          >
            <button
              onClick={() => onNavigate('discovery')}
              className="group relative inline-flex items-center gap-2 px-7 py-4 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 transition-colors duration-300"
            >
              Discuss a project
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('capabilities')}
              className="group inline-flex items-center gap-2 px-2 py-4 text-sm font-medium text-ink-200 hover:text-white transition-colors duration-300"
            >
              Explore our capabilities
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] font-mono tracking-widest text-ink-300 uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-violet-400/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
