import { createContext } from '@lit/context';
import { SettingsContext } from '../@types/contexts';

export const settingsContext = createContext<SettingsContext>('settings-context');

export const initialSettingsContext: SettingsContext = {
  ratingSystem: 'ClassInd',
  language: 'en',
};
