import { KoaContext } from "../global";
import { getAllCampaigns } from "../models/campaign";
import { successResponse } from "../services/response";

export const getCampaigns = async (ctx: KoaContext) => {
  ctx.status = 200;
  ctx.body = successResponse(await getAllCampaigns());
};
