import { formatDistanceToNow, differenceInMinutes, addMinutes } from 'date-fns';
import type { ProgressInfo, AnimalStage, PlantedPatch, AssignedPen, TimeFormat } from '../types';
import { getSeedById } from '../data/seeds';
import { getAnimalById } from '../data/animals';

// Format milliseconds based on user's preferred time format
export const formatTimeByPreference = (ms: number, format: TimeFormat): string => {
  if (ms <= 0) return 'Ready!';

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  if (format === 'approximate') {
    const targetDate = new Date(Date.now() + ms);
    return formatDistanceToNow(targetDate, { addSuffix: false });
  }

  if (format === 'hm') {
    if (days > 0) {
      return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
    }
    if (hours > 0) {
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  }

  // Default: 'hms'
  if (days > 0) {
    return remainingHours > 0 ? `${days}d ${remainingHours}h ${remainingMinutes}m` : `${days}d ${remainingMinutes}m`;
  }
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${seconds}s`;
};

// Calculate progress percentage for a patch
export const calculatePatchProgress = (
  plantedAt: string | null,
  expectedHarvestAt: string | null,
  timeFormat: TimeFormat = 'hms'
): ProgressInfo => {
  if (!plantedAt || !expectedHarvestAt) {
    return { percentage: 0, timeRemaining: 'Not planted', isComplete: false };
  }

  const planted = new Date(plantedAt);
  const harvest = new Date(expectedHarvestAt);
  const now = new Date();

  const total = harvest.getTime() - planted.getTime();
  const elapsed = now.getTime() - planted.getTime();
  const percentage = Math.min(100, Math.max(0, (elapsed / total) * 100));

  if (percentage >= 100) {
    return { percentage: 100, timeRemaining: 'Ready!', isComplete: true, harvestAt: harvest };
  }

  const msRemaining = harvest.getTime() - now.getTime();
  const timeRemaining = formatTimeByPreference(msRemaining, timeFormat);
  return { percentage, timeRemaining, isComplete: false, harvestAt: harvest };
};

// Calculate expected harvest time given planted time and growth duration
export const calculateHarvestTime = (plantedAt: Date, growthMinutes: number): Date => {
  return addMinutes(plantedAt, growthMinutes);
};

// Calculate current animal stage based on placement time
export const calculateAnimalStage = (
  placedAt: string | null,
  stageDurations: { egg: number; child: number; adolescent: number; adult: number },
  timeFormat: TimeFormat = 'hms'
): { stage: AnimalStage; progress: ProgressInfo } => {
  if (!placedAt) {
    return {
      stage: 'egg',
      progress: { percentage: 0, timeRemaining: 'Not placed', isComplete: false },
    };
  }

  const placed = new Date(placedAt);
  const now = new Date();
  const elapsedMinutes = differenceInMinutes(now, placed);

  const eggEnd = stageDurations.egg;
  const childEnd = eggEnd + stageDurations.child;
  const adolescentEnd = childEnd + stageDurations.adolescent;
  const adultEnd = adolescentEnd + stageDurations.adult;

  let stage: AnimalStage;
  let stageStart: number;
  let stageEnd: number;

  if (elapsedMinutes < eggEnd) {
    stage = 'egg';
    stageStart = 0;
    stageEnd = eggEnd;
  } else if (elapsedMinutes < childEnd) {
    stage = 'child';
    stageStart = eggEnd;
    stageEnd = childEnd;
  } else if (elapsedMinutes < adolescentEnd) {
    stage = 'adolescent';
    stageStart = childEnd;
    stageEnd = adolescentEnd;
  } else if (elapsedMinutes < adultEnd) {
    stage = 'adult';
    stageStart = adolescentEnd;
    stageEnd = adultEnd;
  } else {
    return {
      stage: 'elder',
      progress: { percentage: 100, timeRemaining: 'Fully grown!', isComplete: true },
    };
  }

  const stageProgress = ((elapsedMinutes - stageStart) / (stageEnd - stageStart)) * 100;
  const minutesRemaining = stageEnd - elapsedMinutes;
  const msRemaining = minutesRemaining * 60 * 1000;
  const timeRemaining = formatTimeByPreference(msRemaining, timeFormat);

  return {
    stage,
    progress: {
      percentage: stageProgress,
      timeRemaining,
      isComplete: false,
    },
  };
};

// Calculate total XP for patches
export const calculatePatchXP = (
  patches: PlantedPatch[]
): { available: number; expected: number } => {
  let available = 0;
  let expected = 0;

  for (const patch of patches) {
    if (!patch.seedId || patch.harvestedAt) continue;

    const seed = getSeedById(patch.seedId);
    if (!seed) continue;

    const xp = seed.xpPerCheck * patch.amountPlanted;
    expected += xp;

    const progress = calculatePatchProgress(patch.plantedAt, patch.expectedHarvestAt);
    if (progress.isComplete) {
      available += xp;
    }
  }

  return { available, expected };
};

// Calculate total XP for pens
export const calculatePenXP = (
  pens: AssignedPen[]
): { available: number; expected: number } => {
  let available = 0;
  let expected = 0;

  for (const pen of pens) {
    if (!pen.animalId) continue;

    const animal = getAnimalById(pen.animalId);
    if (!animal) continue;

    const xp = animal.xpPerCheck * pen.animalCount;
    expected += xp;

    const { stage } = calculateAnimalStage(pen.placedAt, animal.stageDurations);
    if (stage === 'elder') {
      available += xp;
    }
  }

  return { available, expected };
};

// Format XP number with commas
export const formatXP = (xp: number): string => {
  return Math.round(xp).toLocaleString();
};

// Format time remaining in a friendly way
export const formatTimeRemaining = (minutes: number): string => {
  if (minutes <= 0) return 'Ready';
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
};
