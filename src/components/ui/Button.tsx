import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticButton({ children, className, strength = 0.3 }: MagneticProps) {
  return (
    <motion.div
      className={className}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        variants={{
          rest: { x: 0, y: 0 },
          hover: { x: 4, y: 0 },
        }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

type PrimaryButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'ghost';
};

export function PrimaryButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
}: PrimaryButtonProps) {
  const baseClasses =
    'group relative inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300';

  const variantClasses = {
    primary:
      'text-white bg-violet-600 hover:bg-violet-500',
    ghost:
      'text-ink-100 hover:text-white',
  };

  const content = (
    <motion.span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} type="button">
      {content}
    </button>
  );
}

type ArrowLinkProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function ArrowLink({ children, href, onClick, className = '' }: ArrowLinkProps) {
  const arrowVariants: Variants = {
    rest: { x: 0, opacity: 0.6 },
    hover: { x: 4, opacity: 1 },
  };

  const content = (
    <motion.span
      className={`group inline-flex items-center gap-1.5 text-sm font-medium text-ink-200 hover:text-white transition-colors duration-300 ${className}`}
      initial="rest"
      whileHover="hover"
    >
      <span>{children}</span>
      <motion.span variants={arrowVariants} transition={{ duration: 0.3, ease: EASE }}>
        →
      </motion.span>
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  );
}
