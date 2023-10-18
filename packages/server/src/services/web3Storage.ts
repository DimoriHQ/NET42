import { Web3Storage } from "web3.storage";
import { WEB3_STORAGE_API_TOKEN } from "../config";

export const web3StorageClient = new Web3Storage({ token: WEB3_STORAGE_API_TOKEN });

export const createFilePath = (cid: string, filename: string) => {
  return `https://${cid}.ipfs.w3s.link/${filename}`;
};
