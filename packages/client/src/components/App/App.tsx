import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Provider } from "react-redux";
import { configureChains, createConfig, WagmiConfig } from "wagmi"; // wagmi, walletconnect
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { store } from "../../app/store";
import "../../styles/main.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import PopupProvider from "../Popup/PopupProvider";
import Router from "../Router/Router";
import Toast from "../Toast/Toast";

const App: React.FC = () => {
  const { chains, publicClient } = configureChains(
    [
      // TO-DO: change to scroll, polygon, mantle
    ],
    [
      alchemyProvider({
        apiKey: import.meta.env.VITE_ALCHEMY_KEY!,
      }),
      publicProvider(),
    ],
  );

  const { connectors } = getDefaultWallets({
    appName: "NET42.run",
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID!,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Provider store={store}>
          <div className="main-body w-full leading-6">
            <Header />
            <PopupProvider>
              <Toast />
              <Router />
            </PopupProvider>
            <Footer />
          </div>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
export default App;
