import { Web3Auth } from "@web3auth/modal";
import { ethers } from "ethers";
import LocalStorage from "../../services/localStorage";
import { openLoginAdapter, web3authOptions } from "../../services/safe";

// export const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
export const web3AuthInstance = new Web3Auth(web3authOptions);
web3AuthInstance.configureAdapter(openLoginAdapter);

export const tokenStorage = new LocalStorage<string>("token");

export type AuthReducer = {
  isLoading: boolean;

  // web3AuthModalPack: Web3AuthModalPack;

  provider?: ethers.providers.Web3Provider;
  web3Auth: Web3Auth;

  isVerifyInit: boolean;
  isVerifyLoading: boolean;
  isVerify: boolean;
  isAdmin: boolean;
  isStravaConnected: boolean;

  address: string;

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
  // web3AuthModalPack,

  web3Auth: web3AuthInstance,

  address: "",

  isVerifyInit: false,
  isVerifyLoading: false,
  isVerify: false,
  isAdmin: false,
  isStravaConnected: false,

  token: tokenStorage.get(""),
};
