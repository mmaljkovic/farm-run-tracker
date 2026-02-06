import { useState } from 'react';
import { Modal, Select, Button } from '../ui';
import { PEN_TYPE_NAMES, FARM_LOCATION_NAMES } from '../../lib/constants';
import { getAnimalsByPenAndLocation } from '../../data/animals';
import type { PenType, FarmLocation } from '../../types';

interface BulkAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  penType: PenType;
  farmLocation: FarmLocation;
  onAssign: (animalId: string, count: number) => void;
}

export function BulkAssignModal({
  isOpen,
  onClose,
  penType,
  farmLocation,
  onAssign,
}: BulkAssignModalProps) {
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [animalCount, setAnimalCount] = useState(1);

  const animals = getAnimalsByPenAndLocation(penType, farmLocation);
  const animalOptions = animals.map((animal) => ({
    value: animal.id,
    label: `${animal.name} (Lv. ${animal.levelRequired})`,
  }));

  const handleAssign = () => {
    if (selectedAnimal) {
      onAssign(selectedAnimal, animalCount);
      setSelectedAnimal('');
      setAnimalCount(1);
    }
  };

  const handleClose = () => {
    setSelectedAnimal('');
    setAnimalCount(1);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Assign to All ${PEN_TYPE_NAMES[penType]}s`}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedAnimal}>
            Assign All
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-gray-400">
          Select an animal to assign to all {PEN_TYPE_NAMES[penType].toLowerCase()}s
          at {FARM_LOCATION_NAMES[farmLocation]}.
        </p>
        <Select
          label="Animal"
          options={animalOptions}
          value={selectedAnimal}
          onChange={(e) => setSelectedAnimal(e.target.value)}
          placeholder="Select animal..."
        />
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Count per pen
          </label>
          <input
            type="number"
            min="1"
            max="6"
            value={animalCount}
            onChange={(e) => setAnimalCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full input"
          />
        </div>
      </div>
    </Modal>
  );
}
