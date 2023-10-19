import { KoaContext } from "../global";
import { getAllCampaigns } from "../models/campaign";
import { getNftClaimable } from "../models/net42";
import { successResponse } from "../services/response";

export const getCampaigns = async (ctx: KoaContext) => {
  const campaigns = await getAllCampaigns();

  const address = ctx.address;

  console.log(address);

  let data = campaigns;
  if (address) {
    const claimable = await getNftClaimable(address);

    console.log(claimable);

    data = await Promise.all(
      campaigns.map(async (campaign) => {
        const claim = claimable.find((item) => item.campaign._id.equals(campaign._id));

        const data = { ...claim, ...campaign };
        return data;
      }),
    );
  } else {
  }

  ctx.status = 200;
  ctx.body = successResponse(data);
};
