import { Sprout } from 'lucide-react';

export function Header() {
  return (
    <header className="rs-header px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-rs-green rounded border border-rs-border">
          <Sprout className="w-7 h-7 text-rs-gold" />
        </div>
        <div>
          <h1 className="text-2xl font-bold rs-gold-text tracking-wide">
            Farming Tracker
          </h1>
          <p className="text-sm text-rs-tan">Track your farming runs</p>
        </div>
      </div>
    </header>
  );
}
