import * as ethers from "ethers";
import abi from "../abi/NET42NFT.json";
import { NFT_CONTRACT_ADDRESS, RPC_HTTP } from "../config";

export const httpProvider = new ethers.providers.JsonRpcProvider(RPC_HTTP);
export const net42Contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, httpProvider);
