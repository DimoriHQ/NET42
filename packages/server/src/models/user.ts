import { dbCollection } from "../db/collection";
import { Document, Collection, ObjectId, WithId } from "mongodb";
import logger from "../utils/log";
import { DB__NET42 } from "../config";
import { createDBCollName } from "../db/createDBCollName";
import { CampaignBaseType, createNet42Medal } from "./campaign";
import { NET42Base, NET42NftType, createNft, createNftProof, isRegisterdNftExist, net42BaseToftType } from "./net42";

export type User = {
  address: string;
  joined: ObjectId[];
};

type UserDocument = User & Document;

const collName = createDBCollName("user");

let userColl: Collection<UserDocument>;

export const userCollInit = async () => {
  const { collection } = await dbCollection<UserDocument>(DB__NET42, collName);
  userColl = collection;

  await userColl.createIndex({ address: 1 });

  logger.info({ thread: "db", collection: collName, stage: "initial" });
};

export const createUser = async (user: User) => {
  logger.info({ thread: "db", collection: userColl.collectionName, action: "createUser", user });

  return await userColl.insertOne(user);
};

export const getUser = async (address: string): Promise<WithId<UserDocument>> => {
  const user = await userColl.findOne({ address });

  return user;
};

export const userJoinCampaign = async (
  campaign: WithId<CampaignBaseType>,
  address: string,
): Promise<{
  user: UserDocument;
  nft: {
    baseNft: NET42Base;
    nft: NET42NftType;
  };
  proof: string;
}> => {
  const user = await getUser(address);

  if (!user) {
    const newUser: User = {
      address,
      joined: [campaign._id],
    };

    const id = (await createUser(newUser)).insertedId;
    user._id = id;
  }

  await userColl.updateOne({ address }, { $addToSet: { joined: campaign._id } });

  let baseNft = await isRegisterdNftExist(campaign, address);
  let nft: NET42NftType;
  if (baseNft) {
    nft = net42BaseToftType(campaign, baseNft);
  }

  if (!baseNft) {
    const newNft = await createNet42Medal(campaign, address);
    const created = await createNft(newNft.baseNft);
    newNft.baseNft._id = created.insertedId;
    baseNft = newNft.baseNft;
    nft = newNft.nft;
  }

  const proof = await createNftProof(baseNft);

  return { user: await getUser(address), nft: { baseNft, nft }, proof };
};
