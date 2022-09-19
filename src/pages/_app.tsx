import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from "next-auth/react"
import { withTRPC } from '@trpc/next';

import { theme } from '../styles/theme';

import { ServerRouter } from '../server/routes';

function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme} resetCSS>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
		</ChakraProvider>
	);
}

export default withTRPC<ServerRouter>({
  config({ ctx }) {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return { url };
  },
})(App);
