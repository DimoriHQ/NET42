import { disconnect } from "@wagmi/core";
import { ethers } from "ethers";
import React from "react";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearAuth, selectAuth, setProvider, verify } from "../../features/authentication/reducer";
import Section from "../Layout/Section";
import { Button, Link } from "@mui/joy";

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
          <div>
            <Button color="neutral" variant="solid"><a href={`/profile/${address}`}>My profile: {address.slice(0, 8)}</a></Button>
            <Button color="danger" onClick={logout}>
          Logout
          </Button>
          </div>
          
        </div>
      );
    } else {
      return (
        <Button color="primary" onClick={connect}>
          Connect
          </Button>
      );
    }
  };

  return (
    <Section>
      <header className="flex gap-4 justify-between py-6">
        <Link href="/">
          <img src="/images/NET42.png" width={100} />
        </Link>
        <div>{Profile()}</div>
      </header>
    </Section>
  );
};

export default Header;
