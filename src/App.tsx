import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { CoreStatement } from '@/components/sections/CoreStatement';
import { Capabilities } from '@/components/sections/Capabilities';
import { FragmentedToConnected } from '@/components/sections/FragmentedToConnected';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { Differentiator } from '@/components/sections/Differentiator';
import { ProjectDiscovery } from '@/components/sections/ProjectDiscovery';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroComplete(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-ink-950 text-ink-100">
      <ScrollProgress />
      <Navigation onNavigate={handleNavigate} />

      <main>
        <Hero onNavigate={handleNavigate} />
        <CoreStatement />
        <Capabilities />
        <FragmentedToConnected />
        <SelectedWork />
        <HowWeWork />
        <Differentiator />
        <ProjectDiscovery />
        <FinalCTA onNavigate={handleNavigate} />
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Intro overlay — fades after hero animation completes */}
      <IntroOverlay visible={!introComplete} />
    </div>
  );
}

function IntroOverlay({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink-950 pointer-events-none flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 border border-violet-500/40 rotate-45"
            animate={{ rotate: [45, 225, 45] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="w-2.5 h-2.5 bg-violet-500 rounded-sm"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-sm font-mono tracking-widest text-ink-200 uppercase">
          Instruvex Technologies
        </span>
      </motion.div>
    </motion.div>
  );
}

export default App;
