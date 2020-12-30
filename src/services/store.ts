import create from 'zustand';

type TSiteState = {
  isInterested: boolean;
  isEasterEggActive: boolean;
  displayedSection: 'about' | 'work';
};

type TSiteActions = {
  toggleInterest: (interested?: boolean) => void;
  toggleEasterEgg: (active?: boolean) => void;
  toggleDisplayedSection: (section?: 'about' | 'work') => void;
};

export type TSiteStoreValue = TSiteState & TSiteActions;

export type TStoreSelector = (state: TSiteStoreValue) => any;

export const useSiteStore = create<TSiteStoreValue>((set) => ({
  isInterested: false,
  isEasterEggActive: false,
  displayedSection: 'about',
  toggleInterest: (interested?: boolean) =>
    set((state) => ({ isInterested: interested ?? !state.isInterested })),
  toggleEasterEgg: (active?: boolean) =>
    set((state) => ({ isEasterEggActive: active ?? !state.isEasterEggActive })),
  toggleDisplayedSection: (section?: 'about' | 'work') =>
    set((state) => ({
      displayedSection:
        section ?? state.displayedSection === 'about' ? 'work' : 'about',
    })),
}));
