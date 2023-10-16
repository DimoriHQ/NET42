import { Collection, ObjectId } from "mongodb";
import { createDBCollName } from "../db/createDBCollName";
import { DB__NET42 } from "../config";
import { dbCollection } from "../db/collection";
import logger from "../utils/log";

export type CampaignNftType = {
  name: string;
  description: string;
  image: string;
  banner: string;

  attributes: [
    { trait_type: "registerTime"; value: Date },
    { trait_type: "startTime"; value: Date },
    { trait_type: "hasEndTime"; value: boolean },
    { trait_type: "endTime"; value: Date },
    { trait_type: "trackable"; value: boolean },
    { trait_type: "tracks"; value: number[] },
    { trait_type: "standardCode"; value: string },
  ];

  seller_fee_basis_points: 0;

  compiler: "net42.run";
  external_url: "https://net42.run";
};

export type Track = { track: number; image: string };

export type UserState = {
  status: "";
};

export type CampaignBaseType = {
  _id?: ObjectId;

  name: string;
  description: string;

  image: string;
  banner: string;

  registeredImage: string;
  unfinishedImage: string;
  finishedImage?: string;

  registerTime: Date;
  startTime: Date;
  hasEndTime: boolean;
  endTime?: Date;

  trackable: boolean;
  standardCode: string;
  tracks: Track[];
  stravaData: boolean;

  nftId?: number;
};

type CampaignDocument = CampaignBaseType & Document;

let campaignColl: Collection<CampaignBaseType>;
const collName = createDBCollName("campaign");

export const campaignCollInit = async () => {
  const { collection } = await dbCollection<CampaignBaseType>(DB__NET42, collName);
  campaignColl = collection;

  await campaignColl.createIndex({ email: 1 });
  await campaignColl.createIndex({ time: 1 });

  logger.info({ thread: "db", data: "campaign inited" });
};

export const isCampaignExist = async (id: ObjectId): Promise<CampaignBaseType> => {
  const campaign = await campaignColl.findOne({ _id: id });
  return campaign;
};

export const saveCampaign = async (campaign: CampaignBaseType) => {
  logger.info({ thread: "db", action: "saveCampaign", campaign });

  return await campaignColl.updateOne({ _id: campaign._id }, campaign, { upsert: true });
};

export const createCampaign = async (campaign: CampaignBaseType) => {
  logger.info({ thread: "db", action: "createCampaign", campaign });

  return await campaignColl.insertOne(campaign);
};

export const getCampaign = async (id: ObjectId) => {
  logger.info({ thread: "db", action: "saveCampaign", id });

  return await campaignColl.findOne({ _id: id });
};

export const getAllCampaigns = async (): Promise<CampaignDocument[]> => {
  logger.info({ thread: "db", action: "getAllCampaigns" });

  const cursor = campaignColl.find();

  const campaigns = [];

  for await (const event of cursor) {
    campaigns.push(event);
  }

  return campaigns;
};
