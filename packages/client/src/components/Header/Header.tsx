import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, setProvider, verify } from "../../features/authentication/reducer";
import { getCampaigns } from "../../features/campaigns/reducer";
import { shortTruncateEthAddress } from "../../services/utils/address";
import Button from "../Button/Button";
import ConnectStrava from "../Button/ConnectStrava";
import Container from "../Layout/Container";

const Header: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { address, isConnected } = useAccount();

  const connect = async () => {
    await auth.web3AuthModalPack.signIn();
    const provider = new ethers.providers.Web3Provider(auth.web3AuthModalPack.getProvider()!);
    dispatch(setProvider(provider));
    dispatch(verify({ address: (await provider.getSigner().getAddress()) as `0x${string}` }));
    dispatch(getCampaigns({ isConnected }));
  };

  const Profile = () => {
    if (isConnected) {
      return (
        <div className="flex gap-3 md:gap-6 items-center justify-center flex-col-reverse md:flex-row">
          <ConnectStrava />

          <Link to={`/profile/${address}`}>
            <Button>Profile {shortTruncateEthAddress(address!)}</Button>
          </Link>
        </div>
      );
    } else {
      return <Button onClick={connect}>Connect Wallet</Button>;
    }
  };

  return (
    <header className="py-[30px] md:py-[60px]">
      <Container>
        <div className="flex justify-between">
          <Link to="/">
            <img src="/images/logo.png" width={120} alt="Logo" />
          </Link>

          <div className="flex">{Profile()}</div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
