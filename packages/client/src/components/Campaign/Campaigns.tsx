import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCampaigns, selectCampaign } from "../../features/campaigns/reducer";
import Container from "../Layout/Container";
import Campaign from "./Campaign";

const Campaigns: React.FC = () => {
  const campaign = useAppSelector(selectCampaign);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCampaigns());
  }, []);

  return (
    <section className="bg-[#F6F6F6] px-6 py-[100px]">
      <div className="text-center text-[30px]">{campaign.isLoading ? "Loading..." : ""}</div>

      {campaign.isInit ? (
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaign.campaigns.map((item) => (
              <Campaign campaign={item} key={item._id} />
            ))}
          </div>
        </Container>
      ) : (
        ""
      )}
    </section>
  );
};

export default Campaigns;
