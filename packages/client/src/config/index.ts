import abi from "../abi/NET42NFT.json";

const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as `0x${string}`;
const explorerURL = import.meta.env.VITE_EXPLORER_URL! as string;
const apiURL = import.meta.env.VITE_API_URL! as string;
const networkType = import.meta.env.VITE_NETWORK_TYPE! as string;

const config = {
  contractAddress,
  contract: {
    address: {
      scroll: contractAddress,
    },
    abi: abi as any,
  },
  explorerURL,
  apiURL,
  networkType,
  isTestnet: networkType === "testnet",
};

export default config;
