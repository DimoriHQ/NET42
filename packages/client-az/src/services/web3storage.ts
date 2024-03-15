import { Web3Storage } from "web3.storage";
import config from "../config";

export const web3StorageClient = new Web3Storage({ token: config.web3StorageAPIToken });

export const createFilePath = (cid: string, filename: string) => {
  return `https://${cid}.ipfs.w3s.link/${filename}`;
};
