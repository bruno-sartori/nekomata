import { createContext } from '@lit/context';
import { PlayerContext } from '../@types/contexts';

export const playerContext = createContext<PlayerContext>('player-context');

export const initialPlayerContext: PlayerContext = {
  playing: false,
  seek: 0,
  src: '',
  video: undefined,
  loaded: false,
  duration: 0,
  currentTime: 0
};
