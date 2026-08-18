import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';

const EASE = [0.16, 1, 0.3, 1] as const;

// --- Desktop implementation (sticky scroll narrative) -----------------------

function DesktopDifferentiator() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [0, 1, 1, 0.3]);
  const headlineScale = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [0.95, 1, 1, 1.02]);

  const statement1Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0.3]);
  const statement2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0.3]);
  const statement3Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.55, 0.65], [0, 1, 1, 0.3]);

  const transitionOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const transitionY = useTransform(scrollYProgress, [0.55, 0.65], [40, 0]);

  const finalOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0.5]);
  const supportingOpacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 1], [0, 1, 1, 0.5]);

  return (
    <section ref={ref} className="relative min-h-[250vh] hidden lg:block">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-5" />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <motion.h2
            className="text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] tracking-tighter font-medium text-white text-center"
            style={{ opacity: headlineOpacity, scale: headlineScale }}
          >
            Ordinary is
            <span className="text-gradient-violet italic font-serif"> expensive.</span>
          </motion.h2>

          <div className="mt-16 space-y-6">
            <motion.p className="text-xl sm:text-2xl text-ink-200 text-center font-light" style={{ opacity: statement1Opacity }}>
              A forgettable website costs attention.
            </motion.p>
            <motion.p className="text-xl sm:text-2xl text-ink-200 text-center font-light" style={{ opacity: statement2Opacity }}>
              A poorly designed system costs time.
            </motion.p>
            <motion.p className="text-xl sm:text-2xl text-ink-200 text-center font-light" style={{ opacity: statement3Opacity }}>
              Manual processes cost more than most businesses realise.
            </motion.p>
          </div>

          <motion.div
            className="my-20 flex items-center justify-center gap-4"
            style={{ opacity: transitionOpacity, y: transitionY }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-500/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500/40" />
          </motion.div>

          <motion.h2
            className="text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tighter font-medium text-white text-center"
            style={{ opacity: finalOpacity }}
          >
            We build for what happens
            <span className="block text-gradient-mix italic font-serif">after launch.</span>
          </motion.h2>

          <motion.p
            className="mt-8 text-lg text-ink-200 text-center max-w-xl mx-auto text-pretty"
            style={{ opacity: supportingOpacity }}
          >
            Performance, maintainability, usability, and scale are considered from the beginning.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// --- Mobile implementation (scroll-triggered reveals, no sticky) --------------

function MobileDifferentiator() {
  return (
    <section className="relative lg:hidden py-24 px-6">
      <div className="max-w-md mx-auto text-center">
        {/* First statement */}
        <motion.h2
          className="text-[clamp(2.25rem,9vw,4rem)] leading-[1.05] tracking-tighter font-medium text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Ordinary is
          <span className="text-gradient-violet italic font-serif"> expensive.</span>
        </motion.h2>

        {/* Supporting statements */}
        <div className="mt-12 space-y-6">
          {[
            'A forgettable website costs attention.',
            'A poorly designed system costs time.',
            'Manual processes cost more than most businesses realise.',
          ].map((statement, i) => (
            <motion.p
              key={i}
              className="text-lg text-ink-200 text-center font-light text-pretty"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
            >
              {statement}
            </motion.p>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="my-16 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-500/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500/40" />
        </motion.div>

        {/* Final statement */}
        <motion.h2
          className="text-[clamp(1.75rem,7vw,3rem)] leading-[1.05] tracking-tighter font-medium text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          We build for what happens
          <span className="block text-gradient-mix italic font-serif">after launch.</span>
        </motion.h2>

        <motion.p
          className="mt-6 text-base text-ink-200 text-center max-w-sm mx-auto text-pretty"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          Performance, maintainability, usability, and scale are considered from the beginning.
        </motion.p>
      </div>
    </section>
  );
}

// --- Main export -------------------------------------------------------------

export function Differentiator() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileDifferentiator />;
  }
  return <DesktopDifferentiator />;
}
