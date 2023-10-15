import Router from "@koa/router";
import Koa from "koa";
import { KoaContext } from "../global";

export const getClaimable = async (ctx: KoaContext) => {
  ctx.body = "API";
  ctx.status = 200;
};
