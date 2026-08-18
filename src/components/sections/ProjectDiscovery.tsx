import { motion, AnimatePresence } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

type FormData = {
  projectType: string;
  businessName: string;
  industry: string;
  description: string;
  needsChange: string;
  stage: string;
  budget: string;
  name: string;
  company: string;
  email: string;
  phone: string;
};

const PROJECT_TYPES = [
  'Website',
  'E-commerce platform',
  'Web application',
  'Business software',
  'AI solution',
  'Automation',
  'Something else',
];

const STAGES = ['Exploring', 'Ready to start', 'Improving an existing system', 'Scaling an existing product'];

const BUDGETS = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹3,00,000',
  '₹3,00,000+',
  'Prefer to discuss',
];

const TOTAL_STEPS = 6;

const INITIAL_DATA: FormData = {
  projectType: '',
  businessName: '',
  industry: '',
  description: '',
  needsChange: '',
  stage: '',
  budget: '',
  name: '',
  company: '',
  email: '',
  phone: '',
};

export function ProjectDiscovery() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const updateField = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return data.projectType !== '';
      case 1:
        return data.businessName !== '' && data.description !== '';
      case 2:
        return data.needsChange !== '';
      case 3:
        return data.stage !== '';
      case 4:
        return data.budget !== '';
      case 5:
        return data.name !== '' && data.email !== '';
      default:
        return false;
    }
  };

  const next = () => {
    if (!canProceed()) return;
    setDirection(1);
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const back = () => {
    setDirection(-1);
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    next();
  };

  if (submitted) {
    return <CompletionScreen />;
  }

  return (
    <section id="discovery" className="relative min-h-screen flex items-center py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono tracking-widest text-ink-300 uppercase">
              Project Discovery
            </span>
            <span className="text-xs font-mono text-ink-300">
              {String(step + 1).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
            </span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-0.5 rounded-full overflow-hidden bg-ink-700"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-electric-400"
                  initial={{ width: '0%' }}
                  animate={{ width: i <= step ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {step === 0 && (
                <StepBlock
                  title="What are you looking to build?"
                  subtitle="Select the option that best describes your project."
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    {PROJECT_TYPES.map((type) => (
                      <OptionCard
                        key={type}
                        label={type}
                        selected={data.projectType === type}
                        onClick={() => updateField('projectType', type)}
                      />
                    ))}
                  </div>
                </StepBlock>
              )}

              {step === 1 && (
                <StepBlock
                  title="Tell us about your business."
                  subtitle="The more context we have, the more useful our response will be."
                >
                  <div className="space-y-5">
                    <Field label="Business or organisation name" required>
                      <input
                        type="text"
                        value={data.businessName}
                        onChange={(e) => updateField('businessName', e.target.value)}
                        placeholder="e.g. Instruvex Technologies"
                        className="input-field"
                        autoFocus
                      />
                    </Field>
                    <Field label="Industry">
                      <input
                        type="text"
                        value={data.industry}
                        onChange={(e) => updateField('industry', e.target.value)}
                        placeholder="e.g. Education, Retail, Finance"
                        className="input-field"
                      />
                    </Field>
                    <Field label="Brief description">
                      <textarea
                        value={data.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        placeholder="What does your business do?"
                        rows={3}
                        className="input-field resize-none"
                      />
                    </Field>
                  </div>
                </StepBlock>
              )}

              {step === 2 && (
                <StepBlock
                  title="What needs to change?"
                  subtitle="Explain the problem you're trying to solve or the goal you're working toward."
                >
                  <textarea
                    value={data.needsChange}
                    onChange={(e) => updateField('needsChange', e.target.value)}
                    placeholder="Describe the current situation and what you want it to look like..."
                    rows={8}
                    className="input-field resize-none"
                    autoFocus
                  />
                </StepBlock>
              )}

              {step === 3 && (
                <StepBlock
                  title="What stage are you at?"
                  subtitle="This helps us understand how to approach the conversation."
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    {STAGES.map((stage) => (
                      <OptionCard
                        key={stage}
                        label={stage}
                        selected={data.stage === stage}
                        onClick={() => updateField('stage', stage)}
                      />
                    ))}
                  </div>
                </StepBlock>
              )}

              {step === 4 && (
                <StepBlock
                  title="What is your approximate project budget?"
                  subtitle="This helps us recommend the right approach. You can always discuss this later."
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    {BUDGETS.map((budget) => (
                      <OptionCard
                        key={budget}
                        label={budget}
                        selected={data.budget === budget}
                        onClick={() => updateField('budget', budget)}
                      />
                    ))}
                  </div>
                </StepBlock>
              )}

              {step === 5 && (
                <StepBlock
                  title="How should we contact you?"
                  subtitle="We'll review the details and get back to you with the next step."
                >
                  <div className="space-y-5">
                    <Field label="Name" required>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Your full name"
                        className="input-field"
                        autoFocus
                      />
                    </Field>
                    <Field label="Company">
                      <input
                        type="text"
                        value={data.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        placeholder="Company name (optional)"
                        className="input-field"
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@company.com"
                        className="input-field"
                      />
                    </Field>
                    <Field label="Phone / WhatsApp">
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+91 ..."
                        className="input-field"
                      />
                    </Field>
                  </div>
                </StepBlock>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              className={`group inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                step === 0 ? 'text-ink-400 pointer-events-none opacity-0' : 'text-ink-200 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back
            </button>

            <button
              type="submit"
              disabled={!canProceed()}
              className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 disabled:bg-ink-700 disabled:text-ink-400 disabled:cursor-not-allowed transition-all duration-300"
            >
              {step === TOTAL_STEPS - 1 ? 'Submit request' : 'Continue'}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function StepBlock({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] tracking-tighter font-medium text-white mb-3">
        {title}
      </h2>
      <p className="text-ink-300 mb-8 text-pretty">{subtitle}</p>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-ink-200 mb-2">
        {label}
        {required && <span className="text-violet-400 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative px-5 py-4 text-left text-base transition-all duration-300 border rounded-lg ${
        selected
          ? 'border-violet-500/50 bg-violet-600/10 text-white'
          : 'border-white/[0.08] bg-ink-800/50 text-ink-200 hover:border-white/[0.15] hover:bg-ink-800'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center"
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </div>
      {selected && (
        <motion.div
          layoutId="selected-glow"
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{ boxShadow: '0 0 30px -10px rgba(111,77,255,0.3)' }}
        />
      )}
    </button>
  );
}

function CompletionScreen() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 noise-overlay" />

      <motion.div
        className="relative text-center max-w-2xl mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        {/* Animated check */}
        <motion.div
          className="mx-auto mb-10 w-16 h-16 rounded-full border border-violet-500/30 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-violet-600/20 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Check className="w-6 h-6 text-violet-300" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tighter font-medium text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          Project request received.
        </motion.h2>

        <motion.p
          className="mt-6 text-lg text-ink-200 text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        >
          We'll review the details and get back to you with the next step.
        </motion.p>

        {/* Subtle completion line animation */}
        <motion.div
          className="mt-12 mx-auto h-px gradient-line max-w-xs"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.7, ease: EASE }}
        />
      </motion.div>
    </section>
  );
}
