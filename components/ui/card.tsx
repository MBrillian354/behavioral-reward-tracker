import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'elevated' | 'filled' | 'outlined';
}

export function Card({ children, className = '', variant = 'elevated' }: CardProps) {
  const variantClasses = {
    elevated: 'bg-[var(--md-surface-container-low)] elevation-1',
    filled: 'bg-[var(--md-surface-container-highest)]',
    outlined: 'bg-[var(--md-surface)] border border-[var(--md-outline-variant)]',
  };

  return (
    <div className={`rounded-xl p-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-3 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`md-title-large text-[var(--md-on-surface)] ${className}`}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`text-[var(--md-on-surface-variant)] md-body-medium ${className}`}>
      {children}
    </div>
  );
}
