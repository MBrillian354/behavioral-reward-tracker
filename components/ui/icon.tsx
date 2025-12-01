interface IconProps {
  name: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  filled?: boolean;
}

const sizeClasses = {
  small: 'text-[18px]',
  medium: 'text-[24px]',
  large: 'text-[32px]',
  xlarge: 'text-[48px]',
};

export function Icon({ name, size = 'medium', className = '', filled = false }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${sizeClasses[size]} ${className}`}
      style={{
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
        lineHeight: 1,
      }}
    >
      {name}
    </span>
  );
}
