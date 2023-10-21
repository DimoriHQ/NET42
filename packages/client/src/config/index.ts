import abi from "../abi/NET42NFT.json";

const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as `0x${string}`;
const explorerURL = import.meta.env.VITE_EXPLORER_URL! as string;
const apiURL = import.meta.env.VITE_API_URL! as string;
const networkType = import.meta.env.VITE_NETWORK_TYPE! as string;
const web3StorageAPIToken = import.meta.env.VITE_WEB3_STORAGE_API_TOKEN! as string;

const config = {
  contractAddress,
  contract: {
    address: contractAddress,
    abi: abi as any,
  },
  explorerURL,
  apiURL,
  networkType,
  isTestnet: networkType === "testnet",
  web3StorageAPIToken,
};

export default config;
