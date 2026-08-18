import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

export function CoreStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const line1Opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.4, 0.55], [0.15, 1, 1, 0.15]);
  const line2Opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.55, 0.7], [0.15, 1, 1, 0.15]);
  const line2X = useTransform(scrollYProgress, [0.25, 0.4], [40, 0]);
  const supportingOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.7, 0.85], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-grid-fine opacity-20" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <motion.h2
          className="text-[clamp(2.2rem,6vw,5.5rem)] leading-[1.05] tracking-tighter font-medium text-white"
        >
          <motion.span className="block" style={{ opacity: line1Opacity }}>
            Most businesses don't need
          </motion.span>
          <motion.span
            className="block text-gradient-violet italic font-serif"
            style={{ opacity: line2Opacity, x: line2X }}
          >
            more software.
          </motion.span>
          <motion.span
            className="block mt-4"
            style={{ opacity: line2Opacity }}
          >
            They need the <span className="text-gradient-electric italic font-serif">right</span> software.
          </motion.span>
        </motion.h2>

        <motion.p
          className="mt-12 max-w-xl mx-auto text-lg text-ink-200 leading-relaxed text-pretty"
          style={{ opacity: supportingOpacity }}
        >
          We start with the problem, the people using the system, and the outcome it needs to produce.
        </motion.p>
      </div>

      {/* Decorative side lines */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="h-32 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent" />
      </motion.div>
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="h-32 w-px bg-gradient-to-b from-transparent via-electric-400/30 to-transparent" />
      </motion.div>
    </section>
  );
}
