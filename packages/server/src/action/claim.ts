import { KoaContext } from "../global";

export const claim = async (ctx: KoaContext) => {
  ctx.body = "API";
  ctx.status = 200;
};
