'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || props.name;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={selectId} 
            className="block md-body-small text-[var(--md-on-surface-variant)] mb-1"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-[var(--md-surface-container-highest)]
            border border-[var(--md-outline-variant)]
            text-[var(--md-on-surface)] md-body-large
            focus:outline-none focus:border-[var(--md-primary)] focus:ring-1 focus:ring-[var(--md-primary)]
            disabled:bg-[var(--md-on-surface)]/4 disabled:text-[var(--md-on-surface)]/38
            transition-colors duration-200
            appearance-none
            bg-no-repeat bg-right
            cursor-pointer
            ${error ? 'border-[var(--md-error)] focus:border-[var(--md-error)] focus:ring-[var(--md-error)]' : ''}
            ${className}
          `}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236F7974' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundPosition: 'right 12px center',
            backgroundSize: '20px',
            paddingRight: '40px',
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 md-body-small text-[var(--md-error)]">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
