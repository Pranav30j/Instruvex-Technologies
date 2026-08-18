import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const STAGES = [
  {
    number: '01',
    title: 'Understand.',
    description:
      'We define the problem, users, requirements, and constraints before deciding what to build.',
  },
  {
    number: '02',
    title: 'Structure.',
    description: 'We map the system, user experience, and technical foundation.',
  },
  {
    number: '03',
    title: 'Build.',
    description: 'We design, engineer, test, and integrate the product.',
  },
  {
    number: '04',
    title: 'Improve.',
    description:
      'After launch, we continue refining the system based on how it is actually used.',
  },
];

export function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="approach" ref={ref} className="relative py-24 sm:py-32">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xs font-mono tracking-widest text-ink-300 uppercase">/ How we work</span>
        </motion.div>
        <motion.h2
          className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tighter font-medium text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          How we work.
        </motion.h2>
      </div>

      {/* Stages */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-px bg-white/[0.06]">
            <motion.div
              className="w-px bg-gradient-to-b from-violet-500 via-electric-400 to-violet-500"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12 sm:space-y-24">
            {STAGES.map((stage, idx) => (
              <StageItem key={stage.number} stage={stage} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StageItem({ stage, index }: { stage: (typeof STAGES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });

  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const dotColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['rgba(107,107,136,0.4)', 'rgba(111,77,255,1)', 'rgba(107,107,136,0.4)']
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);

  return (
    <motion.div
      ref={ref}
      className="relative pl-12 sm:pl-16"
    >
      {/* Dot */}
      <motion.div
        className="absolute left-0 top-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
        style={{ scale: dotScale }}
      >
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        <motion.div
          className="absolute w-3 h-3 rounded-full border"
          style={{ borderColor: dotColor }}
          animate={{ scale: [1, 2], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity: textOpacity }}>
        <motion.span
          className="block text-7xl sm:text-8xl font-serif italic text-violet-400/20 mb-2"
          style={{ opacity: numberOpacity }}
        >
          {stage.number}
        </motion.span>
        <h3 className="text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] tracking-tighter font-medium text-white mb-4">
          {stage.title}
        </h3>
        <p className="text-lg text-ink-200 leading-relaxed max-w-lg text-pretty">
          {stage.description}
        </p>
      </motion.div>

      {/* Connector to previous — visual continuity */}
      {index > 0 && (
        <motion.div
          className="absolute left-[15px] sm:left-[19px] -top-16 sm:-top-24 w-px h-16 sm:h-24 bg-gradient-to-b from-violet-500/20 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.div>
  );
}
