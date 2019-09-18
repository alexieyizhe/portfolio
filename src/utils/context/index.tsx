import React, { createContext, useContext, useState, useCallback } from "react";

export interface SiteState {
  easterEggActive: boolean;
  activateEasterEgg: () => void;

  darkModeActive: boolean;
  toggleDarkMode: () => void;
}

export const defaultState: SiteState = {
  easterEggActive: false,
  activateEasterEgg: () => {},

  darkModeActive: false,
  toggleDarkMode: () => {},
};

export const SiteContext: React.Context<SiteState> = createContext(
  defaultState
);

export const useSiteContext = () => useContext(SiteContext);

export const SiteProvider: React.FC = ({ children, ...rest }) => {
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [darkModeActive, setDarkModeActive] = useState(false);

  const activateEasterEgg = useCallback(() => setEasterEggActive(true), []);
  const toggleDarkMode = useCallback(
    () => setDarkModeActive(prevVal => !prevVal),
    []
  );

  const curState: SiteState = {
    easterEggActive,
    activateEasterEgg,

    darkModeActive,
    toggleDarkMode,
  };

  return (
    <SiteContext.Provider value={curState} {...rest}>
      {children}
    </SiteContext.Provider>
  );
};
