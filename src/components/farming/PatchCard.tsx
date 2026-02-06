import { useState, useEffect } from 'react';
import { Clock, Check, Trash2, Sprout } from 'lucide-react';
import { format } from 'date-fns';
import { Card, ProgressBar, Select, Button } from '../ui';
import { PATCH_LOCATIONS } from '../../lib/constants';
import { getSeedsByPatchType, getSeedById } from '../../data/seeds';
import { calculatePatchProgress, formatXP } from '../../lib/calculations';
import { useSettings } from '../../hooks/useSettings';
import type { PlantedPatch, PatchType } from '../../types';

interface PatchCardProps {
  patch: PlantedPatch;
  onPlant: (seedId: string, amount: number) => void;
  onHarvest: () => void;
  onClear: () => void;
}

export function PatchCard({ patch, onPlant, onHarvest, onClear }: PatchCardProps) {
  const [selectedSeed, setSelectedSeed] = useState('');
  const [, setTick] = useState(0);
  const { settings } = useSettings();

  // Force re-render every second for timer updates
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const location = PATCH_LOCATIONS.find((l) => l.id === patch.patchLocationId);
  if (!location) return null;

  const patchType = location.patchType as PatchType;
  const seeds = getSeedsByPatchType(patchType, patch.patchLocationId);
  const currentSeed = patch.seedId ? getSeedById(patch.seedId) : null;
  const progress = calculatePatchProgress(patch.plantedAt, patch.expectedHarvestAt, settings.timeFormat);

  const handlePlant = () => {
    if (selectedSeed) {
      onPlant(selectedSeed, 1);
      setSelectedSeed('');
    }
  };

  const seedOptions = seeds.map((seed) => ({
    value: seed.id,
    label: `${seed.name} (Lv. ${seed.levelRequired})`,
  }));

  const isPlanted = !!patch.seedId && !patch.harvestedAt;
  const isReady = progress.isComplete && isPlanted;

  const harvestTimeTooltip = progress.harvestAt
    ? format(progress.harvestAt, "MMM d, yyyy 'at' h:mm:ss a")
    : '';

  return (
    <Card
      title={location.name}
      highlight={isReady}
      className="relative h-full"
      actions={
        isPlanted && (
          <div className="flex gap-1">
            {isReady && (
              <Button variant="gold" size="sm" onClick={onHarvest}>
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
      {isPlanted && currentSeed ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-rs-green-light" />
            <span className="text-rs-parchment font-medium">{currentSeed.name}</span>
          </div>

          <ProgressBar percentage={progress.percentage} size="md" />

          <div className="flex justify-between text-sm">
            <div
              className="flex items-center gap-1 text-rs-tan cursor-help"
              title={harvestTimeTooltip}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{progress.timeRemaining}</span>
            </div>
            <span className="text-rs-gold font-medium">
              {formatXP(currentSeed.xpPerCheck * patch.amountPlanted)} XP
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Select
            options={seedOptions}
            value={selectedSeed}
            onChange={(e) => setSelectedSeed(e.target.value)}
            placeholder="Select seed..."
          />
          <Button
            onClick={handlePlant}
            disabled={!selectedSeed}
            fullWidth
            size="sm"
          >
            Plant
          </Button>
        </div>
      )}
    </Card>
  );
}
