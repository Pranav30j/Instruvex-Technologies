import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';

const EASE = [0.16, 1, 0.3, 1] as const;

const FRAGMENTED_ITEMS = [
  { label: 'Disconnected tools', x: '5%', y: '10%' },
  { label: 'Manual work', x: '70%', y: '15%' },
  { label: 'Scattered data', x: '15%', y: '60%' },
  { label: 'No visibility', x: '75%', y: '65%' },
  { label: 'Repeated steps', x: '40%', y: '35%' },
];

// --- Desktop implementation (sticky scroll transformation) -------------------

function DesktopFragmentedToConnected() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const progress = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 0.5, 1]);
  const fragmentOpacity = useTransform(progress, [0, 0.5, 1], [1, 0.5, 0]);
  const supportingOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const connectedOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.5, 1]);

  const titleY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="relative min-h-[200vh] hidden lg:block">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />

        <motion.div
          className="relative z-10 text-center mb-8"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] tracking-tighter font-medium text-white">
            From fragmented
            <span className="text-gradient-violet italic font-serif"> to connected.</span>
          </h2>
        </motion.div>

        <div className="relative w-full max-w-3xl h-[400px] mx-auto">
          {/* Fragmented state */}
          <motion.div className="absolute inset-0" style={{ opacity: fragmentOpacity }}>
            {FRAGMENTED_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: item.x, top: item.y }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              >
                <div className="px-4 py-2.5 bg-ink-800 border border-white/[0.08] rounded-md text-sm text-ink-200 whitespace-nowrap">
                  {item.label}
                </div>
              </motion.div>
            ))}

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.line x1="15" y1="20" x2="50" y2="45" stroke="rgba(242,85,95,0.3)" strokeWidth="0.3" strokeDasharray="2 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} />
              <motion.line x1="80" y1="25" x2="50" y2="45" stroke="rgba(242,85,95,0.3)" strokeWidth="0.3" strokeDasharray="2 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} />
              <motion.line x1="25" y1="70" x2="50" y2="45" stroke="rgba(242,85,95,0.3)" strokeWidth="0.3" strokeDasharray="2 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} />
              <motion.line x1="85" y1="75" x2="50" y2="45" stroke="rgba(242,85,95,0.3)" strokeWidth="0.3" strokeDasharray="2 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} />
            </svg>
          </motion.div>

          {/* Connected state */}
          <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: connectedOpacity }}>
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <motion.circle cx="200" cy="150" r="6" fill="#6f4dff" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} />
              <motion.circle cx="200" cy="150" r="16" fill="none" stroke="rgba(111,77,255,0.4)" strokeWidth="1" animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 3, repeat: Infinity }} />

              {[
                { x: 80, y: 60, label: 'TOOLS' },
                { x: 320, y: 60, label: 'DATA' },
                { x: 80, y: 240, label: 'WORK' },
                { x: 320, y: 240, label: 'INSIGHTS' },
              ].map((node, i) => (
                <motion.g key={i} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}>
                  <rect x={node.x - 35} y={node.y - 14} width="70" height="28" rx="4" fill="rgba(18,18,27,0.9)" stroke="rgba(56,184,255,0.3)" strokeWidth="1" />
                  <text x={node.x} y={node.y + 3} fill="#9a9ab2" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.08em">{node.label}</text>
                </motion.g>
              ))}

              {['M 115 60 Q 160 100 200 150', 'M 285 60 Q 240 100 200 150', 'M 115 240 Q 160 200 200 150', 'M 285 240 Q 240 200 200 150'].map((d, i) => (
                <motion.path key={i} d={d} stroke="rgba(111,77,255,0.4)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: EASE }} />
              ))}

              {[
                { path: 'M 115 60 Q 160 100 200 150', delay: 1.5, color: '#38b8ff' },
                { path: 'M 285 60 Q 240 100 200 150', delay: 2, color: '#8f72ff' },
                { path: 'M 115 240 Q 160 200 200 150', delay: 2.5, color: '#38b8ff' },
                { path: 'M 285 240 Q 240 200 200 150', delay: 3, color: '#8f72ff' },
              ].map((flow, i) => (
                <motion.circle key={i} r="2.5" fill={flow.color} initial={{ opacity: 0 }}>
                  <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${flow.delay}s`} path={flow.path} />
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin={`${flow.delay}s`} />
                </motion.circle>
              ))}
            </svg>
          </motion.div>
        </div>

        <motion.p
          className="relative z-10 mt-12 text-lg text-ink-200 text-center max-w-md text-pretty"
          style={{ opacity: supportingOpacity }}
        >
          Clearer workflows. Less repetition. Better visibility.
        </motion.p>
      </div>
    </section>
  );
}

// --- Mobile implementation (simplified, no sticky, normal flow) ---------------

function MobileFragmentedToConnected() {
  return (
    <section className="relative lg:hidden py-24 px-6">
      <div className="max-w-md mx-auto text-center">
        <motion.h2
          className="text-[clamp(2rem,7vw,3.5rem)] leading-[1.05] tracking-tighter font-medium text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          From fragmented
          <span className="text-gradient-violet italic font-serif"> to connected.</span>
        </motion.h2>

        {/* Fragmented state */}
        <motion.div
          className="relative h-[280px] mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-3">
            {FRAGMENTED_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className="px-3 py-2 bg-ink-800 border border-white/[0.08] rounded-md text-xs text-ink-200"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                {item.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Arrow down */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-violet-500/40 to-electric-400/40" />
        </motion.div>

        {/* Connected state */}
        <motion.div
          className="relative h-[280px] mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <motion.circle cx="200" cy="150" r="6" fill="#6f4dff" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} />
            <motion.circle cx="200" cy="150" r="16" fill="none" stroke="rgba(111,77,255,0.4)" strokeWidth="1" animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 3, repeat: Infinity }} />

            {[
              { x: 80, y: 60, label: 'TOOLS' },
              { x: 320, y: 60, label: 'DATA' },
              { x: 80, y: 240, label: 'WORK' },
              { x: 320, y: 240, label: 'INSIGHTS' },
            ].map((node, i) => (
              <motion.g key={i} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}>
                <rect x={node.x - 35} y={node.y - 14} width="70" height="28" rx="4" fill="rgba(18,18,27,0.9)" stroke="rgba(56,184,255,0.3)" strokeWidth="1" />
                <text x={node.x} y={node.y + 3} fill="#9a9ab2" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.08em">{node.label}</text>
              </motion.g>
            ))}

            {['M 115 60 Q 160 100 200 150', 'M 285 60 Q 240 100 200 150', 'M 115 240 Q 160 200 200 150', 'M 285 240 Q 240 200 200 150'].map((d, i) => (
              <motion.path key={i} d={d} stroke="rgba(111,77,255,0.4)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: EASE }} />
            ))}

            {[
              { path: 'M 115 60 Q 160 100 200 150', delay: 1.5, color: '#38b8ff' },
              { path: 'M 285 60 Q 240 100 200 150', delay: 2, color: '#8f72ff' },
              { path: 'M 115 240 Q 160 200 200 150', delay: 2.5, color: '#38b8ff' },
              { path: 'M 285 240 Q 240 200 200 150', delay: 3, color: '#8f72ff' },
            ].map((flow, i) => (
              <motion.circle key={i} r="2.5" fill={flow.color} initial={{ opacity: 0 }}>
                <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${flow.delay}s`} path={flow.path} />
                <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin={`${flow.delay}s`} />
              </motion.circle>
            ))}
          </svg>
        </motion.div>

        <motion.p
          className="text-lg text-ink-200 text-center max-w-sm mx-auto text-pretty"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Clearer workflows. Less repetition. Better visibility.
        </motion.p>
      </div>
    </section>
  );
}

// --- Main export -------------------------------------------------------------

export function FragmentedToConnected() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileFragmentedToConnected />;
  }
  return <DesktopFragmentedToConnected />;
}
