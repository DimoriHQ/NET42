import { KoaContext } from "../global";
import { errorResponse } from "../services/response";
import { getNftClaimable } from "../models/net42";

export const getClaimable = async (ctx: KoaContext) => {
  if (!ctx.isAuth) {
    ctx.status = 400;
    ctx.body = errorResponse("need auth", 400);
    return;
  }

  const participant = ctx.address;
  const data = await getNftClaimable(participant);

  ctx.status = 200;
  ctx.body = data;
};
