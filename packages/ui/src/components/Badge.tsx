import * as React from 'react';
import { cn } from '../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'violet' | 'indigo' | 'emerald' | 'amber' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'cyan', size = 'sm', children, ...props }, ref) => {
    const sizeStyles = {
      sm: 'text-xs px-2.5 py-0.5 font-medium',
      md: 'text-sm px-3 py-1 font-medium',
    };

    const variantStyles = {
      cyan: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30',
      violet: 'bg-violet-500/10 text-violet-300 border border-violet-500/30',
      indigo: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30',
      emerald: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30',
      amber: 'bg-amber-500/10 text-amber-300 border border-amber-500/30',
      neutral: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
      outline: 'bg-transparent text-slate-300 border border-slate-700',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full backdrop-blur-sm transition-colors',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

