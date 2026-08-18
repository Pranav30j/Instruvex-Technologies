import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

type Project = {
  number: string;
  name: string;
  description: string;
  categories: string[];
  mockup: 'instruvex' | 'safal';
};

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'Instruvex',
    description: 'AI-powered education technology ecosystem.',
    categories: ['ERP', 'LMS', 'Assessments', 'AI'],
    mockup: 'instruvex',
  },
  {
    number: '02',
    name: 'Safal Marketing',
    description: 'Digital platform for FMCG distribution.',
    categories: ['Platform', 'Distribution', 'Analytics'],
    mockup: 'safal',
  },
];

function InstruvexMockup() {
  return (
    <div className="relative w-full h-full bg-ink-850 border border-white/[0.06] rounded-lg overflow-hidden">
      {/* Top bar */}
      <div className="h-9 bg-ink-800 border-b border-white/[0.06] flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-ink-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-ink-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-ink-500" />
        </div>
        <div className="ml-3 px-3 py-1 bg-ink-750 rounded text-[10px] text-ink-300 font-mono">instruvex.in/dashboard</div>
      </div>

      <div className="flex h-[calc(100%-2.25rem)]">
        {/* Sidebar */}
        <div className="w-16 sm:w-20 bg-ink-800 border-r border-white/[0.04] p-3 space-y-3">
          <div className="w-8 h-8 bg-violet-600/30 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-violet-400 rounded-sm" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-full h-2 bg-ink-600 rounded" />
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <div className="h-5 w-32 bg-ink-100 rounded" />
              <div className="h-2 w-48 bg-ink-500 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-7 w-20 bg-violet-600/40 rounded" />
              <div className="h-7 w-7 bg-ink-600 rounded-full" />
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Students', value: '12,847', color: 'violet' },
              { label: 'Courses', value: '348', color: 'electric' },
              { label: 'Assessments', value: '1,204', color: 'violet' },
              { label: 'AI Queries', value: '89.2k', color: 'electric' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="p-3 bg-ink-800 border border-white/[0.06] rounded-lg space-y-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className={`h-1.5 w-12 rounded ${stat.color === 'violet' ? 'bg-violet-400/50' : 'bg-electric-400/50'}`} />
                <div className="h-4 w-16 bg-ink-100 rounded" />
                <div className="h-2 w-10 bg-ink-400 rounded" />
              </motion.div>
            ))}
          </div>

          {/* Chart + AI panel */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 h-32 bg-ink-800 border border-white/[0.06] rounded-lg p-3">
              <div className="h-2 w-20 bg-ink-400 rounded mb-3" />
              <div className="h-20 flex items-end gap-1.5">
                {[45, 60, 35, 70, 55, 80, 65, 90, 50, 75, 85, 60].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-violet-600/30 to-violet-400/50 rounded-sm"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                  />
                ))}
              </div>
            </div>
            <div className="h-32 bg-ink-800 border border-violet-500/20 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-violet-500/40" />
                <div className="h-2 w-8 bg-ink-300 rounded" />
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-ink-600 rounded" />
                <div className="h-1.5 w-5/6 bg-ink-600 rounded" />
                <div className="h-1.5 w-4/6 bg-ink-600 rounded" />
              </div>
              <div className="mt-2 p-1.5 bg-violet-600/15 border border-violet-500/20 rounded">
                <div className="h-1.5 w-full bg-violet-400/40 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SafalMockup() {
  return (
    <div className="relative w-full h-full bg-ink-850 border border-white/[0.06] rounded-lg overflow-hidden">
      {/* Top bar */}
      <div className="h-9 bg-ink-800 border-b border-white/[0.06] flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-ink-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-ink-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-ink-500" />
        </div>
        <div className="ml-3 px-3 py-1 bg-ink-750 rounded text-[10px] text-ink-300 font-mono">safal.in/orders</div>
      </div>

      <div className="flex h-[calc(100%-2.25rem)]">
        {/* Sidebar */}
        <div className="w-16 sm:w-20 bg-ink-800 border-r border-white/[0.04] p-3 space-y-3">
          <div className="w-8 h-8 bg-electric-400/30 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-electric-400 rounded-sm" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-full h-2 bg-ink-600 rounded" />
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4 sm:p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <div className="h-5 w-28 bg-ink-100 rounded" />
              <div className="h-2 w-40 bg-ink-500 rounded" />
            </div>
            <div className="h-7 w-24 bg-electric-400/40 rounded" />
          </div>

          {/* Order table */}
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2 pb-2 border-b border-white/[0.04]">
              {['Order', 'Retailer', 'Value', 'Status'].map((h, i) => (
                <div key={i} className="h-2 bg-ink-400 rounded" style={{ width: '60%' }} />
              ))}
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-4 gap-2 items-center py-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="h-3 w-12 bg-ink-300 rounded" />
                <div className="h-3 w-20 bg-ink-500 rounded" />
                <div className="h-3 w-14 bg-ink-500 rounded" />
                <div className={`h-4 w-16 rounded ${i % 3 === 0 ? 'bg-electric-400/30' : i % 3 === 1 ? 'bg-violet-400/30' : 'bg-ink-600'}`} />
              </motion.div>
            ))}
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { label: 'Today', color: 'electric' },
              { label: 'Pending', color: 'violet' },
              { label: 'Routes', color: 'electric' },
            ].map((stat, i) => (
              <div key={i} className="p-2.5 bg-ink-800 border border-white/[0.06] rounded-lg space-y-1.5">
                <div className={`h-1.5 w-10 rounded ${stat.color === 'violet' ? 'bg-violet-400/50' : 'bg-electric-400/50'}`} />
                <div className="h-3 w-14 bg-ink-100 rounded" />
                <div className="h-1.5 w-8 bg-ink-400 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xs font-mono tracking-widest text-ink-300 uppercase">/ Selected work</span>
        </motion.div>
        <motion.h2
          className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tighter font-medium text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Selected work.
        </motion.h2>
      </div>

      {/* Projects */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20 sm:space-y-32">
        {PROJECTS.map((project, idx) => (
          <ProjectShowcase key={project.number} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE }}
    >
      {/* Info */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-mono text-violet-400">{project.number}</span>
          <div className="h-px w-12 bg-gradient-to-r from-violet-500/40 to-transparent" />
        </div>
        <h3 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-tighter font-medium text-white mb-4">
          {project.name}
        </h3>
        <p className="text-lg text-ink-200 mb-6 text-pretty">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 text-xs font-mono tracking-wide text-ink-200 border border-white/[0.08] rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
        <button className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-200 hover:text-white transition-colors duration-300">
          View case study
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Mockup */}
      <motion.div
        className="relative h-[280px] sm:h-[360px] lg:h-[420px]"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
      >
        <div className="absolute inset-0 bg-grid-fine opacity-10 mask-radial-faded" />
        {project.mockup === 'instruvex' ? <InstruvexMockup /> : <SafalMockup />}
      </motion.div>
    </motion.article>
  );
}
