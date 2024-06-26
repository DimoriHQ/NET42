import { InjectedConnector } from "@wagmi/core";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { defineChain } from "viem";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useAppSelector } from "../../app/hooks";
import config from "../../config";
import { selectAuth } from "../../features/authentication/reducer";
import "../../styles/main.scss";
import PopupProvider from "../Popup/PopupProvider";
import Router from "../Router/Router";
import Toast from "../Toast/Toast";

// https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/wagmi-connector/rainbowkit-react-modal-example
// https://www.npmjs.com/package/web3-token
// EIP-4361
// https://eips.ethereum.org/EIPS/eip-4361
// https://www.rainbowkit.com/docs/authentication
// https://wagmi.sh/examples/sign-in-with-ethereu

export const scrollS = defineChain({
  id: 534_351,
  name: "Scroll Sepolia",
  network: "scroll-sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.scroll.io"],
      webSocket: ["wss://scroll-public.scroll-testnet.quiknode.pro"],
    },
    public: {
      http: ["https://sepolia-rpc.scroll.io"],
      webSocket: ["wss://scroll-public.scroll-testnet.quiknode.pro"],
    },
  },
  blockExplorers: {
    default: {
      name: "scrollscan",
      url: "https://sepolia.scrollscan.dev",
    },
    blockscout: {
      name: "Blockscout",
      url: "https://sepolia-blockscout.scroll.io",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 9473,
    },
  },
  testnet: true,
});

const testnetChains = [scrollS];

const App: React.FC = () => {
  const auth = useAppSelector(selectAuth);

  const { chains, publicClient, webSocketPublicClient } = configureChains(testnetChains, [
    alchemyProvider({
      apiKey: import.meta.env.VITE_ALCHEMY_KEY!,
    }),
    publicProvider(),
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      new Web3AuthConnector({
        chains,
        options: {
          web3AuthInstance: auth.web3Auth,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: config.walletConnectProfileId,
          showQrModal: true,
        },
      }),
      new InjectedConnector({ chains, options: { name: "Injected", shimDisconnect: true } }),
    ],
    publicClient,
    webSocketPublicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <PopupProvider>
        <Router />
        <Toast />
      </PopupProvider>
    </WagmiConfig>
  );
};

export default App;
