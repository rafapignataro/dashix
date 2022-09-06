import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from "next-auth/react"

import { theme } from '../styles/theme';

function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme} resetCSS>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
		</ChakraProvider>
	);
}

export default App;
