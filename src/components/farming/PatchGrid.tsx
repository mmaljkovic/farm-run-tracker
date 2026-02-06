import { useState } from 'react';
import { PatchCard } from './PatchCard';
import { BulkPlantModal } from './BulkPlantModal';
import { Button, Card } from '../ui';
import { PATCH_LOCATIONS, PATCH_TYPE_NAMES } from '../../lib/constants';
import { usePatches } from '../../hooks';
import { calculatePatchXP, formatXP } from '../../lib/calculations';
import type { PatchType } from '../../types';

interface PatchGridProps {
  patchType: PatchType;
}

export function PatchGrid({ patchType }: PatchGridProps) {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const { getPatchesByType, plantSeed, plantSeedInAll, harvestPatch, clearPatch, clearAllPatches } = usePatches();

  const patches = getPatchesByType(patchType);
  const locations = PATCH_LOCATIONS.filter((l) => l.patchType === patchType);
  const xpSummary = calculatePatchXP(patches);

  const handleBulkPlant = (seedId: string, amount: number) => {
    plantSeedInAll(patchType, seedId, amount);
    setShowBulkModal(false);
  };

  const readyCount = patches.filter(
    (p) => p.seedId && !p.harvestedAt && p.expectedHarvestAt && new Date(p.expectedHarvestAt) <= new Date()
  ).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-rs-gold">
            {PATCH_TYPE_NAMES[patchType]}
          </h2>
          <p className="text-sm text-rs-tan">
            {locations.length} patches • {readyCount > 0 && (
              <span className="text-rs-gold-light">{readyCount} ready</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-rs-tan">Available XP</p>
            <p className="text-lg font-semibold text-rs-gold">{formatXP(xpSummary.available)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-rs-tan">Expected XP</p>
            <p className="text-lg font-semibold text-rs-parchment">{formatXP(xpSummary.expected)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setShowBulkModal(true)} size="sm">
            Plant All
          </Button>
          <Button onClick={() => clearAllPatches(patchType)} variant="secondary" size="sm">
            Clear All
          </Button>
        </div>
      </Card>

      {/* Patch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        {patches.map((patch) => (
          <PatchCard
            key={patch.id}
            patch={patch}
            onPlant={(seedId, amount) => plantSeed(patch.id, seedId, amount)}
            onHarvest={() => harvestPatch(patch.id)}
            onClear={() => clearPatch(patch.id)}
          />
        ))}
      </div>

      {/* Bulk Plant Modal */}
      <BulkPlantModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        patchType={patchType}
        onPlant={handleBulkPlant}
      />
    </div>
  );
}
