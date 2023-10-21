import { dbCollection } from "../db/collection";
import { Document, Collection, ObjectId, WithId } from "mongodb";
import { DB__NET42, SIGNER_PRIVATE_KEY } from "../config";
import logger from "../utils/log";
import { createDBCollName } from "../db/createDBCollName";
import { httpProvider, net42Contract } from "../services/ether";
import { CampaignBaseType, UserStateStatus } from "./campaign";
import { ethers } from "ethers";
import abi from "ethereumjs-abi";
import dayjs from "dayjs";
import { getCampaignsByUser, userGetDistance } from "./user";
import { createFilePath, web3StorageClient } from "../services/web3Storage";
import { File } from "@web-std/file";

// NFT
export type NET42NftType = {
  name: string;
  description: string;
  image: string;

  attributes: [
    {
      trait_type: "campaign_id";
      value: string;
    },
    { trait_type: "participant"; value: string },
    { trait_type: "created_date"; value: string },
    { trait_type: "type"; value: number },
    { trait_type: "track"; value: number }?,
  ];

  seller_fee_basis_points: 0;

  compiler: "net42.run";
  external_url: "https://net42.run";
};

export type NET42Base = {
  campaignId: ObjectId;
  _id?: ObjectId;
  owner: string;

  participant: string;
  createdDate: Date;
  type: 0 | 1; // registered, track
  trackIndex?: number;
  track?: number;

  metadata: string;

  nftId?: number;
};

export const net42BaseToftType = (campaign: CampaignBaseType, base: NET42Base): NET42NftType => {
  const { participant, campaignId, createdDate, type, track, trackIndex } = base;

  const nft: NET42NftType = {
    name: type ? `${campaign.name} - ${track}` : `${campaign.name} - Registered Medal`,
    description: campaign.description,
    image: type === 0 ? campaign.registeredImage : campaign.tracks[trackIndex].image,
    attributes: [
      { trait_type: "campaign_id", value: campaignId.toHexString() },
      { trait_type: "participant", value: participant },
      { trait_type: "created_date", value: createdDate.toISOString() },
      { trait_type: "type", value: type },
      { trait_type: "track", value: track || 0 },
    ],
    seller_fee_basis_points: 0,

    compiler: "net42.run",
    external_url: "https://net42.run",
  };

  return nft;
};

type NET42Document = NET42Base & Document;

export let nftColl: Collection<NET42Base>;

const collName = createDBCollName("nft");

export const nftCollInit = async () => {
  const { collection } = await dbCollection<NET42Document>(DB__NET42, collName);
  nftColl = collection;

  await nftColl.createIndex({ campaignId: 1 });
  await nftColl.createIndex({ participant: 1 });
  await nftColl.createIndex({ createdDate: 1 });
  await nftColl.createIndex({ type: 1 });
  await nftColl.createIndex({ track: 1 });

  logger.info({ thread: "db", collection: collName, stage: "initial" });
};

export const getTotalSupply = async (): Promise<number> => {
  return (await net42Contract.totalSupply()) as number;
};

export const isNftExist = async (id: ObjectId): Promise<NET42Document> => {
  const nft = await nftColl.findOne({ _id: id });
  return nft;
};

export const isRegisteredNftExist = async (campaign: WithId<CampaignBaseType>, owner: string): Promise<NET42Document> => {
  return await nftColl.findOne({ campaignId: campaign._id, participant: owner, type: 0 });
};

export const isTrackNftExist = async (campaign: WithId<CampaignBaseType>, owner: string): Promise<NET42Document[]> => {
  const cursor = nftColl.find({ campaignId: campaign._id, participant: owner, type: 1 });

  const nfts = [];

  for await (const nft of cursor) {
    nfts.push(nft);
  }

  return nfts;
};

export const isTrackNftExistIndex = async (campaign: WithId<CampaignBaseType>, owner: string, index: number): Promise<NET42Document> => {
  return await nftColl.findOne({ campaignId: campaign._id, participant: owner, type: 1, trackIndex: index });
};

export const handleNftId = async (id: number) => {};
export const updateNftOwner = async (id: number) => {
  // const nft = await nftColl.findOne({ _id: id });
  // if (!nft) return;
  // const owner = await net42Contract.ownerOf(id);
  // logger.info({ thread: "model", model: "nft", message: `update owner ${id} ${owner}` });
  // await nftColl.updateOne({ _id: id }, { $set: { owner } });
};

export const createNft = async (nft: NET42Base) => {
  logger.info({ thread: "db", collection: collName, action: "createNft", nft });

  return await nftColl.insertOne(nft);
};

export const getNft = async (id: string) => {
  logger.info({ thread: "db", collection: collName, action: "getNft", id });
  const objectId = ObjectId.createFromHexString(id);

  return await nftColl.findOne({ _id: objectId });
};

export const getNfts = async (campaign: CampaignBaseType, type: 0 | 1, participant: string, hasNft: boolean = false): Promise<WithId<NET42Base>[]> => {
  logger.info({ thread: "db", collection: collName, action: "getNfts", participant, type, hasNft });

  const filter: { campaignId: ObjectId; type: 0 | 1; participant: string; nftId?: { $ne: null } } = { campaignId: campaign._id, type, participant };

  if (hasNft) {
    filter.nftId = { $ne: null };
  } else {
    filter.nftId = null;
  }

  const cursor = nftColl.find(filter);

  const nfts: (WithId<NET42Base> & { proof: string })[] = [];

  for await (const raw of cursor) {
    const nft = { ...raw, proof: await createNftProof(raw) };

    nfts.push(nft);
  }

  return nfts;
};

export const createNftProof = async (nft: NET42Base): Promise<string> => {
  const signer = await createSigner();

  const message = await getMessageHash(nft);

  const signature = await signer.signMessage(message);

  return signature;
};

export const createSigner = async () => {
  const signer = new ethers.Wallet(SIGNER_PRIVATE_KEY, httpProvider);
  return signer;
};

export const getMessageHash = async (nft: NET42Base): Promise<Buffer> => {
  // console.log(nft.participant, nft.campaignId.toHexString(), nft.type, nft._id.toHexString(), nft.metadata);
  // const hash = (await net42Contract.getMessageHash(nft.participant, nft.campaignId.toHexString(), nft.type, nft._id.toHexString(), nft.metadata)) as string;

  const hash = abi.soliditySHA3(["address", "string", "uint256", "string", "string"], [nft.participant, nft.campaignId.toHexString(), nft.type, nft._id.toHexString(), nft.metadata]);

  return hash;
};

export const getSigner = async (): Promise<string> => {
  return (await net42Contract.getSigner()) as string;
};

export const verify = async (nft: NET42Base, signature: string): Promise<boolean> => {
  const result = (await net42Contract.verify(nft.participant, nft.campaignId.toHexString(), nft.type, nft._id.toHexString(), nft.metadata, signature)) as boolean;
  return result;
};

export const getBlockchainNftMedalId = async (id: number): Promise<string> => {
  const data = await net42Contract.medalIds(id);
  return data;
};

export const updateNftId = async (medalId: string, nftId: number, owner: string) => {
  const objectId = ObjectId.createFromHexString(medalId);
  await nftColl.updateOne({ _id: objectId }, { $set: { nftId, owner } });
};

export type ClaimableType = {
  campaign: WithId<CampaignBaseType>;
  status: UserStateStatus;
  nfts: WithId<NET42Base>[];
  claimedNfts: WithId<NET42Base>[];
  registeredNft: WithId<NET42Base>;
  registeredNftNotClaimed: WithId<NET42Base>;
  distance: number;
};

export const getNftClaimable = async (participant: string): Promise<ClaimableType[]> => {
  const current = dayjs();

  const campaigns = await getCampaignsByUser(participant);
  const data = await Promise.all(
    campaigns.map(async (campaign) => {
      const distance = await userGetDistance(participant, campaign);

      await Promise.all(
        campaign.tracks.map(async (track, index) => {
          if (distance > track.track) {
            const nft = await isTrackNftExistIndex(campaign, participant, index);

            if (!nft) {
              const newNft = await createNet42Medal(campaign, participant, true, index);
              await createNft(newNft.baseNft);
            }
          }
        }),
      );

      const nfts = await getNfts(campaign, 1, participant, false);
      const claimedNfts = await getNfts(campaign, 1, participant, true);
      const registeredNft = await nftColl.findOne({ campaignId: campaign._id, participant, type: 0, nftId: { $ne: null } });
      const registeredNftNotClaimed = await nftColl.findOne({ campaignId: campaign._id, participant, type: 0, nftId: null });

      if (dayjs(campaign.startTime).isAfter(current)) {
        return { campaign, status: UserStateStatus.NOT_START_YET, nfts, claimedNfts, registeredNft, registeredNftNotClaimed, distance };
      }

      if (nfts.length > 0) {
        return { campaign, status: UserStateStatus.CLAIMABLE, nfts, claimedNfts, registeredNft, registeredNftNotClaimed, distance };
      }

      if (claimedNfts.length === campaign.tracks.length) {
        return { campaign, status: UserStateStatus.FINISHED, nfts, claimedNfts, registeredNft, registeredNftNotClaimed, distance };
      }

      if (campaign.hasEndTime) {
        if (dayjs(campaign.endTime).isBefore(current)) {
          if (campaign.tracks.length > 1) {
            if (claimedNfts.length > 0) {
              return { campaign, status: UserStateStatus.FINISHED, nfts, claimedNfts, registeredNft, registeredNftNotClaimed, distance };
            }
          }

          if (claimedNfts.length === 0) {
            if (registeredNft) return { campaign, status: UserStateStatus.UNFINISHED, nfts, claimedNfts, registeredNft, registeredNftNotClaimed, distance };
          }

          return { campaign, status: UserStateStatus.ENDED, nfts, claimedNfts, registeredNft, registeredNftNotClaimed, distance };
        }
      }

      if (registeredNft) {
        return { campaign, status: UserStateStatus.REGISTERED, nfts, claimedNfts, registeredNft, registeredNftNotClaimed, distance };
      }

      if (registeredNftNotClaimed) {
        return { campaign, status: UserStateStatus.AVAILABLE, nfts, claimedNfts, registeredNft, registeredNftNotClaimed, distance };
      }

      return { campaign, status: UserStateStatus.AVAILABLE, nfts, claimedNfts, registeredNft, registeredNftNotClaimed, distance };
    }),
  );

  return data;
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
