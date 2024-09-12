import { createContext } from '@lit/context';
import { PlayerContext } from '../@types/contexts';

export const playerContext = createContext<PlayerContext>('player-context');
