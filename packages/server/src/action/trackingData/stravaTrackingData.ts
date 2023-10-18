import { KoaContext } from "../../global";
import { getCampaign, getJoinedCampaign } from "../../models/campaign";
import { checkpoints } from "../../models/checkpointsTrack";
import { authorize, getDistance, getToken, getTrackingData } from "../../models/trackingData/stravaTracking";

var total_distance: number; // need to store it on somewhere for refresh page
var trackingData; // need to store it on somewhere for refresh page
var access_token: string; // need to store it on somewhere for refresh page

export const authorizeStrava = async (ctx: KoaContext) => {
    var response_link = await authorize(ctx.request.URL);
    ctx.redirect(response_link);
};

export const trackingDataStrava = async (ctx: KoaContext) => {
    let code: string = ctx.request.query.code.toString();
    access_token = await getToken(code); 

    let campaignId: string = ctx.params.campaignId.toString();
    let campaign = await getCampaign(campaignId);
    // get nft list campaign of athelte
    let athlete_campaign = {
      pubId: "abcxyz",
      nftMinted: [5000, 10000] // metres
    };

    let campaignJoined = await getJoinedCampaign(campaignId, athlete_campaign.pubId);
    const registerTime = campaignJoined.registerTime / 1000; // to seconds
    const campaignEndTime = campaign.endTime.getTime() / 1000; // to seconds
    
    trackingData = await getTrackingData(access_token, registerTime, campaignEndTime, 1, 100);
    if(!trackingData){
        ctx.body = "Not Found!!"
        ctx.status = 404;
    }
    else{
        ctx.body = trackingData;
        ctx.status = 200;
    }
};

export const totalDistanceStrava = async (ctx: KoaContext) => {
    total_distance = await getDistance(trackingData)
    ctx.body = total_distance;
    ctx.status = 200;
};

export const checkpointsStrava = async (ctx: KoaContext) => {
    let campaign_id: string = ctx.params.campaignId.toString();
    let campaign = await getCampaign(campaign_id);
    let tracks = campaign.tracks;
    let result = checkpoints(tracks, total_distance);

    ctx.body = result;
    ctx.status = 200;
};