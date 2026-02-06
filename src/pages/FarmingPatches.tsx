import { useState } from 'react';
import { PatchGrid } from '../components/farming';
import { Button } from '../components/ui';
import { PATCH_TYPE_NAMES } from '../lib/constants';
import type { PatchType } from '../types';

const patchTypes: PatchType[] = [
  'tree',
  'fruit_tree',
  'elder',
  'crystal',
  'calquat',
  'spirit_tree',
  'bush',
  'herb',
  'mushroom',
  'cactus',
  'belladonna',
  'allotment',
  'flower',
  'hops',
];

export function FarmingPatches() {
  const [activeType, setActiveType] = useState<PatchType>('tree');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold rs-gold-text mb-2">Farming Patches</h1>
        <p className="text-rs-tan">Track your tree, fruit tree, herb, and other farming patches.</p>
      </div>

      {/* Patch Type Tabs */}
      <div className="flex flex-wrap gap-2">
        {patchTypes.map((type) => (
          <Button
            key={type}
            variant={activeType === type ? 'gold' : 'secondary'}
            size="sm"
            onClick={() => setActiveType(type)}
          >
            {PATCH_TYPE_NAMES[type]}
          </Button>
        ))}
      </div>

      {/* Active Patch Grid */}
      <PatchGrid patchType={activeType} />
    </div>
  );
}
