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
  isStravaConnected: boolean;

  stravaProfile?: {
    id: number;
    username: string;
    resource_state: number;
    firstname: string;
    lastname: string;
    bio: string;
    city: string;
    state: string;
    country: string;
    sex: string;
    premium: boolean;
    summit: boolean;
    created_at: string;
    updated_at: string;
    badge_type_id: number;
    weight: number;
    profile_medium: string;
    profile: string;
    friend: any;
    follower: any;
  };

  token: string;
};

export const defaultAuthReducer: AuthReducer = {
  isLoading: false,
  web3AuthModalPack: web3AuthModalPack,

  isVerifyInit: false,
  isVerifyLoading: false,
  isVerify: false,
  isAdmin: false,
  isStravaConnected: false,

  token: tokenStorage.get(""),
};
