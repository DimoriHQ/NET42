import { disconnect } from "@wagmi/core";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, setProvider, verify } from "../../features/authentication/reducer";

const Header: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { address, isConnected } = useAccount();

  const connect = async () => {
    await auth.web3AuthModalPack.signIn();
    const provider = new ethers.providers.Web3Provider(auth.web3AuthModalPack.getProvider()!);
    dispatch(setProvider(provider));
    dispatch(verify({ address }));
  };

  const logout = async () => {
    await disconnect();
    await auth.web3AuthModalPack.signOut();
  };

  const Profile = () => {
    if (isConnected) {
      return (
        <div>
          <div>Connected: {address}</div>
          <button onClick={logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <button className="" onClick={connect}>
          Connect
        </button>
      );
    }
  };

  return (
    <header className="flex gap-4 justify-between">
      <Link to="/">Logo</Link>
      <div>{Profile()}</div>
    </header>
  );
};

export default Header;
