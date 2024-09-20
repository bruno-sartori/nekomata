import { createContext } from '@lit/context';
import { UserContext } from '../@types/contexts';

export const userContext = createContext<UserContext>('user-context');

export const initialUserContext: UserContext = {
  name: '',
  email: '',
  pendingUploads: [],
};
