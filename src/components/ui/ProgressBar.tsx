interface ProgressBarProps {
  percentage: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'gold' | 'red';
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const colorClasses = {
  green: 'bg-gradient-to-r from-rs-green to-rs-green-light',
  gold: 'bg-gradient-to-r from-rs-gold-dark to-rs-gold',
  red: 'bg-gradient-to-r from-rs-red to-red-500',
};

export function ProgressBar({
  percentage,
  label,
  showPercentage = true,
  size = 'md',
  color = 'green',
}: ProgressBarProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const isComplete = clampedPercentage >= 100;

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between mb-1 text-sm">
          {label && <span className="text-rs-tan">{label}</span>}
          {showPercentage && (
            <span className={isComplete ? 'text-rs-gold font-semibold' : 'text-rs-tan'}>
              {Math.round(clampedPercentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-rs-brown-dark rounded-sm overflow-hidden border border-rs-border ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} transition-all duration-500 ease-out`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
}
