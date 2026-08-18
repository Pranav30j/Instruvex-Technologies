import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';

const EASE = [0.16, 1, 0.3, 1] as const;

type Capability = {
  number: string;
  title: string;
  description: string;
  visual: ReactNode;
};

// --- Visual mockups for each capability ---------------------------------------

function DigitalPlatformsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-[280px] h-[180px] bg-ink-800 border border-white/[0.08] rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="h-7 bg-ink-850 border-b border-white/[0.06] flex items-center px-3 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-ink-500" />
          <div className="w-2 h-2 rounded-full bg-ink-500" />
          <div className="w-2 h-2 rounded-full bg-ink-500" />
          <div className="ml-3 flex-1 h-3 bg-ink-750 rounded-sm" />
        </div>
        <div className="p-4 space-y-3">
          <div className="h-6 w-3/4 bg-gradient-to-r from-violet-500/40 to-violet-500/10 rounded" />
          <div className="h-2 w-full bg-ink-600 rounded" />
          <div className="h-2 w-5/6 bg-ink-600 rounded" />
          <div className="flex gap-2 mt-4">
            <div className="h-8 w-20 bg-violet-600/60 rounded" />
            <div className="h-8 w-16 bg-ink-600 rounded" />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="h-12 bg-ink-750 rounded" />
            <div className="h-12 bg-ink-750 rounded" />
            <div className="h-12 bg-ink-750 rounded" />
          </div>
        </div>
        <motion.div
          className="absolute -right-12 -bottom-2 w-16 h-24 bg-ink-850 border border-white/[0.08] rounded-md flex flex-col items-center justify-center gap-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-8 h-1 bg-ink-500 rounded" />
          <div className="w-6 h-1 bg-ink-500 rounded" />
          <div className="w-7 h-1 bg-ink-500 rounded" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function BusinessSystemsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-[300px] h-[200px] bg-ink-800 border border-white/[0.08] rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="h-8 bg-ink-850 border-b border-white/[0.06] flex items-center px-3">
          <div className="h-2 w-20 bg-ink-500 rounded" />
          <div className="ml-auto flex gap-1.5">
            <div className="w-4 h-4 bg-ink-600 rounded" />
            <div className="w-4 h-4 bg-ink-600 rounded" />
          </div>
        </div>
        <div className="flex h-[calc(100%-2rem)]">
          <div className="w-14 bg-ink-850 border-r border-white/[0.04] p-2 space-y-2">
            <div className="h-3 w-full bg-violet-500/30 rounded" />
            <div className="h-3 w-full bg-ink-600 rounded" />
            <div className="h-3 w-full bg-ink-600 rounded" />
            <div className="h-3 w-full bg-ink-600 rounded" />
          </div>
          <div className="flex-1 p-3 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-14 bg-electric-400/10 border border-electric-400/20 rounded flex flex-col justify-end p-1.5">
                <div className="h-1.5 w-8 bg-electric-400/40 rounded" />
                <div className="h-3 w-12 bg-ink-300 rounded mt-1" />
              </div>
              <div className="h-14 bg-violet-400/10 border border-violet-400/20 rounded flex flex-col justify-end p-1.5">
                <div className="h-1.5 w-8 bg-violet-400/40 rounded" />
                <div className="h-3 w-10 bg-ink-300 rounded mt-1" />
              </div>
              <div className="h-14 bg-ink-700 border border-white/[0.06] rounded flex flex-col justify-end p-1.5">
                <div className="h-1.5 w-8 bg-ink-400 rounded" />
                <div className="h-3 w-8 bg-ink-300 rounded mt-1" />
              </div>
            </div>
            <div className="h-20 bg-ink-750 rounded p-2 flex items-end gap-1.5">
              {[40, 60, 35, 75, 50, 85, 45, 65].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-violet-600/40 to-violet-400/60 rounded-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: EASE }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function IntelligentWorkflowsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-[300px] h-[200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <svg viewBox="0 0 300 200" className="w-full h-full">
          {[
            { x: 30, y: 40, label: 'INPUT', color: 'rgba(56,184,255,0.3)' },
            { x: 130, y: 40, label: 'PROCESS', color: 'rgba(111,77,255,0.3)' },
            { x: 230, y: 40, label: 'AI', color: 'rgba(111,77,255,0.4)' },
            { x: 80, y: 140, label: 'VALIDATE', color: 'rgba(56,184,255,0.3)' },
            { x: 180, y: 140, label: 'OUTPUT', color: 'rgba(111,77,255,0.3)' },
          ].map((node, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: EASE }}
            >
              <rect x={node.x - 25} y={node.y - 14} width="50" height="28" rx="4" fill="rgba(18,18,27,0.9)" stroke={node.color} strokeWidth="1" />
              <text x={node.x} y={node.y + 3} fill="#9a9ab2" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.05em">
                {node.label}
              </text>
            </motion.g>
          ))}

          {[
            'M 55 40 L 105 40',
            'M 155 40 L 205 40',
            'M 230 54 Q 230 100 180 126',
            'M 155 140 L 105 140',
            'M 55 54 Q 55 100 80 126',
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="rgba(111,77,255,0.3)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: EASE }}
            />
          ))}

          {[
            { path: 'M 55 40 L 105 40', delay: 1.5, color: '#38b8ff' },
            { path: 'M 155 40 L 205 40', delay: 2, color: '#8f72ff' },
            { path: 'M 155 140 L 105 140', delay: 2.5, color: '#38b8ff' },
          ].map((flow, i) => (
            <motion.circle key={i} r="2.5" fill={flow.color} initial={{ opacity: 0 }}>
              <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${flow.delay}s`} path={flow.path} />
              <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin={`${flow.delay}s`} />
            </motion.circle>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

function ProductEngineeringVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-[280px] h-[200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <svg viewBox="0 0 280 200" className="w-full h-full">
          {[
            { y: 20, label: 'INTERFACE', w: 200, color: 'rgba(56,184,255,0.3)' },
            { y: 60, label: 'LOGIC', w: 220, color: 'rgba(111,77,255,0.3)' },
            { y: 100, label: 'DATA', w: 180, color: 'rgba(111,77,255,0.3)' },
            { y: 140, label: 'INFRASTRUCTURE', w: 240, color: 'rgba(56,184,255,0.3)' },
          ].map((layer, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: EASE }}
            >
              <rect
                x={(280 - layer.w) / 2}
                y={layer.y}
                width={layer.w}
                height="28"
                rx="4"
                fill="rgba(18,18,27,0.9)"
                stroke={layer.color}
                strokeWidth="1"
              />
              <text
                x={140}
                y={layer.y + 17}
                fill="#9a9ab2"
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
                letterSpacing="0.08em"
              >
                {layer.label}
              </text>
            </motion.g>
          ))}

          <motion.line
            x1="140"
            y1="48"
            x2="140"
            y2="140"
            stroke="rgba(111,77,255,0.4)"
            strokeWidth="1"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

// --- Capabilities data -------------------------------------------------------

const CAPABILITIES: Capability[] = [
  {
    number: '01',
    title: 'Digital Platforms',
    description:
      'High-performance websites, customer portals, and web applications designed around real business needs.',
    visual: <DigitalPlatformsVisual />,
  },
  {
    number: '02',
    title: 'Business Systems',
    description:
      'Custom software for operations, data, teams, customers, and internal workflows.',
    visual: <BusinessSystemsVisual />,
  },
  {
    number: '03',
    title: 'Intelligent Workflows',
    description:
      'Automation and AI integrated where they reduce repetitive work and improve decision-making.',
    visual: <IntelligentWorkflowsVisual />,
  },
  {
    number: '04',
    title: 'Product Engineering',
    description:
      'From architecture and interface design to development, deployment, and continuous improvement.',
    visual: <ProductEngineeringVisual />,
  },
];

// --- Section header (shared) -------------------------------------------------

function SectionHeader() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20 lg:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-xs font-mono tracking-widest text-ink-300 uppercase">/ What we build</span>
      </motion.div>
      <motion.h2
        className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tighter font-medium text-white max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      >
        What we build.
      </motion.h2>
    </div>
  );
}

// --- Desktop sticky scroll implementation -------------------------------------
// Single scroll container (4 × 100vh) with one sticky panel.
// AnimatePresence guarantees only one capability is ever visible — no overlap.

function DesktopCapabilities() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(3, Math.max(0, Math.floor(latest * 4)));
    setActiveIndex(idx);
  });

  const capability = CAPABILITIES[activeIndex];

  return (
    <section id="capabilities" ref={ref} className="relative hidden lg:block">
      <SectionHeader />

      {/* Progress line — spans the full scroll height */}
      <div className="relative">
        <div className="absolute left-16 top-0 bottom-0 w-px bg-white/[0.06]">
          <motion.div
            className="w-px bg-gradient-to-b from-violet-500 to-electric-400"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Scroll spacer: 4 viewport heights for 4 capabilities */}
        <div style={{ height: '400vh' }}>
          {/* Sticky panel — stays pinned, swaps content via AnimatePresence */}
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={activeIndex}
                className="absolute inset-0 max-w-[1400px] mx-auto w-full px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{ pointerEvents: 'none' }}
              >
                {/* Text */}
                <div className="order-2 lg:order-1" style={{ pointerEvents: 'auto' }}>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-5xl sm:text-6xl font-serif italic text-violet-400/40">
                      {capability.number}
                    </span>
                    <span className="text-xs font-mono tracking-widest text-ink-300 uppercase">
                      Capability {activeIndex + 1} of 4
                    </span>
                  </div>
                  <h3 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-tighter font-medium text-white mb-6">
                    {capability.title}
                  </h3>
                  <p className="text-lg text-ink-200 leading-relaxed max-w-md text-pretty">
                    {capability.description}
                  </p>
                </div>

                {/* Visual */}
                <div className="order-1 lg:order-2 relative h-[300px] sm:h-[400px]">
                  <div className="absolute inset-0 bg-grid-fine opacity-10 mask-radial-faded" />
                  {capability.visual}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Mobile stacked implementation -------------------------------------------

function MobileCapabilities() {
  return (
    <section id="capabilities" className="relative lg:hidden">
      <SectionHeader />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 pb-20">
        <div className="absolute left-6 top-[18rem] bottom-24 w-px bg-white/[0.06]" />

        <div className="space-y-24 sm:space-y-32">
          {CAPABILITIES.map((cap, idx) => (
            <MobileCapabilityItem key={cap.number} capability={cap} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileCapabilityItem({ capability, index }: { capability: Capability; index: number }) {
  return (
    <motion.div
      className="relative pl-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="absolute left-0 top-1.5 w-7 h-7 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full border border-violet-500/40"
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-4xl font-serif italic text-violet-400/40">
            {capability.number}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-ink-300 uppercase">
            Capability {index + 1} of 4
          </span>
        </div>
        <h3 className="text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.05] tracking-tighter font-medium text-white mb-4">
          {capability.title}
        </h3>
        <p className="text-base text-ink-200 leading-relaxed text-pretty">
          {capability.description}
        </p>
      </div>

      <div className="relative h-[240px] sm:h-[320px]">
        <div className="absolute inset-0 bg-grid-fine opacity-10 mask-radial-faded" />
        {capability.visual}
      </div>
    </motion.div>
  );
}

// --- Main export -------------------------------------------------------------

export function Capabilities() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileCapabilities />;
  }
  return <DesktopCapabilities />;
}
