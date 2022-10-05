import React, { useState } from "react";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { ConnectKitProvider } from "connectkit";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { ConnectButton } from "./ConnectButton";

/*
  to use Infura, uncomment the commented lines below and fill in the Config
*/
// import CONFIG from '../../config.json'
// import { infuraProvider } from 'wagmi/providers/infura'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  // infuraProvider({ apiKey: CONFIG.INFURA_ID }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const Dapp = () => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="minimal">
        <div>
          <ConnectButton />
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default Dapp;
