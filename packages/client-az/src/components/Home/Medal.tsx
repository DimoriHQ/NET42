import React from "react";
import Container from "../Layout/Container";
import Span from "../Span/Span";

const Medal: React.FC = () => {
  return (
    <section className="pt-[100px] pb-[100px]">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[100px]">
          <div className="flex flex-col mb-[24px] max-w-[510px]">
            <div className="text-[42px] mb-[16px]">
              NFT Medals <br /> <Span className="font-bold">A New Era of Rewards</Span>
            </div>
            <div className="text-[20px] font-light">
              Gone are the days of traditional medals. At NET42, every marathon finisher is rewarded with a unique NFT medal. Not only is it a digital testament to your
              achievement, but it's also a gateway to numerous benefits
            </div>
            <div className="mt-[42px]">
              <div className="mb-[43px]">
                <div className="text-[#BE513F] font-bold mb-[4px]">Sponsorship & Donations</div>
                <div className="text-[16px] font-light">
                  Sponsors can directly support social causes based on the NFT medals. Every medal counts, and every run makes a difference
                </div>
              </div>
              <div>
                <div className="text-[#BE513F] font-bold mb-[4px]">Trade & Showcase</div>
                <div className="text-[16px] font-light">Proudly display your NFT medals in your digital gallery or trade them with fellow marathoners.</div>
              </div>
            </div>
          </div>
          <div className="w-[100%] max-w-[495px]">
            <img src="/images/medal.png" alt="Medal" className="mx-auto block" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Medal;
