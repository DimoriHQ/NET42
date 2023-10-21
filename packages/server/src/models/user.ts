import { dbCollection } from "../db/collection";
import { Document, Collection, ObjectId, WithId } from "mongodb";
import logger from "../utils/log";
import { DB__NET42 } from "../config";
import { createDBCollName } from "../db/createDBCollName";
import { CampaignBaseType, createNet42Medal, getCampaignsById } from "./campaign";
import { NET42Base, NET42NftType, createNft, createNftProof, isRegisterdNftExist, net42BaseToftType } from "./net42";
import randomstring from "randomstring";

export type User = {
  address: string;
  joined: ObjectId[];
  stravaOAuth2?: StravaOAuth2Type;
  stravaRequest?: string;
};

export type StravaOAuth2Type = {
  token_type: "Bearer";
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: {
    id: number;
    username: string;
    resource_state: number;
    firstname: string;
    lastname: string;
    bio: string;
    city: string;
    state: string;
    country: string;
    sex: string;
    premium: boolean;
    summit: boolean;
    created_at: string;
    updated_at: string;
    badge_type_id: number;
    weight: number;
    profile_medium: string;
    profile: string;
    friend: any;
    follower: any;
  };
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

export const getCampaignsByUser = async (address: string) => {
  const user = await getUser(address);
  const campaigns = await getCampaignsById(user.joined);

  return campaigns;
};

export const createStravaRequest = async (address: string) => {
  const stravaRequest = randomstring.generate();
  await userColl.updateOne({ address }, { $set: { stravaRequest } });

  return stravaRequest;
};

export const updateStravaConnect = async (requestCode: string, stravaOAuth2: StravaOAuth2Type) => {
  await userColl.updateOne({ stravaRequest: requestCode }, { $set: { stravaOAuth2 } });
};

export const isStravaConnected = async (address: string) => {
  const user = await getUser(address);

  return !!user.stravaOAuth2;
};

// export const getTrackingData = async (access_token: string, registertime: number, endtime: number, page: number, per_page: number) => {
//   const link = `${process.env.STRAVA_ATHLETE_LINK}/activities?before=${endtime}&after=${registertime}&page=${page}&per_page=${per_page}`;

//   const data = await axios.get(link, {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });

//   return data.data.filter((e: any) => {
//     return e.name.includes("Run");
//   });
// };

// export const getDistance = async (activities: any) => {
//   var total_distance = 0;
//   if (activities) {
//     activities.forEach((e: any) => {
//       total_distance += e["distance"];
//     });
//   }
//   return total_distance;
// };
