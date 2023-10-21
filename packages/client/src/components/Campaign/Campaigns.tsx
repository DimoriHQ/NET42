import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCampaigns, selectCampaign } from "../../features/campaigns/reducer";
import Container from "../Layout/Container";
import Campaign from "./Campaign";

const Campaigns: React.FC = () => {
  const campaign = useAppSelector(selectCampaign);
  const dispatch = useAppDispatch();
  const { isConnected } = useAccount();

  useEffect(() => {
    dispatch(getCampaigns({ isConnected }));
  }, []);

  return (
    <section className="bg-[#F6F6F6] px-6 py-[100px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaign.campaigns.map((item) => (
            <Campaign campaign={item} key={item._id} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Campaigns;
