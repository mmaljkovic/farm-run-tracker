import { PenGrid } from '../components/animals';

export function RanchOutOfTime() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold rs-gold-text mb-2">Ranch Out of Time</h1>
        <p className="text-rs-tan">Track your Anachronia dinosaur farm animals and breeding progress.</p>
      </div>

      <PenGrid farmLocation="ranch_out_of_time" />
    </div>
  );
}
