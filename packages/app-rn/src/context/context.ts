import { createContext } from 'react';
import { AppContext } from '@/types';

export const defaultContextValue: AppContext = {
  auth: null,
};

export const appContext = createContext(defaultContextValue);
const { Provider, Consumer } = appContext;

export { Provider, Consumer };
