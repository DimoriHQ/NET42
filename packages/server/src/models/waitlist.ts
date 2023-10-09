import { dbCollection } from "../db/collection";
import { Document, Collection } from "mongodb";
import logger from "../utils/log";

export type Waitlist = {
  email: string;
  time: Date;
};

type WaitlistDocument = Waitlist & {} & Document;

let waitlistColl: Collection<WaitlistDocument>;

export const heyCollInit = async () => {
  const { collection } = await dbCollection<WaitlistDocument>(process.env.DB__HEY!, process.env.DB__HEY_WAITLIST_COLLECTION!);
  waitlistColl = collection;

  await waitlistColl.createIndex({ email: 1 });
  await waitlistColl.createIndex({ time: 1 });

  logger.info({ thread: "db", message: "db inited" });
};

export const isExist = async (email: string): Promise<WaitlistDocument> => {
  const waitlist = await waitlistColl.findOne({ email });
  return waitlist;
};

export const saveWaitlist = async (email: string) => {
  await waitlistColl.insertOne({ email, time: new Date() });
};
