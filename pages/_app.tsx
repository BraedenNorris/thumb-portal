import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createTheme, NextUIProvider, Text } from "@nextui-org/react"
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#0070f3",
      upGradient: 'linear-gradient(90deg, hsla(145, 83%, 74%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)',
      downGradient: 'linear-gradient(90deg, hsla(336, 91%, 65%, 1) 0%, hsla(191, 76%, 45%, 1) 100%)',
    }
  }
});

const alchemyId = process.env.ALCHEMY_ID;

const { chains, provider, webSocketProvider } = configureChains(
  [ chain.rinkeby ],
  [
    alchemyProvider({ alchemyId }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Thumb Portal',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <NextUIProvider theme={theme}>
        <Component {...pageProps} />
        </NextUIProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
