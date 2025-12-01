'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block md-body-small text-[var(--md-on-surface-variant)] mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-[var(--md-surface-container-highest)]
            border border-[var(--md-outline-variant)]
            text-[var(--md-on-surface)] md-body-large
            placeholder:text-[var(--md-on-surface-variant)]
            focus:outline-none focus:border-[var(--md-primary)] focus:ring-1 focus:ring-[var(--md-primary)]
            disabled:bg-[var(--md-on-surface)]/4 disabled:text-[var(--md-on-surface)]/38
            transition-colors duration-200
            ${error ? 'border-[var(--md-error)] focus:border-[var(--md-error)] focus:ring-[var(--md-error)]' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 md-body-small text-[var(--md-error)]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 md-body-small text-[var(--md-on-surface-variant)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
