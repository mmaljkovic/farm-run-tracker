import { useState } from 'react';
import { PenCard } from './PenCard';
import { BulkAssignModal } from './BulkAssignModal';
import { Button, Card } from '../ui';
import { PEN_LOCATIONS, PEN_TYPE_NAMES, FARM_LOCATION_NAMES } from '../../lib/constants';
import { usePens } from '../../hooks';
import { useSettings } from '../../hooks/useSettings';
import { calculatePenXP, formatXP, calculateAnimalStage } from '../../lib/calculations';
import { getAnimalById } from '../../data/animals';
import type { FarmLocation, PenType } from '../../types';

interface PenGridProps {
  farmLocation: FarmLocation;
}

export function PenGrid({ farmLocation }: PenGridProps) {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkPenType, setBulkPenType] = useState<PenType>('small');
  const { settings } = useSettings();

  const { getPensByLocation, assignAnimal, assignAnimalToAll, gatherPen, clearPen, clearAllPens } = usePens();

  const pens = getPensByLocation(farmLocation);
  const xpSummary = calculatePenXP(pens);

  // Group pens by type
  const pensByType: Record<PenType, typeof pens> = {
    small: pens.filter((p) => PEN_LOCATIONS.find((l) => l.id === p.penLocationId)?.penType === 'small'),
    medium: pens.filter((p) => PEN_LOCATIONS.find((l) => l.id === p.penLocationId)?.penType === 'medium'),
    large: pens.filter((p) => PEN_LOCATIONS.find((l) => l.id === p.penLocationId)?.penType === 'large'),
    breeding: pens.filter((p) => PEN_LOCATIONS.find((l) => l.id === p.penLocationId)?.penType === 'breeding'),
  };

  const handleBulkAssign = (animalId: string, count: number) => {
    assignAnimalToAll(bulkPenType, farmLocation, animalId, count);
    setShowBulkModal(false);
  };

  const openBulkModal = (penType: PenType) => {
    setBulkPenType(penType);
    setShowBulkModal(true);
  };

  // Count fully grown animals
  const readyCount = pens.filter((p) => {
    if (!p.animalId) return false;
    const animal = getAnimalById(p.animalId);
    if (!animal) return false;
    const { stage } = calculateAnimalStage(p.placedAt, animal.stageDurations, settings.timeFormat);
    return stage === 'elder';
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-rs-gold">
            {FARM_LOCATION_NAMES[farmLocation]}
          </h2>
          <p className="text-sm text-rs-tan">
            {pens.length} pens • {readyCount > 0 && (
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
      </Card>

      {/* Pen Groups */}
      {(['small', 'medium', 'large', 'breeding'] as PenType[]).map((penType) => (
        pensByType[penType].length > 0 && (
          <div key={penType} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-rs-tan">
                {PEN_TYPE_NAMES[penType]}s
              </h3>
              <div className="flex gap-2">
                {penType !== 'breeding' && (
                  <Button onClick={() => openBulkModal(penType)} variant="secondary" size="sm">
                    Assign All
                  </Button>
                )}
                <Button onClick={() => clearAllPens(penType, farmLocation)} variant="ghost" size="sm">
                  Clear All
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pensByType[penType].map((pen) => (
                <PenCard
                  key={pen.id}
                  pen={pen}
                  onAssign={(animalId, count) => assignAnimal(pen.id, animalId, count)}
                  onGather={() => gatherPen(pen.id)}
                  onClear={() => clearPen(pen.id)}
                />
              ))}
            </div>
          </div>
        )
      ))}

      {/* Bulk Assign Modal */}
      <BulkAssignModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        penType={bulkPenType}
        farmLocation={farmLocation}
        onAssign={handleBulkAssign}
      />
    </div>
  );
}
