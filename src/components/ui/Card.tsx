import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  highlight?: boolean;
}

export function Card({
  children,
  className = '',
  title,
  subtitle,
  actions,
  highlight = false,
}: CardProps) {
  return (
    <div
      className={`
        rs-panel p-4
        ${highlight ? 'border-rs-gold shadow-[0_0_20px_rgba(201,170,88,0.3)]' : ''}
        ${className}
      `}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between mb-3 min-h-[2.5rem]">
          <div className="flex-1 min-w-0">
            {title && <h3 className="font-semibold text-rs-gold tracking-wide leading-tight">{title}</h3>}
            {subtitle && <p className="text-sm text-rs-tan mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex gap-2 flex-shrink-0 ml-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
