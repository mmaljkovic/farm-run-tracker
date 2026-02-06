import { useState, useEffect } from 'react';
import { Clock, Check, Trash2 } from 'lucide-react';
import { Card, ProgressBar, Select, Button } from '../ui';
import { StageIndicator } from './StageIndicator';
import { PEN_LOCATIONS } from '../../lib/constants';
import { getAnimalsByPenAndLocation, getAnimalById } from '../../data/animals';
import { calculateAnimalStage, formatXP } from '../../lib/calculations';
import { useSettings } from '../../hooks/useSettings';
import type { AssignedPen } from '../../types';

interface PenCardProps {
  pen: AssignedPen;
  onAssign: (animalId: string, count: number) => void;
  onGather: () => void;
  onClear: () => void;
}

export function PenCard({ pen, onAssign, onGather, onClear }: PenCardProps) {
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [animalCount, setAnimalCount] = useState(1);
  const [, setTick] = useState(0);
  const { settings } = useSettings();

  // Force re-render every second for timer updates
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const location = PEN_LOCATIONS.find((l) => l.id === pen.penLocationId);
  if (!location) return null;

  const animals = getAnimalsByPenAndLocation(location.penType, location.location);
  const currentAnimal = pen.animalId ? getAnimalById(pen.animalId) : null;

  const stageInfo = currentAnimal
    ? calculateAnimalStage(pen.placedAt, currentAnimal.stageDurations, settings.timeFormat)
    : null;

  const handleAssign = () => {
    if (selectedAnimal) {
      onAssign(selectedAnimal, animalCount);
      setSelectedAnimal('');
      setAnimalCount(1);
    }
  };

  const animalOptions = animals.map((animal) => ({
    value: animal.id,
    label: `${animal.name} (Lv. ${animal.levelRequired})`,
  }));

  const hasAnimal = !!pen.animalId;
  const isFullyGrown = stageInfo?.stage === 'elder';

  return (
    <Card
      title={location.name}
      highlight={isFullyGrown}
      className="relative"
      actions={
        hasAnimal && (
          <div className="flex gap-1">
            {isFullyGrown && (
              <Button variant="gold" size="sm" onClick={onGather}>
                <Check className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClear}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )
      }
    >
      {hasAnimal && currentAnimal && stageInfo ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-rs-parchment font-medium">{currentAnimal.name}</span>
            <span className="text-sm text-rs-tan">x{pen.animalCount}</span>
          </div>

          <StageIndicator currentStage={stageInfo.stage} />

          <ProgressBar percentage={stageInfo.progress.percentage} size="md" />

          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1 text-rs-tan">
              <Clock className="w-3.5 h-3.5" />
              <span>{stageInfo.progress.timeRemaining}</span>
            </div>
            <span className="text-rs-gold font-medium">
              {formatXP(currentAnimal.xpPerCheck * pen.animalCount)} XP
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Select
            options={animalOptions}
            value={selectedAnimal}
            onChange={(e) => setSelectedAnimal(e.target.value)}
            placeholder="Select animal..."
          />
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="6"
              value={animalCount}
              onChange={(e) => setAnimalCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 input text-center"
              placeholder="Count"
            />
            <Button
              onClick={handleAssign}
              disabled={!selectedAnimal}
              fullWidth
              size="sm"
            >
              Assign
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
