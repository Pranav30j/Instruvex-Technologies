import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV_ITEMS = [
  { label: 'Capabilities', id: 'capabilities' },
  { label: 'Work', id: 'work' },
  { label: 'Approach', id: 'approach' },
  { label: 'About', id: 'about' },
];

export function Navigation({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  const handleNav = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/[0.06]'
              : 'bg-transparent border-b border-transparent'
          }`}
        >
          <nav className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => onNavigate('hero')}
              className="group flex items-center gap-2.5"
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                <div className="absolute inset-0 border border-violet-500/40 rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]" />
                <div className="w-2 h-2 bg-violet-500 rounded-sm" />
              </div>
              <span className="text-sm font-medium tracking-tight text-white">
                INSTRUVEX<span className="text-ink-300 font-normal"> TECHNOLOGIES</span>
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="group relative text-sm text-ink-200 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <button
                onClick={() => handleNav('discovery')}
                className="group inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-violet-600/90 hover:bg-violet-500 transition-colors duration-300"
              >
                Start a project
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-ink-100 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl md:hidden"
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="flex flex-col items-start gap-2 pt-24 px-6">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              className="text-3xl font-medium tracking-tight text-white hover:text-violet-300 transition-colors py-3"
              onClick={() => handleNav(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: mobileOpen ? 1 : 0,
                x: mobileOpen ? 0 : -20,
              }}
              transition={{ duration: 0.4, delay: mobileOpen ? 0.1 + i * 0.05 : 0 }}
            >
              {item.label}
            </motion.button>
          ))}
          <motion.button
            className="mt-6 inline-flex items-center gap-2 px-6 py-4 text-base font-medium text-white bg-violet-600"
            onClick={() => handleNav('discovery')}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: mobileOpen ? 1 : 0,
              y: mobileOpen ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: mobileOpen ? 0.3 : 0 }}
          >
            Start a project →
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
