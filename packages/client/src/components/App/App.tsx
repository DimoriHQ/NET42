import { InjectedConnector } from "@wagmi/core";
import { mantleTestnet, polygonMumbai } from "@wagmi/core/chains";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Provider } from "react-redux";
import { defineChain } from "viem";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";
import { selectAuth } from "../../features/authentication/reducer";
import { safeLoginParams } from "../../services/safe";
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

const scroll = defineChain({
  id: 534_351,
  name: "Scroll Sepolia",
  network: "scroll-sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.scroll.io"],
      webSocket: ["wss://prettiest-warmhearted-telescope.scroll-testnet.discover.quiknode.pro/6cf890e6652e57165ce1f693f607fd19c4cc3c23/"],
    },
    public: {
      http: ["https://sepolia-rpc.scroll.io"],
      webSocket: ["wss://prettiest-warmhearted-telescope.scroll-testnet.discover.quiknode.pro/6cf890e6652e57165ce1f693f607fd19c4cc3c23/"],
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

const testnetChains = [scroll as any, polygonMumbai, mantleTestnet];

const App: React.FC = () => {
  const auth = useAppSelector(selectAuth);

  const { chains, publicClient, webSocketPublicClient } = configureChains(testnetChains, [
    alchemyProvider({
      apiKey: import.meta.env.VITE_ALCHEMY_KEY!,
    }),
    publicProvider(),
  ]);

  const connector = new Web3AuthConnector({
    chains,
    options: {
      web3AuthInstance: auth.web3AuthModalPack.web3Auth!,
      loginParams: safeLoginParams,
    },
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      connector,
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
    publicClient,
    webSocketPublicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
        <PopupProvider>
          <Router />
          <Toast />
        </PopupProvider>
      </Provider>
    </WagmiConfig>
  );
};

export default App;
