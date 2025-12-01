'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text' | 'tonal';
  size?: 'small' | 'medium' | 'large';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'filled', size = 'medium', children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
    
    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm h-8',
      medium: 'px-6 py-2.5 text-sm h-10',
      large: 'px-6 py-3 text-base h-12',
    };
    
    const variantClasses = {
      filled: 'bg-[var(--md-primary)] text-[var(--md-on-primary)] hover:bg-[var(--md-primary)]/90 active:bg-[var(--md-primary)]/80 disabled:bg-[var(--md-on-surface)]/12 disabled:text-[var(--md-on-surface)]/38 elevation-1 hover:elevation-2',
      outlined: 'border border-[var(--md-outline)] text-[var(--md-primary)] hover:bg-[var(--md-primary)]/8 active:bg-[var(--md-primary)]/12 disabled:border-[var(--md-on-surface)]/12 disabled:text-[var(--md-on-surface)]/38',
      text: 'text-[var(--md-primary)] hover:bg-[var(--md-primary)]/8 active:bg-[var(--md-primary)]/12 disabled:text-[var(--md-on-surface)]/38',
      tonal: 'bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)] hover:bg-[var(--md-secondary-container)]/80 active:bg-[var(--md-secondary-container)]/70 disabled:bg-[var(--md-on-surface)]/12 disabled:text-[var(--md-on-surface)]/38',
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
