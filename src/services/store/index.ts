import { createStoreon } from 'storeon';
import { useStoreon } from 'storeon/preact';

import type { TPageInitialProps } from 'pages/index';
import { createSiteModule, TSiteModuleEvents, TSiteModuleState } from './site';
import {
  createThemeModule,
  TThemeModuleEvents,
  TThemeModuleState,
} from './theme';

type TStoreState = TSiteModuleState & TThemeModuleState;
type TStoreEvents = TSiteModuleEvents & TThemeModuleEvents;

export const createSiteStore = (initialProps: TPageInitialProps) =>
  createStoreon<TStoreState, TStoreEvents>([
    createSiteModule(initialProps),
    createThemeModule(),
  ]);

export const createThemeStore = () =>
  createStoreon<TThemeModuleState, TThemeModuleEvents>([createThemeModule()]);

export const useStore = (...keys: (keyof TStoreState)[]) =>
  useStoreon<TStoreState, TStoreEvents>(...keys);
