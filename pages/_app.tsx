import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';
import { darkTheme } from '../themes';

import '../styles/globals.css';
import { SearchContextProvider } from '../context';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </SearchContextProvider>
  )
}

export default MyApp
