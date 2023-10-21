import { KoaContext } from "../global";
import { errorResponse, successResponse } from "../services/response";
import { createNftProof, getNftClaimable, net42BaseToftType } from "../models/net42";
import { flatten } from "lodash";

export const getClaimable = async (ctx: KoaContext) => {
  if (!ctx.isAuth) {
    ctx.status = 400;
    ctx.body = errorResponse("need auth", 400);
    return;
  }

  const participant = ctx.address;
  const data = await getNftClaimable(participant);
  const result = await Promise.all(
    data.map(
      async (item) =>
        await Promise.all(
          item.nfts.map(async (nft) => {
            return { ...nft, data: net42BaseToftType(item.campaign, nft), proof: await createNftProof(nft) };
          }),
        ),
    ),
  );

  ctx.status = 200;
  ctx.body = successResponse(flatten(result));
};
