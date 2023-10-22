import React from "react";
import { Link } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { shortTruncateEthAddress } from "../../services/utils/address";
import { scrollS } from "../App/App";
import Button from "../Button/Button";
import ConnectStrava from "../Button/ConnectStrava";
import Container from "../Layout/Container";

const Header: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect: wagmiConnect, connectors } = useConnect();

  const connect = async () => {
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x8274f" }],
        });

        wagmiConnect({ connector: connectors[0] });
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [scrollS],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);

        wagmiConnect({ connector: connectors[0] });
      }
    } else {
      wagmiConnect({ connector: connectors[0] });
    }
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
          <div className="flex gap-3 md:gap-6 items-center justify-center flex-col md:flex-row">
            <Link to="/" className="flex gap-2 items-center">
              <img src="/images/logo.png" width={120} alt="Logo" />
              <img src="/images/scroll.svg" width={40} alt="Scroll" />
            </Link>
            <a href="https://docs.scroll.io/en/user-guide/faucet/" target="_blank" rel="noopener noreferrer" className="underline">
              Faucet Scroll Sepolia
            </a>
          </div>

          <div className="flex">{Profile()}</div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
