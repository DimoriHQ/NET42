import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import Section from "../components/Layout/Section";
import NFTCard from "./nftCard"; // Import your NFTCard component
import { NFT } from "./types"; // Import the NFT type
// import { getNFTsFromSpecificAddress } from "../utils"; // Import your utility function Hàm này sẽ lấy toàn bộ NFT trên blockchain của 1 address cụ thể
import Stack from '@mui/joy/Stack';
import HealthAppConn from "../components/HealthApp/HealthAppConn";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const Profile: React.FC = () => {

  const getNFTsFromSpecificAddress = () => {
    // dummy define
  };
  // const NFTs: NFT[] = getNFTsFromSpecificAddress(); // Get NFTs from a specific user.
  const NFTs = [
    {
      media: [{ gateway: "/images/sdg7-512.png" }],
      title: "NFT #1",
      id: { tokenId: 1 },
      contract: { address: "0x1234567890abcdef" },
      description: "SDG7: Affordable and Clean Energy",
    },
    {
      media: [{ gateway: "/images/sdg10-512.png" }],
      title: "NFT #2",
      id: { tokenId: 2 },
      contract: { address: "0xabcdef1234567890" },
      description: "SDG 10 - Reduced Inequalities",
    },
    {
      media: [{ gateway: "/images/sdg13-512.png" }],
      title: "NFT #3",
      id: { tokenId: 3 },
      contract: { address: "0x7890abcdef123456" },
      description: "SDG 13 - Climate Action",
    },
  ];
  return (
    <Section>
      <Stack spacing={2}>
        <HealthAppConn />
        <div className="flex flex-col items-center justify-center py-8 gap-y-3">
          <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
            {NFTs.length > 0 &&
              NFTs.map((nft) => (
                <NFTCard key={`${nft.id.tokenId}-${nft.contract.address}`} nft={nft} />
              ))}
          </div>
        </div>
      </Stack>
    </Section>
  );
};

export default Profile;
