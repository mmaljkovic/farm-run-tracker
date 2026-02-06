import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative rs-panel shadow-2xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-rs-border rs-header rounded-t">
            <h3 className="text-lg font-semibold rs-gold-text tracking-wide">{title}</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Body */}
          <div className="p-4">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex justify-end gap-2 p-4 border-t-2 border-rs-border">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
