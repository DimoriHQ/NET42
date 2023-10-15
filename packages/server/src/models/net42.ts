import * as ethers from "ethers";
import { dbCollection } from "../db/collection";
import { Document, Collection } from "mongodb";
import { checkS3Exist, uploadMetadataToS3, uploadToS3 } from "../services/s3";
import { DB__NET42, IMAGE_DIR, TEMPLATE_DIR } from "../config";
import logger from "../utils/log";
import Jimp from "jimp";
import { createDBCollName } from "../db/createDBCollName";
import { net42Contract } from "../services/ether";

// NFT
export type NET42NftType = {
  name: string;
  description: string;
  image: string;

  attributes: [
    {
      trait_type: "campaign_id";
      value: number;
    },
    {
      trait_type: "created_date";
      value: number;
    },
    {
      trait_type: "track";
      value: number;
    }?,
  ];

  seller_fee_basis_points: 0;

  compiler: "net42.run";
  external_url: "https://net42.run";
};

export type NET42Base = {
  _id: number;
  owner: string;

  campaignId: number;
  createdDate: Date;
  track?: number;
};

type NET42Document = NET42NftType & NET42Base & Document;

let nftColl: Collection<NET42Document>;

const collName = createDBCollName("nft");

export const nftCollInit = async () => {
  const { collection } = await dbCollection<NET42Document>(DB__NET42, collName);
  nftColl = collection;

  await nftColl.createIndex({ "attributes.[0].value": 1 });
  await nftColl.createIndex({ "attributes.[1].value": 1 });
  await nftColl.createIndex({ "attributes.[2].value": 1 });

  await nftColl.createIndex({ campaignId: 1 });
  await nftColl.createIndex({ createdDate: 1 });
  await nftColl.createIndex({ track: 1 });

  logger.info({ thread: "db", data: "nft inited" });
};

const getNftByRange = async (day: number, level: number) => {
  const cursor = nftColl.aggregate([{ $match: { day, level } }, { $group: { _id: null, count: { $count: {} } } }]);

  for await (const event of cursor) {
    return event.count as number;
  }

  return 0;
};

export const handleNftId = async (id: number) => {
  logger.info({ thread: "handle", message: `handle NFT Id ${id}` });

  const total = await getTotalSupply();

  if (id >= total) {
    logger.info({ thread: "handle", message: `handle NFT id ${id}, but total supply is ${total}, return` });

    return;
  }

  const dbNft = await isExist(id);
  const s3Nft = await checkS3Exist(getJsonFilename(id));

  if (dbNft) {
    logger.info({ thread: "handle", mesasge: `handle NFT id ${id}, existed dbNft` });

    if (s3Nft) {
      logger.info({ thread: "handle", message: `handle NFT id ${id}, existed dbNft and s3Nft` });

      return;
    }

    logger.info({ thread: "handle", message: `handle NFT id ${id}, existed dbNft, do not exist s3Nft, create one` });

    const nft = dbNftToNft(dbNft);
    await uploadMetadataToS3(nft, getJsonFilename(id));
    await genImage(id, nft);
    await uploadToS3(`${IMAGE_DIR}/${id}.png`, `${id}.png`);

    return;
  }

  const owner = await net42Contract.ownerOf(id);
  const day = (await getDayOfNFT(id)).toNumber();

  const nft = await newNft(id, day);
  await nftColl.insertOne({ ...nft, _id: id, owner, campaignId: 0, createdDate: new Date() });

  // push to s3
  await uploadMetadataToS3(nft, getJsonFilename(id));

  await genImage(id, nft);
  await uploadToS3(`${IMAGE_DIR}/${id}.png`, `${id}.png`);
};

export const getTotalSupply = async (): Promise<number> => {
  return (await net42Contract.totalSupply()) as number;
};

const isExist = async (id: number): Promise<NET42Document> => {
  const nft = await nftColl.findOne({ _id: id });
  return nft;
};

const getDayOfNFT = async (id: number) => {
  const day = (await net42Contract.dayOfNFT(id)) as ethers.BigNumber;

  return day;
};

const dbNftToNft = (dbNft: NET42Document): NET42NftType => {
  return {
    name: `NET42 #${dbNft._id}`,
    image: genImageS3URL(dbNft._id),
    description: dbNft.description,
    attributes: dbNft.attributes,
    seller_fee_basis_points: 0,
    compiler: "net42.run",
    external_url: "https://net42.run",
  };
};

const newNft = async (id: number, campaignId: number): Promise<NET42NftType> => {
  const nft: NET42NftType = {
    name: `Dimori Campaign #${campaignId} - #${id}`,
    image: genImageS3URL(id),
    description: "",
    attributes: [
      {
        trait_type: "campaign_id",
        value: campaignId,
      },
      {
        trait_type: "created_date",
        value: Date.now(),
      },
    ],
    seller_fee_basis_points: 0,
    compiler: "net42.run",
    external_url: "https://net42.run",
  };

  return nft;
};

const genImageS3URL = (id: number) => {
  return `https://${""}/images/${id}.png`;
};

const genMetadataS3URL = (id: number) => {
  return `https://${""}/${id}.json`;
};

const getJsonFilename = (id: number) => {
  return `${id}.json`;
};

const levelFromAttributes = (nft: NET42NftType) => {
  return nft.attributes[0].value;
};

const pointFromAttributes = (nft: NET42NftType) => {
  return nft.attributes[1].value;
};

const dayFromAttributes = (nft: NET42NftType) => {
  return nft.attributes[2].value;
};

// need to update match with dimori
const genImage = async (id: number, nft: NET42NftType) => {
  // copy template and move to images
  const point = pointFromAttributes(nft);

  let image = await Jimp.read(`${TEMPLATE_DIR}/${""}${levelFromAttributes(nft)}-1024.png`);

  if (point === 0) {
    image = await Jimp.read(`${TEMPLATE_DIR}/${""}id0-1024.png`);
  }

  if (point === 50) {
    image = await Jimp.read(`${TEMPLATE_DIR}/${""}id50-1024.png`);
  }

  // const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  // const fontPoint = await Jimp.loadFont(`${TEMPLATE_DIR}/OYrmtVgCAYZDpQ8oqON0Vfor.ttf.fnt`);

  // add text to image

  // const level = levelFromAttributes(nft);
  // const day = dayFromAttributes(nft);

  // image.print(font, 1890, 2099, day);
  // image.print(font, 1375, 2099, level);
  // image.print(font, 890, 265, id);
  // image.print(fontPoint, 1270, 2300, point);

  // image.print(font, 632, 710, day);
  // image.print(font, 458, 710, level);
  // image.print(font, 295, 90, id);
  // image.print(fontPoint, 370, 740, point);

  await image.writeAsync(`${IMAGE_DIR}/${id}.png`);
};

export const updateOwner = async (id: number) => {
  const nft = await nftColl.findOne({ _id: id });

  if (!nft) {
    return;
  }

  const owner = await net42Contract.ownerOf(id);

  logger.info({ thread: "model", model: "nft", message: `update owner ${id} ${owner}` });

  await nftColl.updateOne({ _id: id }, { $set: { owner } });
};
