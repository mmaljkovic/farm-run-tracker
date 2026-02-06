import type { AnimalStage } from '../../types';
import { STAGE_NAMES } from '../../lib/constants';

interface StageIndicatorProps {
  currentStage: AnimalStage;
  className?: string;
}

const stages: AnimalStage[] = ['egg', 'child', 'adolescent', 'adult', 'elder'];

export function StageIndicator({ currentStage, className = '' }: StageIndicatorProps) {
  const currentIndex = stages.indexOf(currentStage);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stages.map((stage, index) => (
        <div key={stage} className="flex items-center">
          <div
            className={`w-2.5 h-2.5 rounded-full border ${
              index <= currentIndex
                ? index === currentIndex
                  ? 'bg-rs-gold border-rs-gold-light'
                  : 'bg-rs-green border-rs-green-light'
                : 'bg-rs-brown-dark border-rs-border'
            }`}
            title={STAGE_NAMES[stage]}
          />
          {index < stages.length - 1 && (
            <div
              className={`w-4 h-0.5 ${
                index < currentIndex ? 'bg-rs-green' : 'bg-rs-border'
              }`}
            />
          )}
        </div>
      ))}
      <span className="ml-2 text-xs text-rs-tan font-medium">{STAGE_NAMES[currentStage]}</span>
    </div>
  );
}
