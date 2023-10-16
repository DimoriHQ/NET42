import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { ethers } from "ethers";
import LocalStorage from "../../services/localStorage";
import { web3AuthConfig } from "../../services/safe";

export const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);

export const tokenStorage = new LocalStorage<string>("token");

export type AuthReducer = {
  isLoading: boolean;

  provider?: ethers.providers.Web3Provider;
  web3AuthModalPack: Web3AuthModalPack;

  isVerifyInit: boolean;
  isVerifyLoading: boolean;
  isVerify: boolean;
  isAdmin: boolean;

  token: string;
};

export const defaultAuthReducer: AuthReducer = {
  isLoading: false,
  web3AuthModalPack: web3AuthModalPack,

  isVerifyInit: false,
  isVerifyLoading: false,
  isVerify: false,
  isAdmin: false,

  token: tokenStorage.get(""),
};
