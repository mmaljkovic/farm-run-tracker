import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { PEN_LOCATIONS } from '../lib/constants';
import type { AssignedPen, FarmLocation, PenType } from '../types';

// Initialize empty pens for all locations
const createInitialPens = (): AssignedPen[] => {
  return PEN_LOCATIONS.map((location) => ({
    id: location.id,
    penLocationId: location.id,
    animalId: null,
    animalCount: 0,
    placedAt: null,
    currentStage: 'egg' as const,
    stageStartedAt: null,
    expectedNextStageAt: null,
    lastGatheredAt: null,
  }));
};

export function usePens() {
  const [pens, setPens] = useLocalStorage<AssignedPen[]>('rs3-pens', createInitialPens());

  // Get pen by ID
  const getPen = useCallback(
    (penId: string): AssignedPen | undefined => {
      return pens.find((p) => p.id === penId);
    },
    [pens]
  );

  // Get pens by location
  const getPensByLocation = useCallback(
    (location: FarmLocation): AssignedPen[] => {
      const locationIds = PEN_LOCATIONS
        .filter((loc) => loc.location === location)
        .map((loc) => loc.id);
      return pens.filter((p) => locationIds.includes(p.penLocationId));
    },
    [pens]
  );

  // Get pens by type and location
  const getPensByTypeAndLocation = useCallback(
    (penType: PenType, location: FarmLocation): AssignedPen[] => {
      const locationIds = PEN_LOCATIONS
        .filter((loc) => loc.location === location && loc.penType === penType)
        .map((loc) => loc.id);
      return pens.filter((p) => locationIds.includes(p.penLocationId));
    },
    [pens]
  );

  // Assign animal to pen
  const assignAnimal = useCallback(
    (penId: string, animalId: string, count: number) => {
      const now = new Date();

      setPens((prev) =>
        prev.map((p) =>
          p.id === penId
            ? {
                ...p,
                animalId,
                animalCount: count,
                placedAt: now.toISOString(),
                currentStage: 'egg' as const,
                stageStartedAt: now.toISOString(),
                expectedNextStageAt: null,
                lastGatheredAt: null,
              }
            : p
        )
      );
    },
    [setPens]
  );

  // Assign same animal to all pens of type in location
  const assignAnimalToAll = useCallback(
    (penType: PenType, location: FarmLocation, animalId: string, count: number) => {
      const locationIds = PEN_LOCATIONS
        .filter((loc) => loc.location === location && loc.penType === penType)
        .map((loc) => loc.id);

      const now = new Date();

      setPens((prev) =>
        prev.map((p) =>
          locationIds.includes(p.penLocationId)
            ? {
                ...p,
                animalId,
                animalCount: count,
                placedAt: now.toISOString(),
                currentStage: 'egg' as const,
                stageStartedAt: now.toISOString(),
                expectedNextStageAt: null,
                lastGatheredAt: null,
              }
            : p
        )
      );
    },
    [setPens]
  );

  // Gather from pen (mark as gathered)
  const gatherPen = useCallback(
    (penId: string) => {
      setPens((prev) =>
        prev.map((p) =>
          p.id === penId
            ? {
                ...p,
                lastGatheredAt: new Date().toISOString(),
              }
            : p
        )
      );
    },
    [setPens]
  );

  // Clear pen
  const clearPen = useCallback(
    (penId: string) => {
      setPens((prev) =>
        prev.map((p) =>
          p.id === penId
            ? {
                ...p,
                animalId: null,
                animalCount: 0,
                placedAt: null,
                currentStage: 'egg' as const,
                stageStartedAt: null,
                expectedNextStageAt: null,
                lastGatheredAt: null,
              }
            : p
        )
      );
    },
    [setPens]
  );

  // Clear all pens of type in location
  const clearAllPens = useCallback(
    (penType: PenType, location: FarmLocation) => {
      const locationIds = PEN_LOCATIONS
        .filter((loc) => loc.location === location && loc.penType === penType)
        .map((loc) => loc.id);

      setPens((prev) =>
        prev.map((p) =>
          locationIds.includes(p.penLocationId)
            ? {
                ...p,
                animalId: null,
                animalCount: 0,
                placedAt: null,
                currentStage: 'egg' as const,
                stageStartedAt: null,
                expectedNextStageAt: null,
                lastGatheredAt: null,
              }
            : p
        )
      );
    },
    [setPens]
  );

  // Get all active pens (has animals)
  const activePens = useMemo(() => {
    return pens.filter((p) => p.animalId);
  }, [pens]);

  return {
    pens,
    activePens,
    getPen,
    getPensByLocation,
    getPensByTypeAndLocation,
    assignAnimal,
    assignAnimalToAll,
    gatherPen,
    clearPen,
    clearAllPens,
  };
}
