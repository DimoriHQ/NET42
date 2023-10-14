import dayjs from "dayjs";

export type CampaignType = {
  id?: string;

  name: string;
  description: string;

  image: string;
  banner: string;

  startTime: Date;
  hasEndTime: boolean;
  endTime?: Date;

  trackable: boolean;
  tracks: number[];
};

export const day0 = dayjs(0).toDate();

export const emptyCampaign: CampaignType = {
  name: "",
  description: "",
  image: "",
  banner: "",
  startTime: day0,
  hasEndTime: false,
  trackable: false,
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
