import abi from "../services/abi.json";

const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as `0x${string}`;
const explorerURL = import.meta.env.VITE_EXPLORER_URL! as string;
const apiURL = import.meta.env.VITE_API_URL! as string;

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
};

export default config;
