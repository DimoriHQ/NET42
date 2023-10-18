import React from "react";
import Section from "../Layout/Section";
import "../../styles/Hero.css";

const Hero: React.FC = () => {
  return (
    <div>
      <section className="hero">
        <Section>
          <div className="hero-inner">
            <h1>NFT-based</h1>
            <h1>Running Reward</h1>
            <h1>for Goods</h1>
          </div>
        </Section>
      </section>
      <div className="py-12"><br /></div>
      <main className="main flex gap-4 justify-between py-6">
      <Section>
        <div className="hero-det" id="heroDetails" >
          <p>
            Welcome to the world of NET42, where every step you take not only boosts your health but also fuels a brighter future. We're on a mission to infuse running with
            purpose and passion, driven by the magic of NFTs and the boundless potential of Web3.
          </p>
          <br />
          <p>
            Within the fitness community, there is a growing need for motivation, engagement, and sustainability. Traditional fitness apps often lack compelling incentives and a
            sense of community, particularly in addressing environmental impact and supporting social causes. Meanwhile, runners seek ways to contribute beyond their personal
            health and turn their passion into a force for good.
          </p>
          <br />
          <p>
            NET42 tackles these issues head-on. We're building a platform that encourages users to run not only for personal health, but also environmental and social causes.
            Our secret sauce? NFT-based rewards. Imagine earning unique digital tokens for your running achievements and using them to support social causes.
          </p>
        </div>
      </Section>
    </main>
    </div>
  );
};

export default Hero;
