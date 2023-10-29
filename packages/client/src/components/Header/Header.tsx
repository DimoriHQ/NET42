import React from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "../Button/ConnectButton";
import Container from "../Layout/Container";

const Header: React.FC = () => {
  return (
    <header className="py-[30px] md:py-[60px]">
      <Container>
        <div className="flex justify-between">
          <div className="flex gap-3 md:gap-6 items-center justify-center flex-col md:flex-row">
            <Link to="/" className="flex gap-2 items-center">
              <img src="/images/logo.png" width={120} alt="Logo" />
            </Link>
            <a href="https://faucet.test.azero.dev/" target="_blank" rel="noopener noreferrer" className="underline">
              Faucet Aleph Zero Testnet
            </a>
          </div>

          <ConnectButton />
        </div>
      </Container>
    </header>
  );
};

export default Header;
