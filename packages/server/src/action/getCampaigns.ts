import { WithId } from "mongodb";
import { KoaContext } from "../global";
import { CampaignBaseType, UserStateStatus, getAllCampaigns } from "../models/campaign";
import { ClaimableType, getNftClaimable } from "../models/net42";
import { successResponse } from "../services/response";

export const getCampaigns = async (ctx: KoaContext) => {
  const campaigns = await getAllCampaigns();

  const address = ctx.address;

  let data = campaigns;
  if (address) {
    const claimable = await getNftClaimable(address);

    data = await Promise.all(
      campaigns.map(async (campaign) => {
        const claim = claimable.find((item) => {
          return item.campaign._id.equals(campaign._id);
        });

        const data = { ...campaign, claim };
        return data;
      }),
    );
  } else {
    data = await Promise.all(
      campaigns.map(async (campaign) => {
        const claim: ClaimableType = {
          campaign: campaign as WithId<CampaignBaseType>,
          status: UserStateStatus.AVAILABLE,
          nfts: [],
          claimedNfts: [],
          registeredNft: undefined,
          registeredNftNotClaimed: undefined,
        };

        const data = { ...campaign, claim };
        return data;
      }),
    );
  }

  ctx.status = 200;
  ctx.body = successResponse(data);
};
