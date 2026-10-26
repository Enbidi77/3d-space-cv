import * as React from 'react';
import { cn } from '../lib/utils';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle' | 'glow-cyan' | 'glow-violet' | 'glow-emerald';
  blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      className,
      variant = 'default',
      blur = 'md',
      border = true,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default:
        'bg-slate-950/70 text-slate-100 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)]',
      elevated:
        'bg-slate-900/80 text-slate-100 shadow-[0_12px_40px_0_rgba(0,0,0,0.6)]',
      subtle:
        'bg-slate-950/40 text-slate-200 shadow-[0_4px_16px_0_rgba(0,0,0,0.3)]',
      'glow-cyan':
        'bg-slate-950/75 text-slate-100 shadow-[0_0_30px_rgba(56,189,248,0.15)] ring-1 ring-cyan-500/30',
      'glow-violet':
        'bg-slate-950/75 text-slate-100 shadow-[0_0_30px_rgba(192,132,252,0.15)] ring-1 ring-violet-500/30',
      'glow-emerald':
        'bg-slate-950/75 text-slate-100 shadow-[0_0_30px_rgba(52,211,153,0.15)] ring-1 ring-emerald-500/30',
    };

    const blurStyles = {
      none: '',
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl',
    };

    const borderStyle = border
      ? 'border border-slate-800/80 hover:border-slate-700/80 transition-colors'
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variantStyles[variant],
          blurStyles[blur],
          borderStyle,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

