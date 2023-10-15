import { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";

const createProvider = (web3authProvider: SafeEventEmitterProvider) => {
  const ethersProvider = new ethers.BrowserProvider(web3authProvider);
  return ethersProvider;
};

export default createProvider;
