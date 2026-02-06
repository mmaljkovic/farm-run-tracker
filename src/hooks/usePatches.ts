import { useCallback, useMemo, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { PATCH_LOCATIONS } from '../lib/constants';
import { getSeedById } from '../data/seeds';
import { calculateHarvestTime } from '../lib/calculations';
import type { PlantedPatch, PatchType } from '../types';

// Initialize empty patches for all locations
const createInitialPatches = (): PlantedPatch[] => {
  return PATCH_LOCATIONS.map((location) => ({
    id: location.id,
    patchLocationId: location.id,
    seedId: null,
    plantedAt: null,
    expectedHarvestAt: null,
    harvestedAt: null,
    amountPlanted: 1,
  }));
};

// Sync stored patches with current PATCH_LOCATIONS
// - Preserves existing patch data
// - Adds new patches that don't exist in storage
// - Removes patches that no longer exist in PATCH_LOCATIONS
const syncPatchesWithLocations = (storedPatches: PlantedPatch[]): PlantedPatch[] => {
  const storedPatchMap = new Map(storedPatches.map((p) => [p.patchLocationId, p]));

  return PATCH_LOCATIONS.map((location) => {
    const existing = storedPatchMap.get(location.id);
    if (existing) {
      return existing;
    }
    // Create new empty patch for this location
    return {
      id: location.id,
      patchLocationId: location.id,
      seedId: null,
      plantedAt: null,
      expectedHarvestAt: null,
      harvestedAt: null,
      amountPlanted: 1,
    };
  });
};

export function usePatches() {
  const [patches, setPatches] = useLocalStorage<PlantedPatch[]>('rs3-patches', createInitialPatches());

  // Sync patches with PATCH_LOCATIONS on mount (handles added/removed patches)
  useEffect(() => {
    const locationIds = new Set(PATCH_LOCATIONS.map((l) => l.id));
    const patchIds = new Set(patches.map((p) => p.patchLocationId));

    // Check if we need to sync (new locations added or old ones removed)
    const hasNewLocations = PATCH_LOCATIONS.some((l) => !patchIds.has(l.id));
    const hasRemovedLocations = patches.some((p) => !locationIds.has(p.patchLocationId));

    if (hasNewLocations || hasRemovedLocations) {
      setPatches(syncPatchesWithLocations(patches));
    }
  }, []); // Only run on mount

  // Get patch by ID
  const getPatch = useCallback(
    (patchId: string): PlantedPatch | undefined => {
      return patches.find((p) => p.id === patchId);
    },
    [patches]
  );

  // Get patches by type
  const getPatchesByType = useCallback(
    (patchType: PatchType): PlantedPatch[] => {
      const locationIds = PATCH_LOCATIONS
        .filter((loc) => loc.patchType === patchType)
        .map((loc) => loc.id);
      return patches.filter((p) => locationIds.includes(p.patchLocationId));
    },
    [patches]
  );

  // Plant a seed in a patch
  const plantSeed = useCallback(
    (patchId: string, seedId: string, amount: number = 1) => {
      const seed = getSeedById(seedId);
      if (!seed) return;

      const now = new Date();
      const harvestTime = calculateHarvestTime(now, seed.growthTimeMinutes);

      setPatches((prev) =>
        prev.map((p) =>
          p.id === patchId
            ? {
                ...p,
                seedId,
                plantedAt: now.toISOString(),
                expectedHarvestAt: harvestTime.toISOString(),
                harvestedAt: null,
                amountPlanted: amount,
              }
            : p
        )
      );
    },
    [setPatches]
  );

  // Plant same seed in all patches of a type
  const plantSeedInAll = useCallback(
    (patchType: PatchType, seedId: string, amount: number = 1) => {
      const seed = getSeedById(seedId);
      if (!seed) return;

      const locationIds = PATCH_LOCATIONS
        .filter((loc) => loc.patchType === patchType)
        .map((loc) => loc.id);

      const now = new Date();
      const harvestTime = calculateHarvestTime(now, seed.growthTimeMinutes);

      setPatches((prev) =>
        prev.map((p) =>
          locationIds.includes(p.patchLocationId)
            ? {
                ...p,
                seedId,
                plantedAt: now.toISOString(),
                expectedHarvestAt: harvestTime.toISOString(),
                harvestedAt: null,
                amountPlanted: amount,
              }
            : p
        )
      );
    },
    [setPatches]
  );

  // Harvest a patch
  const harvestPatch = useCallback(
    (patchId: string) => {
      setPatches((prev) =>
        prev.map((p) =>
          p.id === patchId
            ? {
                ...p,
                harvestedAt: new Date().toISOString(),
              }
            : p
        )
      );
    },
    [setPatches]
  );

  // Clear a patch
  const clearPatch = useCallback(
    (patchId: string) => {
      setPatches((prev) =>
        prev.map((p) =>
          p.id === patchId
            ? {
                ...p,
                seedId: null,
                plantedAt: null,
                expectedHarvestAt: null,
                harvestedAt: null,
                amountPlanted: 1,
              }
            : p
        )
      );
    },
    [setPatches]
  );

  // Clear all patches of a type
  const clearAllPatches = useCallback(
    (patchType: PatchType) => {
      const locationIds = PATCH_LOCATIONS
        .filter((loc) => loc.patchType === patchType)
        .map((loc) => loc.id);

      setPatches((prev) =>
        prev.map((p) =>
          locationIds.includes(p.patchLocationId)
            ? {
                ...p,
                seedId: null,
                plantedAt: null,
                expectedHarvestAt: null,
                harvestedAt: null,
                amountPlanted: 1,
              }
            : p
        )
      );
    },
    [setPatches]
  );

  // Get all active (planted, not harvested) patches
  const activePatches = useMemo(() => {
    return patches.filter((p) => p.seedId && !p.harvestedAt);
  }, [patches]);

  return {
    patches,
    activePatches,
    getPatch,
    getPatchesByType,
    plantSeed,
    plantSeedInAll,
    harvestPatch,
    clearPatch,
    clearAllPatches,
  };
}
