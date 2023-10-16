import { disconnect } from "@wagmi/core";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearAuth, selectAuth, setProvider, verify } from "../../features/authentication/reducer";
import Section from "../Layout/Section";

const Header: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { address, isConnected } = useAccount();

  const connect = async () => {
    await auth.web3AuthModalPack.signIn();
    const provider = new ethers.providers.Web3Provider(auth.web3AuthModalPack.getProvider()!);
    dispatch(setProvider(provider));
    dispatch(verify({ address: (await provider.getSigner().getAddress()) as `0x${string}` }));
  };

  const logout = async () => {
    dispatch(clearAuth());
    await disconnect();
    await auth.web3AuthModalPack.signOut();
  };

  const Profile = () => {
    if (isConnected) {
      return (
        <div>
          <div>Connected: {address}</div>
          <div>
            <Link to={`/profile/${address}`}>My profile</Link>
          </div>
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
    <Section>
      <header className="flex gap-4 justify-between py-6">
        <Link to="/">
          <img src="/images/NET42.png" width={100} />
        </Link>
        <div>{Profile()}</div>
      </header>
    </Section>
  );
};

export default Header;
