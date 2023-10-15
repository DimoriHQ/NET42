import { KoaContext } from "../global";

export const index = async (ctx: KoaContext) => {
  ctx.body = "NET42.run APIs";
  ctx.status = 200;
};
