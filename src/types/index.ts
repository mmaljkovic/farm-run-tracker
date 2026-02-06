// Patch Types
export type PatchType =
  | 'tree'
  | 'fruit_tree'
  | 'calquat'
  | 'bush'
  | 'herb'
  | 'mushroom'
  | 'cactus'
  | 'spirit_tree'
  | 'allotment'
  | 'hops'
  | 'flower'
  | 'belladonna'
  | 'elder'
  | 'crystal';

// Pen Types
export type PenType = 'small' | 'medium' | 'large' | 'breeding';
export type FarmLocation = 'manor_farm' | 'ranch_out_of_time';
export type AnimalStage = 'egg' | 'child' | 'adolescent' | 'adult' | 'elder';

// Seed interface
export interface Seed {
  id: string;
  name: string;
  patchType: PatchType;
  growthTimeMinutes: number;
  xpPerPlant: number;
  xpPerCheck: number;
  levelRequired: number;
  restrictedToPatchId?: string; // If set, seed can only be planted in this specific patch
}

// Animal interface
export interface Animal {
  id: string;
  name: string;
  species: string;
  penType: PenType;
  location: FarmLocation;
  stageDurations: {
    egg: number;      // minutes (0 if animal doesn't have egg stage)
    child: number;
    adolescent: number;
    adult: number;
  };
  xpPerCheck: number;
  xpPerHarvest: number;
  levelRequired: number;
}

// Patch location info
export interface PatchLocation {
  id: string;
  name: string;
  patchType: PatchType;
}

// Pen location info
export interface PenLocation {
  id: string;
  location: FarmLocation;
  penType: PenType;
  penNumber: number;
  name: string;
}

// User's planted patch
export interface PlantedPatch {
  id: string;
  patchLocationId: string;
  seedId: string | null;
  plantedAt: string | null;
  expectedHarvestAt: string | null;
  harvestedAt: string | null;
  amountPlanted: number;
}

// User's pen assignment
export interface AssignedPen {
  id: string;
  penLocationId: string;
  animalId: string | null;
  animalCount: number;
  placedAt: string | null;
  currentStage: AnimalStage;
  stageStartedAt: string | null;
  expectedNextStageAt: string | null;
  lastGatheredAt: string | null;
}

// XP Summary
export interface XPSummary {
  available: number;
  expected: number;
}

// Progress calculation result
export interface ProgressInfo {
  percentage: number;
  timeRemaining: string;
  isComplete: boolean;
  harvestAt?: Date;
}

// Time display format options
export type TimeFormat = 'approximate' | 'hm' | 'hms';

// User settings
export interface UserSettings {
  timeFormat: TimeFormat;
}
