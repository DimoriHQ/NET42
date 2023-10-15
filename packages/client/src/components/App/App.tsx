import { InjectedConnector } from "@wagmi/core";
import { mantleTestnet, polygonMumbai, scrollSepolia } from "@wagmi/core/chains";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Provider } from "react-redux";
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

const testnetChains = [scrollSepolia, polygonMumbai, mantleTestnet];

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
