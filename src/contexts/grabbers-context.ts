import { createContext } from '@lit/context';
import { GrabbersContext } from '../@types/contexts';

export const grabbersContext = createContext<GrabbersContext>('grabbers-context');

export const initialGrabbersContext: GrabbersContext = {
  visible: false,
  currentlyGrabbed: undefined,
};
