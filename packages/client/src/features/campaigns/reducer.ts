import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { setToast } from "../../components/Toast/toastReducer";
import config from "../../config";
import { getStateToken } from "../../services/getStateToken";
import { Response } from "../../services/response";
import { CampaignType, ClaimableResponseType, MintProof, RawCampaignType, defaultCampaignReducer, emptyCampaign, rawToCampaignType } from "./types";

export const getCampaigns = createAsyncThunk("campaign/getCampaigns", async ({ isConnected }: { isConnected: boolean }, { dispatch, getState }): Promise<CampaignType[]> => {
  let token = "";
  let address = "";
  if (isConnected) {
    const data = await getStateToken(getState());
    token = data.token;
    address = data.address;
  }

  try {
    const { data } = await axios.get<Response<RawCampaignType[]>>(`${config.apiURL}/v1/campaigns?address=${address}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.status) {
      return data.data.map(rawToCampaignType);
    }

    dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));

    throw new Error(data.message.text);
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const createCampaign = createAsyncThunk(
  "campaign/createCampaign",
  async (
    { campaign, isConnected, callback }: { campaign: FormData; isConnected: boolean; callback: (last: CampaignType) => void },
    { getState, dispatch },
  ): Promise<CampaignType[]> => {
    let token = "";
    let address = "";
    if (isConnected) {
      const data = await getStateToken(getState());
      token = data.token;
      address = data.address;
    }

    try {
      const { data } = await axios.post<Response<RawCampaignType[]>>(`${config.apiURL}/v1/campaign?address=${address}`, campaign, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.status) {
        dispatch(setToast({ show: true, title: "", message: "Create campaign success", type: "success" }));
        callback(rawToCampaignType(data.data[data.data.length - 1]));
        return data.data.map(rawToCampaignType);
      }

      dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));

      throw new Error(data.message.text);
    } catch (error) {
      console.error(error);
      return [];
    }
  },
);

export const getCampaign = createAsyncThunk("campaign/getCampaign", async ({ callback }: { callback: (last: CampaignType) => void }, { dispatch }): Promise<CampaignType> => {
  try {
    const { data } = await axios.get<Response<RawCampaignType>>(`${config.apiURL}/v1/campaign`);
    if (data.status) {
      callback(rawToCampaignType(data.data));
      return rawToCampaignType(data.data);
    }

    dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));

    throw new Error(data.message.text);
  } catch (error) {
    console.error(error);
    return emptyCampaign;
  }
});

export const getClaimable = createAsyncThunk("campaign/getClaimable", async ({ isConnected }: { isConnected: boolean }, { dispatch, getState }): Promise<ClaimableResponseType> => {
  let token = "";
  let address = "";
  if (isConnected) {
    const data = await getStateToken(getState());
    token = data.token;
    address = data.address;
  }

  try {
    const { data } = await axios.get<Response<ClaimableResponseType>>(`${config.apiURL}/v1/claimable?address=${address}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.status) {
      return data.data;
    }

    dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));

    throw new Error(data.message.text);
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const registerCampaign = createAsyncThunk(
  "campaign/registerCampaign",
  async (
    { id, callback, isConnected }: { id: string; isConnected: boolean; callback: ({ data }: { data: MintProof }) => void },
    { getState, dispatch },
  ): Promise<MintProof | undefined> => {
    let token = "";
    let address = "";
    if (isConnected) {
      const data = await getStateToken(getState());
      token = data.token;
      address = data.address;
    }

    try {
      const { data } = await axios.post<Response<MintProof>>(`${config.apiURL}/v1/campaign/${id}/register?address=${address}`, undefined, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.status) {
        callback({ data: data.data });

        return data.data;
      }

      dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));

      throw new Error(data.message.text);
    } catch (error) {
      console.error(error);
    }
  },
);

const campaignReducer = createReducer(defaultCampaignReducer, (builder) => {
  return builder
    .addCase(getCampaigns.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getCampaigns.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.campaigns = action.payload;
    })
    .addCase(createCampaign.fulfilled, (state, action) => {
      state.campaigns = action.payload;
    })
    .addCase(getClaimable.fulfilled, (state, action) => {
      state.claimable = action.payload;
    });
});

export const selectCampaign = (state: RootState) => state.campaign;

export default campaignReducer;
