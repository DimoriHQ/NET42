import Koa from "koa";
import koaLogger from "koa-pino-logger";
import { client } from "./db";
import logger from "./utils/log";
import Router from "@koa/router";
import helmet from "koa-helmet";
import { corsMiddleware } from "./middlewares/cors";
import { cacheMiddleware } from "./middlewares/cache";
import { dateRangeMiddleware } from "./middlewares/dateRange";
import { paginationMiddleware } from "./middlewares/page";
import { cronInit } from "./cron";
import { limiter } from "./middlewares/limiter";
import { notFound } from "./middlewares/notFound";
import bodyParser from "koa-bodyparser";
import { leaderboard, nftCollInit } from "./models/nft";
import { listenerInit } from "./listener/mintNftListener";
import * as EmailValidator from "email-validator";
import axios from "axios";
import { RECAPTCHA_SECRETKEY } from "./config";
import { isExist, saveWaitlist } from "./models/waitlist";

(async function main() {
  // create app
  const app = new Koa();

  app.use(cacheMiddleware);
  app.use(koaLogger());
  app.use(helmet());
  app.use(helmet.hidePoweredBy());
  app.use(corsMiddleware);
  app.use(bodyParser());

  await client.connect();
  client.on("close", () => {
    client.connect();
  });

  await nftCollInit();

  // app router
  const router = new Router({ prefix: "/v1" });
  router.use(dateRangeMiddleware);
  router.use(paginationMiddleware);

  router.get("/", (ctx) => {
    ctx.body = "API";
  });

  router.get("/leaderboard", async (ctx) => {
    if (await ctx.cashed()) return;

    ctx.body = await leaderboard();
  });

  router.post("/waitlist", async (ctx) => {
    try {
      const body = ctx.request.body;

      if (!body["email"] || !body["key"]) {
        ctx.status = 400;

        ctx.body = JSON.stringify({
          code: 0,
          status: "Wrong params",
        });

        return;
      }

      const vailidEmail = EmailValidator.validate(body["email"]);

      if (!vailidEmail) {
        ctx.status = 400;

        ctx.body = JSON.stringify({
          code: 0,
          status: "Email is not valid",
        });

        return;
      }

      const key = ctx.request.body["key"];
      const verify = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRETKEY}&response=${key}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded", json: true },
      });

      if (!verify.data["success"]) {
        ctx.status = 400;

        ctx.body = JSON.stringify({
          code: 0,
          status: "Captcha verify error",
        });

        return;
      }

      if (await isExist(body["email"])) {
        ctx.body = JSON.stringify({
          code: 2,
          status: "Joined already",
        });

        return;
      }

      await saveWaitlist(body["email"]);

      ctx.body = JSON.stringify({
        code: 1,
        status: "Cuccess",
      });

      return;
    } catch (error) {
      ctx.body = JSON.stringify({
        code: 0,
        status: "Internal error",
      });

      return;
    }
  });

  // array of admin addresses, ... sign

  app.use(router.routes());
  app.use(router.allowedMethods());
  // /app router

  app.use(limiter);
  app.use(notFound);

  const port = 3333;

  // app
  app.listen(port);

  // app info
  logger.info({ thread: "main", data: "service started", port });

  cronInit();
  listenerInit();
})();
