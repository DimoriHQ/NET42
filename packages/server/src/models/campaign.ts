import { Collection } from "mongodb";
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

export type CampaignBaseType = {
  _id?: string;

  name: string;
  description: string;

  image: string;
  banner: string;

  startTime: Date;
  hasEndTime: boolean;
  endTime?: Date;

  trackable: boolean;
  tracks: number[];
  standardCode: string;

  nftId: number;
};

type CampaignDocument = CampaignBaseType & Document;

let campaignColl: Collection<CampaignDocument>;
const collName = createDBCollName("campaign");

export const waitlistCollInit = async () => {
  const { collection } = await dbCollection<CampaignDocument>(DB__NET42, collName);
  campaignColl = collection;

  await campaignColl.createIndex({ email: 1 });
  await campaignColl.createIndex({ time: 1 });

  logger.info({ thread: "db", data: "waitlist inited" });
};

export const isCampaignExist = async (id: string): Promise<CampaignBaseType> => {
  const waitlist = await campaignColl.findOne({ _id: id });
  return waitlist;
};

export const saveCampaign = async (campaign: CampaignBaseType) => {
  return await campaignColl.updateOne({ _id: campaign._id }, campaign, { upsert: true });
};

export const getCampaign = async (id: string) => {
  return await campaignColl.findOne({ _id: id });
};
