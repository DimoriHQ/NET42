import { ObjectId } from "mongodb";
import { KoaContext } from "../global";
import { getCampaign } from "../models/campaign";
import { checkpoints } from "../models/checkpointsTrack";

// need to refactor
// import { authorize, getDistance, getToken, getTrackingData } from "../models/stravaTracking";

// let total_distance: number; // need to store it on somewhere for refresh page
// let trackingData; // need to store it on somewhere for refresh page
// let access_token: string; // need to store it on somewhere for refresh page

// export const authorizeStrava = async (ctx: KoaContext) => {
//   var response_link = authorize(ctx.request.URL);
//   ctx.redirect(response_link);
// };

// export const trackingDataStrava = async (ctx: KoaContext) => {
//   let code: string = ctx.request.query.code.toString();
//   access_token = await getToken(code);

//   let rawCampaignId: string = ctx.params.campaignId.toString();
//   const campaignId = ObjectId.createFromHexString(rawCampaignId);
//   let campaign = await getCampaign(campaignId);
//   // get nft list campaign of athelte
//   let athlete_campaign = {
//     pubId: "abcxyz",
//     nftMinted: [5000, 10000], // metres
//   };

//   let campaignJoined = await getJoinedCampaign(campaignId, athlete_campaign.pubId);

//   trackingData = await getTrackingData(access_token, registerTime, campaignEndTime, 1, 100);
//   if (!trackingData) {
//     ctx.body = "Not Found!!";
//     ctx.status = 404;
//   } else {
//     ctx.body = trackingData;
//     ctx.status = 200;
//   }
// };

// export const totalDistanceStrava = async (ctx: KoaContext) => {
//   total_distance = await getDistance(trackingData);
//   ctx.body = total_distance;
//   ctx.status = 200;
// };

// export const checkpointsStrava = async (ctx: KoaContext) => {
//   const rawCampaignId: string = ctx.params.campaignId.toString();
//   const campaignId = ObjectId.createFromHexString(rawCampaignId);

//   const campaign = await getCampaign(campaignId);
//   const tracks = campaign.tracks;
//   const result = checkpoints(tracks, total_distance);

//   ctx.body = result;
//   ctx.status = 200;
// };
