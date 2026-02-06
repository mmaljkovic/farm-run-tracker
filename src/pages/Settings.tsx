import { Settings as SettingsIcon, Clock } from 'lucide-react';
import { Card, Select } from '../components/ui';
import { useSettings } from '../hooks/useSettings';
import type { TimeFormat } from '../types';

const TIME_FORMAT_OPTIONS = [
  { value: 'approximate', label: 'Approximate (e.g., "About 2 hours")' },
  { value: 'hm', label: 'Hours & Minutes (e.g., "2h 30m")' },
  { value: 'hms', label: 'Hours, Minutes & Seconds (e.g., "2h 30m 45s")' },
];

export function Settings() {
  const { settings, setTimeFormat } = useSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold rs-gold-text mb-2">Settings</h1>
        <p className="text-rs-tan">Customize your farming tracker experience.</p>
      </div>

      <Card title="Display Preferences">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-rs-gold" />
              <h3 className="text-rs-parchment font-medium">Time Display Format</h3>
            </div>
            <p className="text-sm text-rs-tan mb-3">
              Choose how remaining time is displayed for patches and animals.
            </p>
            <Select
              options={TIME_FORMAT_OPTIONS}
              value={settings.timeFormat}
              onChange={(e) => setTimeFormat(e.target.value as TimeFormat)}
              placeholder="Select time format..."
            />
            <div className="mt-3 p-3 bg-rs-brown-dark rounded border border-rs-border">
              <p className="text-sm text-rs-tan">Preview:</p>
              <p className="text-rs-parchment font-medium mt-1">
                {settings.timeFormat === 'approximate' && 'About 2 hours'}
                {settings.timeFormat === 'hm' && '2h 30m'}
                {settings.timeFormat === 'hms' && '2h 30m 45s'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card title="About">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-rs-green rounded border border-rs-border">
            <SettingsIcon className="w-6 h-6 text-rs-gold" />
          </div>
          <div>
            <p className="text-rs-parchment font-medium">RS3 Farm Run Tracker</p>
            <p className="text-sm text-rs-tan mt-1">
              Track your farming patches and animal pens with accurate growth times from the RS3 Wiki.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
