import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variantClasses = {
  primary: 'bg-rs-green hover:bg-rs-green-light text-rs-parchment border-rs-border',
  secondary: 'bg-rs-brown-light hover:bg-rs-brown text-rs-tan border-rs-border',
  danger: 'bg-rs-red hover:bg-red-700 text-rs-parchment border-rs-border',
  ghost: 'bg-transparent hover:bg-rs-brown-light text-rs-tan border-transparent hover:border-rs-border',
  gold: 'bg-gradient-to-b from-rs-gold to-rs-gold-dark hover:from-rs-gold-light hover:to-rs-gold text-rs-brown-dark border-rs-gold-dark font-semibold',
};

const sizeClasses = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        font-medium rounded border transition-all
        focus:outline-none focus:ring-2 focus:ring-rs-gold focus:ring-offset-2 focus:ring-offset-rs-brown-dark
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{ textShadow: variant !== 'gold' ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none' }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
