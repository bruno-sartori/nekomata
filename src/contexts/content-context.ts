import { createContext } from '@lit/context';
import { ContentContext } from '../@types/contexts';

export const contentContext = createContext<ContentContext>('content-context');

export const initialContentContext: ContentContext = {};
