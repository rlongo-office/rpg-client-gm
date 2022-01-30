import { createContext, useContext } from 'react';
import creatures from '../data/collections/creatures.json'

const AppContext = createContext();

export function AppWrapper({children}) {
  let sharedState = creatures

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}