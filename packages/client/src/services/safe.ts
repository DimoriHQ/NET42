import { Web3AuthConfig } from "@safe-global/auth-kit";
import { scrollSepolia } from "@wagmi/core/chains";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter, OpenloginAdapterOptions } from "@web3auth/openlogin-adapter";

// https://dashboard.web3auth.io/
// https://chainlist.org/

export const safeScrollOptions: Web3AuthOptions = {
  clientId: "BNUr_r-K_wFcFV9L6oUvz8rIH9Jree3r06YgQ5VIaMs0aJV5jUeU9qXr9-arA9YshjrSV2vCtYM07JN2yDXrLWE",
  web3AuthNetwork: "testnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    displayName: scrollSepolia.name,
    chainId: "0x8274f",
    rpcTarget: "https://prettiest-warmhearted-telescope.scroll-testnet.discover.quiknode.pro/6cf890e6652e57165ce1f693f607fd19c4cc3c23/",
    blockExplorer: scrollSepolia.blockExplorers.default.url,
  },
  uiConfig: {
    appName: "NET42.run",
    theme: "dark",
  },
};

export const modalConfig = {
  [WALLET_ADAPTERS.TORUS_EVM]: {
    label: "Torus",
    showOnDesktop: false,
    showOnMobile: false,
  },
  [WALLET_ADAPTERS.METAMASK]: {
    label: "Metamask",
    showOnDesktop: true,
    showOnMobile: true,
  },
};

export const safeLoginParams: OpenloginAdapterOptions = {
  loginSettings: {
    mfaLevel: "optional",
  },
  adapterSettings: {
    uxMode: "redirect",
    whiteLabel: {
      name: "NET42.run",
    },
  },
};

export const openLoginAdapter = new OpenloginAdapter(safeLoginParams);

export const web3AuthConfig: Web3AuthConfig = {
  txServiceUrl: "https://transaction-sepolia.safe.scroll.xyz",
};
