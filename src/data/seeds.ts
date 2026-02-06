import type { Seed } from '../types';

// RS3 Wiki-accurate seed data (updated February 2026)
// Growth times are in minutes, XP values from wiki
export const SEEDS: Seed[] = [
  // Trees
  { id: 'oak', name: 'Oak', patchType: 'tree', growthTimeMinutes: 160, xpPerPlant: 14, xpPerCheck: 467.5, levelRequired: 15 },
  { id: 'willow', name: 'Willow', patchType: 'tree', growthTimeMinutes: 240, xpPerPlant: 25, xpPerCheck: 1456.5, levelRequired: 30 },
  { id: 'maple', name: 'Maple', patchType: 'tree', growthTimeMinutes: 320, xpPerPlant: 45, xpPerCheck: 3403.4, levelRequired: 45 },
  { id: 'yew', name: 'Yew', patchType: 'tree', growthTimeMinutes: 400, xpPerPlant: 81, xpPerCheck: 7069.9, levelRequired: 60 },
  { id: 'magic', name: 'Magic', patchType: 'tree', growthTimeMinutes: 480, xpPerPlant: 145.5, xpPerCheck: 13768.3, levelRequired: 75 },
  { id: 'elder', name: 'Elder', patchType: 'elder', growthTimeMinutes: 3840, xpPerPlant: 311.4, xpPerCheck: 23162.1, levelRequired: 90 },

  // Fruit Trees
  { id: 'apple', name: 'Apple', patchType: 'fruit_tree', growthTimeMinutes: 960, xpPerPlant: 22, xpPerCheck: 1199.5, levelRequired: 27 },
  { id: 'banana', name: 'Banana', patchType: 'fruit_tree', growthTimeMinutes: 960, xpPerPlant: 28, xpPerCheck: 1750.5, levelRequired: 33 },
  { id: 'orange', name: 'Orange', patchType: 'fruit_tree', growthTimeMinutes: 960, xpPerPlant: 35.5, xpPerCheck: 2470.2, levelRequired: 39 },
  { id: 'curry', name: 'Curry', patchType: 'fruit_tree', growthTimeMinutes: 960, xpPerPlant: 40, xpPerCheck: 2906.9, levelRequired: 42 },
  { id: 'pineapple', name: 'Pineapple', patchType: 'fruit_tree', growthTimeMinutes: 960, xpPerPlant: 57, xpPerCheck: 4605.7, levelRequired: 51 },
  { id: 'papaya', name: 'Papaya', patchType: 'fruit_tree', growthTimeMinutes: 960, xpPerPlant: 72, xpPerCheck: 6146.4, levelRequired: 57 },
  { id: 'palm', name: 'Palm', patchType: 'fruit_tree', growthTimeMinutes: 960, xpPerPlant: 110.5, xpPerCheck: 10150.1, levelRequired: 68 },

  // Calquat
  { id: 'calquat', name: 'Calquat', patchType: 'calquat', growthTimeMinutes: 1280, xpPerPlant: 130.5, xpPerCheck: 12096, levelRequired: 72 },

  // Bush
  { id: 'redberry', name: 'Redberry', patchType: 'bush', growthTimeMinutes: 100, xpPerPlant: 11.5, xpPerCheck: 64, levelRequired: 10 },
  { id: 'cadavaberry', name: 'Cadavaberry', patchType: 'bush', growthTimeMinutes: 120, xpPerPlant: 18, xpPerCheck: 102.5, levelRequired: 22 },
  { id: 'dwellberry', name: 'Dwellberry', patchType: 'bush', growthTimeMinutes: 140, xpPerPlant: 31.5, xpPerCheck: 177.5, levelRequired: 36 },
  { id: 'jangerberry', name: 'Jangerberry', patchType: 'bush', growthTimeMinutes: 160, xpPerPlant: 50.5, xpPerCheck: 284.5, levelRequired: 48 },
  { id: 'whiteberry', name: 'Whiteberry', patchType: 'bush', growthTimeMinutes: 160, xpPerPlant: 78, xpPerCheck: 437.5, levelRequired: 59 },
  { id: 'poisonIvy', name: 'Poison Ivy', patchType: 'bush', growthTimeMinutes: 160, xpPerPlant: 120, xpPerCheck: 675, levelRequired: 70 },

  // Herbs
  { id: 'guam', name: 'Guam', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 11, xpPerCheck: 12.5, levelRequired: 9 },
  { id: 'marrentill', name: 'Marrentill', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 13.5, xpPerCheck: 15, levelRequired: 14 },
  { id: 'tarromin', name: 'Tarromin', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 16, xpPerCheck: 18, levelRequired: 19 },
  { id: 'harralander', name: 'Harralander', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 21.5, xpPerCheck: 24, levelRequired: 26 },
  { id: 'ranarr', name: 'Ranarr', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 21.5, xpPerCheck: 30.5, levelRequired: 32 },
  { id: 'toadflax', name: 'Toadflax', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 34, xpPerCheck: 38.5, levelRequired: 38 },
  { id: 'iritSeed', name: 'Irit', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 43, xpPerCheck: 48.5, levelRequired: 44 },
  { id: 'avantoe', name: 'Avantoe', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 54.5, xpPerCheck: 61.5, levelRequired: 50 },
  { id: 'kwuarm', name: 'Kwuarm', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 69, xpPerCheck: 78, levelRequired: 56 },
  { id: 'bloodweed', name: 'Bloodweed', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 72, xpPerCheck: 81.4, levelRequired: 57, restrictedToPatchId: 'herb-wilderness' },
  { id: 'snapdragon', name: 'Snapdragon', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 87.5, xpPerCheck: 98.5, levelRequired: 62 },
  { id: 'cadantine', name: 'Cadantine', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 106.5, xpPerCheck: 120, levelRequired: 67 },
  { id: 'lantadyme', name: 'Lantadyme', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 134.5, xpPerCheck: 151.5, levelRequired: 73 },
  { id: 'dwarfWeed', name: 'Dwarf Weed', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 170.5, xpPerCheck: 192, levelRequired: 79 },
  { id: 'torstol', name: 'Torstol', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 199.5, xpPerCheck: 224.5, levelRequired: 85 },
  { id: 'fellstalk', name: 'Fellstalk', patchType: 'herb', growthTimeMinutes: 80, xpPerPlant: 225, xpPerCheck: 315.6, levelRequired: 91 },

  // Mushrooms
  { id: 'bittercap', name: 'Bittercap', patchType: 'mushroom', growthTimeMinutes: 240, xpPerPlant: 61.5, xpPerCheck: 57.7, levelRequired: 53 },
  { id: 'morchella', name: 'Morchella', patchType: 'mushroom', growthTimeMinutes: 240, xpPerPlant: 160, xpPerCheck: 77.7, levelRequired: 74 },

  // Cactus
  { id: 'cactus', name: 'Cactus', patchType: 'cactus', growthTimeMinutes: 560, xpPerPlant: 66.5, xpPerCheck: 374, levelRequired: 55 },
  { id: 'potatoCactus', name: 'Potato Cactus', patchType: 'cactus', growthTimeMinutes: 560, xpPerPlant: 205, xpPerCheck: 2700, levelRequired: 86 },
  { id: 'dragonfruit', name: 'Dragonfruit', patchType: 'cactus', growthTimeMinutes: 560, xpPerPlant: 400, xpPerCheck: 5888.7, levelRequired: 95 },

  // Spirit Tree
  { id: 'spiritTree', name: 'Spirit Tree', patchType: 'spirit_tree', growthTimeMinutes: 3840, xpPerPlant: 199.5, xpPerCheck: 19301.8, levelRequired: 83 },

  // Allotments
  { id: 'potato', name: 'Potato', patchType: 'allotment', growthTimeMinutes: 40, xpPerPlant: 8, xpPerCheck: 9, levelRequired: 1 },
  { id: 'onion', name: 'Onion', patchType: 'allotment', growthTimeMinutes: 40, xpPerPlant: 9.5, xpPerCheck: 10.5, levelRequired: 5 },
  { id: 'cabbage', name: 'Cabbage', patchType: 'allotment', growthTimeMinutes: 40, xpPerPlant: 10, xpPerCheck: 11.5, levelRequired: 7 },
  { id: 'tomato', name: 'Tomato', patchType: 'allotment', growthTimeMinutes: 40, xpPerPlant: 12.5, xpPerCheck: 14, levelRequired: 12 },
  { id: 'sweetcorn', name: 'Sweetcorn', patchType: 'allotment', growthTimeMinutes: 60, xpPerPlant: 17, xpPerCheck: 19, levelRequired: 20 },
  { id: 'strawberry', name: 'Strawberry', patchType: 'allotment', growthTimeMinutes: 60, xpPerPlant: 26, xpPerCheck: 29, levelRequired: 31 },
  { id: 'watermelon', name: 'Watermelon', patchType: 'allotment', growthTimeMinutes: 80, xpPerPlant: 48.5, xpPerCheck: 54.5, levelRequired: 47 },
  { id: 'snapeGrass', name: 'Snape Grass', patchType: 'allotment', growthTimeMinutes: 200, xpPerPlant: 175, xpPerCheck: 80, levelRequired: 80 },
  { id: 'sunchoke', name: 'Sunchoke', patchType: 'allotment', growthTimeMinutes: 200, xpPerPlant: 208, xpPerCheck: 95, levelRequired: 87 },

  // Hops
  { id: 'barley', name: 'Barley', patchType: 'hops', growthTimeMinutes: 40, xpPerPlant: 8.5, xpPerCheck: 9.5, levelRequired: 3 },
  { id: 'hammerstone', name: 'Hammerstone', patchType: 'hops', growthTimeMinutes: 40, xpPerPlant: 9, xpPerCheck: 10, levelRequired: 4 },
  { id: 'asgarnian', name: 'Asgarnian', patchType: 'hops', growthTimeMinutes: 50, xpPerPlant: 10.5, xpPerCheck: 12, levelRequired: 8 },
  { id: 'jute', name: 'Jute', patchType: 'hops', growthTimeMinutes: 50, xpPerPlant: 13, xpPerCheck: 14.5, levelRequired: 13 },
  { id: 'yanillian', name: 'Yanillian', patchType: 'hops', growthTimeMinutes: 60, xpPerPlant: 14.5, xpPerCheck: 16, levelRequired: 16 },
  { id: 'krandorian', name: 'Krandorian', patchType: 'hops', growthTimeMinutes: 70, xpPerPlant: 17.5, xpPerCheck: 19.5, levelRequired: 21 },
  { id: 'wildblood', name: 'Wildblood', patchType: 'hops', growthTimeMinutes: 80, xpPerPlant: 23, xpPerCheck: 26, levelRequired: 28 },

  // Flowers
  { id: 'marigold', name: 'Marigold', patchType: 'flower', growthTimeMinutes: 20, xpPerPlant: 8.5, xpPerCheck: 47, levelRequired: 2 },
  { id: 'rosemary', name: 'Rosemary', patchType: 'flower', growthTimeMinutes: 20, xpPerPlant: 12, xpPerCheck: 66.5, levelRequired: 11 },
  { id: 'nasturtium', name: 'Nasturtium', patchType: 'flower', growthTimeMinutes: 20, xpPerPlant: 19.5, xpPerCheck: 111, levelRequired: 24 },
  { id: 'woad', name: 'Woad', patchType: 'flower', growthTimeMinutes: 20, xpPerPlant: 20.5, xpPerCheck: 115.5, levelRequired: 25 },
  { id: 'limpwurt', name: 'Limpwurt', patchType: 'flower', growthTimeMinutes: 20, xpPerPlant: 21.5, xpPerCheck: 120, levelRequired: 26 },
  { id: 'whiteWLily', name: 'White Lily', patchType: 'flower', growthTimeMinutes: 160, xpPerPlant: 50, xpPerCheck: 250, levelRequired: 52 },

  // Belladonna
  { id: 'belladonna', name: 'Belladonna', patchType: 'belladonna', growthTimeMinutes: 320, xpPerPlant: 91, xpPerCheck: 330, levelRequired: 63 },

  // Crystal Tree
  { id: 'crystalTree', name: 'Crystal Tree', patchType: 'crystal', growthTimeMinutes: 0, xpPerPlant: 50000, xpPerCheck: 15000, levelRequired: 94 },
];

// Helper to get seeds by patch type
// If patchLocationId is provided, includes restricted seeds for that specific patch
// If patchLocationId is not provided, excludes all restricted seeds
export const getSeedsByPatchType = (patchType: string, patchLocationId?: string): Seed[] => {
  return SEEDS.filter(seed => {
    if (seed.patchType !== patchType) return false;

    // If seed has a restriction
    if (seed.restrictedToPatchId) {
      // Only include if we're looking at that specific patch
      return patchLocationId === seed.restrictedToPatchId;
    }

    // No restriction - always include
    return true;
  });
};

// Helper to get a seed by ID
export const getSeedById = (id: string): Seed | undefined => {
  return SEEDS.find(seed => seed.id === id);
};
