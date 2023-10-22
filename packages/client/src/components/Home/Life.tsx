import React from "react";
import Container from "../Layout/Container";

const Life: React.FC = () => {
  return (
    <section className="pb-[100px]">
      <Container>
        <div className="flex gap-12">
          <div>
            <img src="/images/life.png" alt="" width={650} />
          </div>
          <div className="text-[20px] flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img src="/images/scroll.svg" width={60} alt="Scroll" />
              <div>Deployed on Scroll Sepolia</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="/images/filecoin.png" width={60} alt="Filecoin" />
                <img src="/images/web3storage.png" width={60} alt="web3storage" />
              </div>
              <div>Metadata stored at Web3.Storage</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="/images/safe.jpeg" width={60} alt="web3storage" className="rounded-full" />
              </div>
              <div>
                Safe{"{Core}"} Account Abstraction SDK with Web3Auth <br /> for current authentication and future NET42 user profile
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="/images/polygon.png" width={60} alt="polygon" className="rounded-full" />
              </div>
              <div>
                Public Good with Account Abstraction <br />
                We are non-profit organization
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="/images/mask.jpeg" width={60} alt="mask" className="rounded-full" />
              </div>
              <div>Get web3.bio from Next.ID of Mask Network</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Life;
