import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

export function FinalCTA({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-32">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(111,77,255,0.06) 0%, transparent 60%)',
          x: '-50%',
          y: '-50%',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <motion.h2
          className="text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] tracking-tighter font-medium text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          Have a problem
          <span className="block text-gradient-violet italic font-serif">worth solving?</span>
        </motion.h2>

        <motion.p
          className="mt-8 text-lg text-ink-200 text-pretty"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          Tell us what you are working on.
        </motion.p>

        <motion.button
          onClick={() => onNavigate('discovery')}
          className="group mt-12 inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-violet-600 hover:bg-violet-500 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start a conversation
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>
    </section>
  );
}
