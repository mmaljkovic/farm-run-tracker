import { PenGrid } from '../components/animals';

export function ManorFarm() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold rs-gold-text mb-2">Manor Farm</h1>
        <p className="text-rs-tan">Track your Player Owned Farm animals and breeding progress.</p>
      </div>

      <PenGrid farmLocation="manor_farm" />
    </div>
  );
}
