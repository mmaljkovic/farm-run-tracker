import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TreeDeciduous, Warehouse, Clock, TrendingUp } from 'lucide-react';
import { Card, ProgressBar } from '../components/ui';
import { usePatches, usePens } from '../hooks';
import { useSettings } from '../hooks/useSettings';
import { PATCH_LOCATIONS, PEN_LOCATIONS, PATCH_TYPE_NAMES, FARM_LOCATION_NAMES } from '../lib/constants';
import { calculatePatchProgress, calculatePatchXP, calculatePenXP, calculateAnimalStage, formatXP } from '../lib/calculations';
import { getSeedById } from '../data/seeds';
import { getAnimalById } from '../data/animals';

export function Dashboard() {
  const [, setTick] = useState(0);
  const { patches, activePatches } = usePatches();
  const { pens, activePens } = usePens();
  const { settings } = useSettings();

  // Force re-render every second for timer updates
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate XP summaries
  const patchXP = calculatePatchXP(patches);
  const penXP = calculatePenXP(pens);
  const totalXP = {
    available: patchXP.available + penXP.available,
    expected: patchXP.expected + penXP.expected,
  };

  // Get ready patches
  const readyPatches = activePatches.filter((p) => {
    const progress = calculatePatchProgress(p.plantedAt, p.expectedHarvestAt, settings.timeFormat);
    return progress.isComplete;
  });

  // Get ready pens
  const readyPens = activePens.filter((p) => {
    const animal = getAnimalById(p.animalId!);
    if (!animal) return false;
    const { stage } = calculateAnimalStage(p.placedAt, animal.stageDurations, settings.timeFormat);
    return stage === 'elder';
  });

  // Get upcoming items (sorted by completion time)
  const upcomingPatches = activePatches
    .filter((p) => !calculatePatchProgress(p.plantedAt, p.expectedHarvestAt, settings.timeFormat).isComplete)
    .sort((a, b) => {
      if (!a.expectedHarvestAt || !b.expectedHarvestAt) return 0;
      return new Date(a.expectedHarvestAt).getTime() - new Date(b.expectedHarvestAt).getTime();
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold rs-gold-text mb-2">Dashboard</h1>
        <p className="text-rs-tan">Overview of all your farming activities.</p>
      </div>

      {/* XP Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-rs-gold">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rs-green rounded border border-rs-border">
              <TrendingUp className="w-6 h-6 text-rs-gold" />
            </div>
            <div>
              <p className="text-sm text-rs-tan">Available XP</p>
              <p className="text-2xl font-bold text-rs-gold">{formatXP(totalXP.available)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rs-green rounded border border-rs-border">
              <TreeDeciduous className="w-6 h-6 text-rs-parchment" />
            </div>
            <div>
              <p className="text-sm text-rs-tan">Farming Patches XP</p>
              <p className="text-2xl font-bold text-rs-parchment">{formatXP(patchXP.expected)}</p>
              <p className="text-xs text-rs-gold">{formatXP(patchXP.available)} available</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rs-brown-light rounded border border-rs-border">
              <Warehouse className="w-6 h-6 text-rs-parchment" />
            </div>
            <div>
              <p className="text-sm text-rs-tan">Animal Farms XP</p>
              <p className="text-2xl font-bold text-rs-parchment">{formatXP(penXP.expected)}</p>
              <p className="text-xs text-rs-gold">{formatXP(penXP.available)} available</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Ready Items */}
      {(readyPatches.length > 0 || readyPens.length > 0) && (
        <Card title="Ready to Harvest" highlight>
          <div className="space-y-3">
            {readyPatches.map((patch) => {
              const location = PATCH_LOCATIONS.find((l) => l.id === patch.patchLocationId);
              const seed = getSeedById(patch.seedId!);
              return (
                <Link
                  key={patch.id}
                  to="/patches"
                  className="flex items-center justify-between p-3 bg-rs-brown-dark rounded border border-rs-border hover:border-rs-gold transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <TreeDeciduous className="w-5 h-5 text-rs-green-light" />
                    <div>
                      <p className="text-rs-parchment font-medium">{seed?.name}</p>
                      <p className="text-sm text-rs-tan">{location?.name}</p>
                    </div>
                  </div>
                  <span className="text-rs-gold font-semibold">Ready!</span>
                </Link>
              );
            })}
            {readyPens.map((pen) => {
              const location = PEN_LOCATIONS.find((l) => l.id === pen.penLocationId);
              const animal = getAnimalById(pen.animalId!);
              const route = location?.location === 'manor_farm' ? '/manor-farm' : '/ranch-out-of-time';
              return (
                <Link
                  key={pen.id}
                  to={route}
                  className="flex items-center justify-between p-3 bg-rs-brown-dark rounded border border-rs-border hover:border-rs-gold transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Warehouse className="w-5 h-5 text-rs-green-light" />
                    <div>
                      <p className="text-rs-parchment font-medium">{animal?.name} x{pen.animalCount}</p>
                      <p className="text-sm text-rs-tan">
                        {FARM_LOCATION_NAMES[location?.location || 'manor_farm']} - {location?.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-rs-gold font-semibold">Fully Grown!</span>
                </Link>
              );
            })}
          </div>
        </Card>
      )}

      {/* Upcoming */}
      {upcomingPatches.length > 0 && (
        <Card title="Upcoming Harvests">
          <div className="space-y-3">
            {upcomingPatches.map((patch) => {
              const location = PATCH_LOCATIONS.find((l) => l.id === patch.patchLocationId);
              const seed = getSeedById(patch.seedId!);
              const progress = calculatePatchProgress(patch.plantedAt, patch.expectedHarvestAt, settings.timeFormat);
              return (
                <div key={patch.id} className="p-3 bg-rs-brown-dark rounded border border-rs-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <TreeDeciduous className="w-5 h-5 text-rs-tan" />
                      <div>
                        <p className="text-rs-parchment font-medium">{seed?.name}</p>
                        <p className="text-sm text-rs-tan">
                          {PATCH_TYPE_NAMES[location?.patchType || 'tree']} - {location?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-rs-tan text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{progress.timeRemaining}</span>
                    </div>
                  </div>
                  <ProgressBar percentage={progress.percentage} size="sm" showPercentage={false} />
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/patches">
          <Card className="hover:border-rs-gold transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <TreeDeciduous className="w-8 h-8 text-rs-green-light" />
              <div>
                <p className="font-medium text-rs-parchment">Farming Patches</p>
                <p className="text-sm text-rs-tan">{activePatches.length} active</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/manor-farm">
          <Card className="hover:border-rs-gold transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Warehouse className="w-8 h-8 text-rs-tan" />
              <div>
                <p className="font-medium text-rs-parchment">Manor Farm</p>
                <p className="text-sm text-rs-tan">
                  {activePens.filter((p) => PEN_LOCATIONS.find((l) => l.id === p.penLocationId)?.location === 'manor_farm').length} pens active
                </p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/ranch-out-of-time">
          <Card className="hover:border-rs-gold transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-rs-gold" />
              <div>
                <p className="font-medium text-rs-parchment">Ranch Out of Time</p>
                <p className="text-sm text-rs-tan">
                  {activePens.filter((p) => PEN_LOCATIONS.find((l) => l.id === p.penLocationId)?.location === 'ranch_out_of_time').length} pens active
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
