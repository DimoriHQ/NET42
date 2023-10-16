import React from "react";
import { useEffectOnce } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCampaigns, selectCampaign } from "../../features/campaigns/reducer";
import Section from "../Layout/Section";
import Campaign from "./Campaign";

const Campaigns: React.FC = () => {
  const campaign = useAppSelector(selectCampaign);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(getCampaigns());
  });

  return (
    <section className="bg-gray-200 p-6">
      <Section>
        <div className="grid grid-cols-3">
          {campaign.campaigns.map((item) => (
            <Campaign campaign={item} key={item._id} />
          ))}
        </div>
      </Section>
    </section>
  );
};

export default Campaigns;
