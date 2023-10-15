import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCampaign } from "../../features/campaigns/reducer";
import Campaign from "./Campaign";

const Campaigns: React.FC = () => {
  const campaign = useAppSelector(selectCampaign);

  return (
    <section>
      campaigns
      {campaign.campaigns.map((item) => (
        <Campaign campaign={item} />
      ))}
    </section>
  );
};

export default Campaigns;
