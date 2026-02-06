import { useState } from 'react';
import { Modal, Select, Button } from '../ui';
import { PATCH_TYPE_NAMES } from '../../lib/constants';
import { getSeedsByPatchType } from '../../data/seeds';
import type { PatchType } from '../../types';

interface BulkPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  patchType: PatchType;
  onPlant: (seedId: string, amount: number) => void;
}

export function BulkPlantModal({ isOpen, onClose, patchType, onPlant }: BulkPlantModalProps) {
  const [selectedSeed, setSelectedSeed] = useState('');

  const seeds = getSeedsByPatchType(patchType);
  const seedOptions = seeds.map((seed) => ({
    value: seed.id,
    label: `${seed.name} (Lv. ${seed.levelRequired}) - ${seed.growthTimeMinutes} min`,
  }));

  const handlePlant = () => {
    if (selectedSeed) {
      onPlant(selectedSeed, 1);
      setSelectedSeed('');
    }
  };

  const handleClose = () => {
    setSelectedSeed('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Plant All ${PATCH_TYPE_NAMES[patchType]}`}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handlePlant} disabled={!selectedSeed}>
            Plant All
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-gray-400">
          Select a seed to plant in all {PATCH_TYPE_NAMES[patchType].toLowerCase()} patches.
        </p>
        <Select
          label="Seed"
          options={seedOptions}
          value={selectedSeed}
          onChange={(e) => setSelectedSeed(e.target.value)}
          placeholder="Select seed..."
        />
      </div>
    </Modal>
  );
}
