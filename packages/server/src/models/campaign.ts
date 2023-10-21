import { Collection, ObjectId, WithId } from "mongodb";
import { createDBCollName } from "../db/createDBCollName";
import { DB__NET42 } from "../config";
import { dbCollection } from "../db/collection";
import logger from "../utils/log";
import { NET42Base, NET42NftType, net42BaseToftType } from "./net42";
import dayjs from "dayjs";
import { createFilePath, web3StorageClient } from "../services/web3Storage";
import { File } from "@web-std/file";

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

export enum UserStateStatus {
  NOT_START_YET = "not_start_yet",
  AVAILABLE = "available",
  REGISTERED = "registerd",
  ENDED = "ended",
  CLAIMABLE = "claimable",
  UNFINISHED = "unfinished",
  FINISHED = "finished",
}

export type UserState = {
  status: UserStateStatus | string;
};

export type ParticipantState = {
  joined: number;
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

export type CampaignDocument = CampaignBaseType & Document;

let campaignColl: Collection<CampaignBaseType>;
const collName = createDBCollName("campaign");

export const campaignCollInit = async () => {
  const { collection } = await dbCollection<CampaignBaseType>(DB__NET42, collName);
  campaignColl = collection;

  await campaignColl.createIndex({ email: 1 });
  await campaignColl.createIndex({ time: 1 });

  logger.info({ thread: "db", collection: collName, stage: "initial" });
};

export const isCampaignExist = async (id: ObjectId): Promise<CampaignBaseType> => {
  const campaign = await campaignColl.findOne({ _id: id });
  return campaign;
};

export const saveCampaign = async (campaign: CampaignBaseType) => {
  logger.info({ thread: "db", collection: collName, action: "saveCampaign", campaign });

  return await campaignColl.updateOne({ _id: campaign._id }, campaign, { upsert: true });
};

export const createCampaign = async (campaign: CampaignBaseType) => {
  logger.info({ thread: "db", collection: collName, action: "createCampaign", campaign });

  return await campaignColl.insertOne(campaign);
};

export const getCampaign = async (id: ObjectId): Promise<WithId<CampaignBaseType>> => {
  logger.info({ thread: "db", collection: collName, action: "getCampaign", id });

  return await campaignColl.findOne({ _id: id });
};

export const getCampaignsById = async (ids: ObjectId[]): Promise<WithId<CampaignBaseType>[]> => {
  logger.info({ thread: "db", collection: collName, action: "getCampaignsById", ids });

  const cursor = campaignColl.find();

  const campaigns = [];

  for await (const campaign of cursor) {
    campaigns.push(campaign);
  }

  return campaigns;
};

export const getAllCampaigns = async (): Promise<CampaignDocument[]> => {
  logger.info({ thread: "db", collection: collName, action: "getAllCampaigns" });

  const cursor = campaignColl.find();

  const campaigns = [];

  for await (const campaign of cursor) {
    campaigns.push(campaign);
  }

  return campaigns;
};

export const createNet42Medal = async (
  campaign: CampaignBaseType,
  owner: string,
  isTrack: boolean = false,
  trackIndex: number = 0,
): Promise<{
  baseNft: NET42Base;
  nft: NET42NftType;
}> => {
  const type = isTrack ? 1 : 0;
  const track = isTrack ? campaign.tracks[trackIndex].track : 0;

  const baseNft: NET42Base = {
    owner,
    campaignId: campaign._id,
    participant: owner,
    createdDate: dayjs().toDate(),
    type,
    trackIndex,
    track,
    metadata: "",
  };

  const nft = net42BaseToftType(campaign, baseNft);

  const file = new File([JSON.stringify(nft)], "metadata.json", { type: "application/json" });
  const cid = await web3StorageClient.put([file]);
  const metadata = createFilePath(cid, file.name);

  baseNft.metadata = metadata;

  return { baseNft, nft };
};

export const getCampaignJoined = (campaign: CampaignBaseType) => {
  return 0;
};
