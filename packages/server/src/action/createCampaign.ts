import { KoaContext } from "../global";
import { CampaignBaseType } from "../models/campaign";

export const createCampaign = async (ctx: KoaContext) => {
  const body = ctx.request.body as CampaignBaseType;

  ctx.body = "API";
  ctx.status = 200;
};
