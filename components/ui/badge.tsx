import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'medium', className = '' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)]',
    success: 'bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]',
    warning: 'bg-amber-100 text-amber-900',
    error: 'bg-[var(--md-error-container)] text-[var(--md-on-error-container)]',
    info: 'bg-[var(--md-tertiary-container)] text-[var(--md-on-tertiary-container)]',
  };

  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
  };

  return (
    <span 
      className={`
        inline-flex items-center rounded-full font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
