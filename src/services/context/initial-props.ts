import { createContext, useContext } from 'react';

import type { TPageInitialProps } from 'pages/index';

export const InitialPropsContext = createContext<TPageInitialProps>({} as any);

export const InitialPropsContextProvider = InitialPropsContext.Provider;

export const useInitialProps = () => useContext(InitialPropsContext);
