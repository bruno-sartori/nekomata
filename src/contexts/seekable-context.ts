import { createContext } from '@lit/context';
import { SeekableContext } from '../@types/contexts';

export const seekableContext = createContext<SeekableContext>('seekable-context');

export const initialSeekableContext: SeekableContext = {
  rect: undefined,
  style: {
    backgroundImage: ''
  }
};
