import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const FOOTER_NAV = [
  { label: 'Capabilities', id: 'capabilities' },
  { label: 'Work', id: 'work' },
  { label: 'Approach', id: 'approach' },
  { label: 'Start a project', id: 'discovery' },
];

const FOOTER_CAPABILITIES = [
  'Digital Platforms',
  'Business Systems',
  'Intelligent Workflows',
  'Product Engineering',
];

export function Footer({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <footer id="about" className="relative border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20">
        {/* Top section */}
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <div className="absolute inset-0 border border-violet-500/40 rotate-45" />
                <div className="w-2 h-2 bg-violet-500 rounded-sm" />
              </div>
              <span className="text-sm font-medium tracking-tight text-white">
                INSTRUVEX<span className="text-ink-300 font-normal"> TECHNOLOGIES</span>
              </span>
            </div>
            <p className="text-ink-300 text-sm leading-relaxed max-w-xs text-pretty">
              We design and engineer digital systems for businesses that need more than an
              off-the-shelf solution.
            </p>
            <p className="mt-6 text-xs font-mono text-ink-400 tracking-wider uppercase">
              A division of Instruvex
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-ink-400 uppercase mb-5">Navigation</h4>
            <ul className="space-y-3">
              {FOOTER_NAV.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="group text-sm text-ink-200 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                    <span className="block h-px w-0 bg-violet-400 transition-all duration-300 group-hover:w-full mt-1" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-ink-400 uppercase mb-5">Capabilities</h4>
            <ul className="space-y-3">
              {FOOTER_CAPABILITIES.map((cap) => (
                <li key={cap}>
                  <button
                    onClick={() => onNavigate('capabilities')}
                    className="group text-sm text-ink-200 hover:text-white transition-colors duration-300"
                  >
                    {cap}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-ink-400 uppercase mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@technologies.instruvex.in"
                  className="text-sm text-ink-200 hover:text-white transition-colors duration-300"
                >
                  hello@technologies.instruvex.in
                </a>
              </li>
              <li className="text-sm text-ink-300">technologies.instruvex.in</li>
            </ul>
            <div className="mt-5 flex gap-3">
              {['LinkedIn', 'X', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-ink-300 hover:text-white transition-colors duration-300 border border-white/[0.08] rounded-full px-3 py-1.5"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Instruvex Technologies
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success/60" />
            <span className="text-xs font-mono text-ink-400 tracking-wider uppercase">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
