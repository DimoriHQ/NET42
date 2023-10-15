import Koa from "koa";
import koaLogger from "koa-pino-logger";
import Router from "@koa/router";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import logger from "./utils/log";
import { client } from "./db";
import { listenerInit } from "./listener/mintNftListener";
import { cronInit } from "./cron/index";
import { init } from "./middlewares/init";
import { corsMiddleware } from "./middlewares/cors";
import { cacheMiddleware } from "./middlewares/cache";
import { dateRangeMiddleware } from "./middlewares/dateRange";
import { paginationMiddleware } from "./middlewares/page";
import { limiter } from "./middlewares/limiter";
import { notFound } from "./middlewares/notFound";
import { nftCollInit } from "./models/net42";
import { index } from "./action/index";
import saveWaitlist from "./action/saveWailist";
import { getClaimable } from "./action/getClaimable";
import { auth } from "./middlewares/auth";
import { admin } from "./middlewares/admin";
import { getCampaigns } from "./action/getCampaigns";
import { createCampaign } from "./action/createCampaign";
import { editCampaign } from "./action/editCampaign";
import { usersTrackCampaign } from "./action/usersTrackCampaign";
import { claim } from "./action/claim";
import { profile } from "./action/profile";
import { verify } from "./action/verify";
import { authorizeStrava, checkpointsStrava, totalDistanceStrava, trackingDataStrava } from "./action/trackingData/stravaTrackingData";

// create app
const app = new Koa();

app.use(init);
app.use(cacheMiddleware);
// app.use(koaLogger());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(corsMiddleware);
app.use(bodyParser());
app.use(auth);
app.use(admin);

(async function main() {
  // db
  await client.connect();
  client.on("close", () => client.connect());
  await nftCollInit();

  // app router
  const router = new Router({ prefix: "/v1" });
  router.use(dateRangeMiddleware);
  router.use(paginationMiddleware);

  router.get("/", index);
  router.post("/waitlist", saveWaitlist);
  router.post("/auth/verify", verify);
  router.get("/campaigns", getCampaigns);
  router.post("/campaign", createCampaign);
  router.get("/campaign/:id", getCampaigns);
  router.put("/campaign/:id", editCampaign);
  router.put("/campaign/:id/users", usersTrackCampaign);
  router.get("/claimable", getClaimable);
  router.get("/campaign/claim/:id", claim);
  router.get("/profile", profile);
  router.post("/nft/update-owner", profile);
  router.get("/authorize-strava", authorizeStrava);
  router.get("/tracking-data/:campaignId", trackingDataStrava);
  router.get("/total-distance/:campaignId", totalDistanceStrava);
  router.get("/checkpoint/:campaignId", checkpointsStrava)

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
