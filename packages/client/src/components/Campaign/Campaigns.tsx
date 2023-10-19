import React from "react";
import { useEffectOnce } from "usehooks-ts";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCampaigns, selectCampaign } from "../../features/campaigns/reducer";
import Section from "../Layout/Section";
import Campaign from "./Campaign";

const Campaigns: React.FC = () => {
  const campaign = useAppSelector(selectCampaign);
  const dispatch = useAppDispatch();
  const { address } = useAccount();

  useEffectOnce(() => {
    dispatch(getCampaigns({ address: address! }));
  });

  return (
    <section className="bg-gray-200 p-6">
      <Section>
        <div className="grid grid-cols-3 gap-6">
          {campaign.campaigns.map((item) => (
            <Campaign campaign={item} key={item._id} />
          ))}
        </div>
      </Section>
    </section>
  );
};

export default Campaigns;
