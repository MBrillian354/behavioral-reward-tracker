interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function ProgressBar({ 
  value, 
  label, 
  showValue = true, 
  size = 'medium',
  className = '' 
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  
  const sizeClasses = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="md-label-medium text-[var(--md-on-surface)]">{label}</span>
          )}
          {showValue && (
            <span className="md-label-medium text-[var(--md-on-surface-variant)]">
              {clampedValue.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-[var(--md-surface-container-highest)] rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className="h-full bg-[var(--md-primary)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
