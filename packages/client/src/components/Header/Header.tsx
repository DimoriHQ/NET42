import React from "react";
import { Link } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { shortTruncateEthAddress } from "../../services/utils/address";
import Button from "../Button/Button";
import ConnectStrava from "../Button/ConnectStrava";
import Container from "../Layout/Container";

const Header: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect: wagmiConnect, connectors } = useConnect();

  const connect = async () => {
    wagmiConnect({ connector: connectors[0] });
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
