import type { PatchLocation, PenLocation } from '../types';

// All farming patch locations in RS3
export const PATCH_LOCATIONS: PatchLocation[] = [
  // Trees (7 patches)
  { id: 'tree-lumbridge', name: 'Lumbridge', patchType: 'tree' },
  { id: 'tree-varrock', name: 'Varrock Castle', patchType: 'tree' },
  { id: 'tree-falador', name: 'Falador Park', patchType: 'tree' },
  { id: 'tree-taverley', name: 'Taverley', patchType: 'tree' },
  { id: 'tree-gnome', name: 'Gnome Stronghold', patchType: 'tree' },
  { id: 'tree-prifddinas', name: 'Prifddinas', patchType: 'tree' },
  { id: 'tree-woodcutters', name: "Woodcutters' Grove", patchType: 'tree' },

  // Fruit Trees (7 patches)
  { id: 'fruit-gnome-stronghold', name: 'Gnome Stronghold', patchType: 'fruit_tree' },
  { id: 'fruit-gnome-village', name: 'Tree Gnome Village', patchType: 'fruit_tree' },
  { id: 'fruit-catherby', name: 'Catherby', patchType: 'fruit_tree' },
  { id: 'fruit-brimhaven', name: 'Brimhaven', patchType: 'fruit_tree' },
  { id: 'fruit-lletya', name: 'Lletya', patchType: 'fruit_tree' },
  { id: 'fruit-herblore', name: 'Herblore Habitat', patchType: 'fruit_tree' },
  { id: 'fruit-prifddinas', name: 'Prifddinas', patchType: 'fruit_tree' },

  // Calquat (1 patch)
  { id: 'calquat-tai', name: 'Tai Bwo Wannai', patchType: 'calquat' },

  // Bush (5 patches)
  { id: 'bush-champions', name: "Champions' Guild", patchType: 'bush' },
  { id: 'bush-rimmington', name: 'Rimmington', patchType: 'bush' },
  { id: 'bush-etceteria', name: 'Etceteria', patchType: 'bush' },
  { id: 'bush-ardougne', name: 'South Ardougne', patchType: 'bush' },
  { id: 'bush-prifddinas', name: 'Prifddinas', patchType: 'bush' },

  // Herb (8 patches - Wilderness can also grow Bloodweed)
  { id: 'herb-falador', name: 'Falador', patchType: 'herb' },
  { id: 'herb-phasmatys', name: 'Port Phasmatys', patchType: 'herb' },
  { id: 'herb-catherby', name: 'Catherby', patchType: 'herb' },
  { id: 'herb-ardougne', name: 'Ardougne', patchType: 'herb' },
  { id: 'herb-troll', name: 'Troll Stronghold', patchType: 'herb' },
  { id: 'herb-prifddinas', name: 'Prifddinas', patchType: 'herb' },
  { id: 'herb-wilderness', name: 'Wilderness', patchType: 'herb' },
  { id: 'herb-kharid', name: 'Garden of Kharid', patchType: 'herb' },

  // Mushroom (3 patches)
  { id: 'mushroom-canifis', name: 'Canifis', patchType: 'mushroom' },
  { id: 'mushroom-tirannwn', name: 'Isafdar', patchType: 'mushroom' },
  { id: 'mushroom-um', name: 'City of Um', patchType: 'mushroom' },

  // Cactus (4 patches)
  { id: 'cactus-al-kharid', name: 'Al Kharid', patchType: 'cactus' },
  { id: 'cactus-menaphos', name: 'Menaphos Imperial District', patchType: 'cactus' },
  { id: 'cactus-anachronia', name: 'Anachronia', patchType: 'cactus' },
  { id: 'cactus-hets-oasis', name: "Het's Oasis", patchType: 'cactus' },

  // Allotments (2 patches per location, 5 locations)
  { id: 'allotment-falador-1', name: 'Falador South 1', patchType: 'allotment' },
  { id: 'allotment-falador-2', name: 'Falador South 2', patchType: 'allotment' },
  { id: 'allotment-phasmatys-1', name: 'Port Phasmatys 1', patchType: 'allotment' },
  { id: 'allotment-phasmatys-2', name: 'Port Phasmatys 2', patchType: 'allotment' },
  { id: 'allotment-catherby-1', name: 'Catherby 1', patchType: 'allotment' },
  { id: 'allotment-catherby-2', name: 'Catherby 2', patchType: 'allotment' },
  { id: 'allotment-ardougne-1', name: 'Ardougne North 1', patchType: 'allotment' },
  { id: 'allotment-ardougne-2', name: 'Ardougne North 2', patchType: 'allotment' },
  { id: 'allotment-harmony-1', name: 'Harmony Island 1', patchType: 'allotment' },
  { id: 'allotment-harmony-2', name: 'Harmony Island 2', patchType: 'allotment' },

  // Flower (1 per allotment location)
  { id: 'flower-falador', name: 'Falador South', patchType: 'flower' },
  { id: 'flower-phasmatys', name: 'Port Phasmatys', patchType: 'flower' },
  { id: 'flower-catherby', name: 'Catherby', patchType: 'flower' },
  { id: 'flower-ardougne', name: 'Ardougne North', patchType: 'flower' },
  { id: 'flower-zolarea', name: 'Zolarea', patchType: 'flower' },

  // Hops (4 patches)
  { id: 'hops-lumbridge', name: 'Lumbridge', patchType: 'hops' },
  { id: 'hops-mcgrubor', name: "McGrubor's Wood", patchType: 'hops' },
  { id: 'hops-yanille', name: 'Yanille', patchType: 'hops' },
  { id: 'hops-entrana', name: 'Entrana', patchType: 'hops' },

  // Spirit Tree (4 patches)
  { id: 'spirit-tree-etceteria', name: 'Etceteria', patchType: 'spirit_tree' },
  { id: 'spirit-tree-sarim', name: 'Port Sarim', patchType: 'spirit_tree' },
  { id: 'spirit-tree-brimhaven', name: 'Brimhaven', patchType: 'spirit_tree' },
  { id: 'spirit-tree-manor-farm', name: 'Manor Farm', patchType: 'spirit_tree' },

  // Belladonna (1 patch)
  { id: 'belladonna-draynor', name: 'Draynor Manor', patchType: 'belladonna' },

  // Elder Tree (2 patches)
  { id: 'elder-prifddinas', name: 'Prifddinas', patchType: 'elder' },
  { id: 'elder-edgeville', name: 'Edgeville', patchType: 'elder' },

  // Crystal Tree (1 patch)
  { id: 'crystal-prifddinas', name: 'Prifddinas', patchType: 'crystal' },
];

// All pen locations
export const PEN_LOCATIONS: PenLocation[] = [
  // Manor Farm
  { id: 'mf-small-1', location: 'manor_farm', penType: 'small', penNumber: 1, name: 'Small Pen 1' },
  { id: 'mf-small-2', location: 'manor_farm', penType: 'small', penNumber: 2, name: 'Small Pen 2' },
  { id: 'mf-medium-1', location: 'manor_farm', penType: 'medium', penNumber: 1, name: 'Medium Pen 1' },
  { id: 'mf-medium-2', location: 'manor_farm', penType: 'medium', penNumber: 2, name: 'Medium Pen 2' },
  { id: 'mf-large-1', location: 'manor_farm', penType: 'large', penNumber: 1, name: 'Large Pen 1' },
  { id: 'mf-large-2', location: 'manor_farm', penType: 'large', penNumber: 2, name: 'Large Pen 2' },
  { id: 'mf-breeding', location: 'manor_farm', penType: 'breeding', penNumber: 1, name: 'Breeding Pen' },

  // Ranch Out of Time
  { id: 'root-small-1', location: 'ranch_out_of_time', penType: 'small', penNumber: 1, name: 'Small Pen 1' },
  { id: 'root-small-2', location: 'ranch_out_of_time', penType: 'small', penNumber: 2, name: 'Small Pen 2' },
  { id: 'root-medium-1', location: 'ranch_out_of_time', penType: 'medium', penNumber: 1, name: 'Medium Pen 1' },
  { id: 'root-medium-2', location: 'ranch_out_of_time', penType: 'medium', penNumber: 2, name: 'Medium Pen 2' },
  { id: 'root-large-1', location: 'ranch_out_of_time', penType: 'large', penNumber: 1, name: 'Large Pen 1' },
  { id: 'root-large-2', location: 'ranch_out_of_time', penType: 'large', penNumber: 2, name: 'Large Pen 2' },
  { id: 'root-breeding', location: 'ranch_out_of_time', penType: 'breeding', penNumber: 1, name: 'Breeding Pen' },
];

// Patch type display names
export const PATCH_TYPE_NAMES: Record<string, string> = {
  tree: 'Trees',
  fruit_tree: 'Fruit Trees',
  calquat: 'Calquat',
  bush: 'Bush',
  herb: 'Herb',
  mushroom: 'Mushroom',
  cactus: 'Cactus',
  allotment: 'Allotment',
  hops: 'Hops',
  spirit_tree: 'Spirit Trees',
  flower: 'Flower',
  belladonna: 'Belladonna',
  elder: 'Elder Trees',
  crystal: 'Crystal Tree',
};

// Pen type display names
export const PEN_TYPE_NAMES: Record<string, string> = {
  small: 'Small Pen',
  medium: 'Medium Pen',
  large: 'Large Pen',
  breeding: 'Breeding Pen',
};

// Farm location display names
export const FARM_LOCATION_NAMES: Record<string, string> = {
  manor_farm: 'Manor Farm',
  ranch_out_of_time: 'Ranch Out of Time',
};

// Animal stage display names
export const STAGE_NAMES: Record<string, string> = {
  egg: 'Egg',
  child: 'Child',
  adolescent: 'Adolescent',
  adult: 'Adult',
  elder: 'Elder',
};
