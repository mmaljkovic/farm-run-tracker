import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserSettings, TimeFormat } from '../types';

const STORAGE_KEY = 'rs3-settings';

const defaultSettings: UserSettings = {
  timeFormat: 'hms',
};

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  setTimeFormat: (format: TimeFormat) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? { ...defaultSettings, ...JSON.parse(item) } : defaultSettings;
    } catch (error) {
      console.error('Error reading settings from localStorage:', error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  }, [settings]);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const setTimeFormat = useCallback((format: TimeFormat) => {
    updateSettings({ timeFormat: format });
  }, [updateSettings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, setTimeFormat }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
