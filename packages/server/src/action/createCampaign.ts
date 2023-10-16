import dayjs from "dayjs";
import { KoaContext } from "../global";
import { CampaignBaseType, Track, getAllCampaigns, createCampaign as dbCreateCampaign } from "../models/campaign";
import { successResponse } from "../services/response";

export const createCampaign = async (ctx: KoaContext) => {
  const body = ctx.request.body as {
    name: string;
    description: string;

    registerTime: string;
    startTime: string;
    hasEndTime: string;
    endTime: string;

    imageURL: string;
    bannerURL: string;
    registeredImageURL: string;
    unfinishedImageURL: string;
    finishedImageURL?: string;

    trackable: string;
    stravaData: string;
    standardCode: string;
    tracksValue: string[];
    tracksImageURL: string[];
  };

  const { name, description, standardCode, imageURL, bannerURL, registeredImageURL, unfinishedImageURL, finishedImageURL } = body;
  const registerTime = dayjs(body.registerTime);
  const startTime = dayjs(body.startTime);
  const hasEndTime = body.hasEndTime === "true" ? true : false;
  const endTime = dayjs(body.registerTime);

  const trackable = body.trackable === "1" ? true : false;
  const stravaData = body.stravaData === "true" ? true : false;

  const files = ctx.request.files;

  const tracks: Track[] = body.tracksValue.map((value, index) => {
    return { track: Number(value), image: body.tracksImageURL[index] };
  });

  const campaign: CampaignBaseType = {
    name,
    description,
    registerTime: registerTime.toDate(),
    startTime: startTime.toDate(),
    hasEndTime,
    trackable,
    stravaData,

    image: imageURL,
    banner: bannerURL,
    registeredImage: registeredImageURL,
    unfinishedImage: unfinishedImageURL,
    finishedImage: finishedImageURL,

    tracks,
    standardCode,
  };

  if (hasEndTime) {
    campaign.endTime = endTime.toDate();
  }

  await dbCreateCampaign(campaign);
  const campaigns = await getAllCampaigns();

  ctx.status = 200;
  ctx.body = successResponse(campaigns);
};
