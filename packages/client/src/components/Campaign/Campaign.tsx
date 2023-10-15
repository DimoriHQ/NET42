import React from "react";
import { CampaignType } from "../../features/campaigns/types";

const Campaign: React.FC<{ campaign: CampaignType }> = ({ campaign }) => {
  return (
    <div>
      campaign
      <div>{campaign.id}</div>
      <div>{campaign.name}</div>
      <div>{campaign.description}</div>
      <div>{campaign.banner}</div>
      <div>{campaign.startTime.toDateString()}</div>
      <div>{campaign.endTime.toDateString()}</div>
    </div>
  );
};

export default Campaign;
