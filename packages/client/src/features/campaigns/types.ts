import dayjs from "dayjs";

export type Track = { track: number; image: string };

export const rawToCampaignType = (raw: RawCampaignType): CampaignType => {
  const {
    _id,

    name,
    description,

    image,
    banner,
    registeredImage,
    unfinishedImage,
    finishedImage,

    registerTime,
    startTime,
    hasEndTime,
    endTime,

    trackable,
    standardCode,
    tracks,
    stravaData,

    nftId,
  } = raw;

  const campaign = {
    _id,
    name,
    description,

    image,
    banner,
    registeredImage,
    unfinishedImage,
    finishedImage,

    registerTime: dayjs(registerTime),
    startTime: dayjs(startTime),
    hasEndTime,
    endTime: dayjs(endTime),

    trackable,
    standardCode,
    tracks,
    stravaData,

    nftId,
  };

  return campaign;
};

export type RawCampaignType = {
  _id?: string;

  name: string;
  description: string;

  image: string;
  banner: string;

  registeredImage: string;
  unfinishedImage: string;
  finishedImage?: string;

  registerTime: string;
  startTime: string;
  hasEndTime: boolean;
  endTime?: string;

  trackable: boolean;
  standardCode: string;
  tracks: Track[];
  stravaData: boolean;

  nftId?: number;
};

export type CampaignType = {
  _id?: string;

  name: string;
  description: string;

  image: string;
  banner: string;

  registeredImage: string;
  unfinishedImage: string;
  finishedImage?: string;

  registerTime: dayjs.Dayjs;
  startTime: dayjs.Dayjs;
  hasEndTime: boolean;
  endTime?: dayjs.Dayjs;

  trackable: boolean;
  standardCode: string;
  tracks: Track[];
  stravaData: boolean;

  nftId?: number;
};

export const day0 = dayjs(0);

export const emptyCampaign: CampaignType = {
  name: "",
  description: "",

  image: "",
  banner: "",
  registeredImage: "",
  unfinishedImage: "",

  registerTime: day0,
  startTime: day0,
  hasEndTime: false,

  trackable: false,
  stravaData: false,
  standardCode: "",
  tracks: [],
};

export type CampaignReducer = {
  isLoading: boolean;

  campaigns: CampaignType[];
  claimable: CampaignType[];
};

export const defaultCampaignReducer: CampaignReducer = {
  isLoading: false,

  campaigns: [],
  claimable: [],
};

export type UserTrack = {
  address: string;
  track: number;
};

export type UserTracks = UserTrack[];
