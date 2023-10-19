import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import Section from "../components/Layout/Section";
import NFTCard from "./nftCard"; // Import your NFTCard component

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const Profile: React.FC = () => {
  const getNFTsFromSpecificAddress = () => {
    // dummy define
  };
  const NFTs = [];

  return (
    <Section>
      <div className="flex flex-col items-center justify-center py-8 gap-y-3">
        <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">{NFTs.length > 0 && NFTs.map((nft) => <NFTCard key={nft.id} nft={nft} />)}</div>
      </div>
    </Section>
  );
};

export default Profile;
