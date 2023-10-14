import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { setToast } from "../../components/Toast/toastReducer";
import config from "../../config";
import { Response } from "../../services/response";
import { CampaignType, defaultCampaignReducer, emptyCampaign } from "./types";

export const getCampaigns = createAsyncThunk("campaign/getCampaigns", async (_, { dispatch }): Promise<CampaignType[]> => {
  try {
    const { data } = await axios.get<Response<CampaignType[]>>(`${config.apiURL}/v1/campaigns`);
    if (data.status) {
      return data.data;
    }

    dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));

    return [];
  } catch (error) {
    return [];
  }
});

export const createCampaign = createAsyncThunk("campaign/createCampaign", async ({ campaign }: { campaign: CampaignType }, { dispatch }): Promise<CampaignType[]> => {
  try {
    const { data } = await axios.post<Response<CampaignType[]>>(`${config.apiURL}/v1/campaign`, campaign);
    if (data.status) {
      return data.data;
    }

    dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));

    return [];
  } catch (error) {
    return [];
  }
});

export const getCampaign = createAsyncThunk("campaign/getCampaign", async (_, { dispatch }): Promise<CampaignType> => {
  try {
    const { data } = await axios.get<Response<CampaignType>>(`${config.apiURL}/v1/campaign`);
    if (data.status) {
      return data.data;
    }

    dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));

    return emptyCampaign;
  } catch (error) {
    return emptyCampaign;
  }
});

export const getClaimable = createAsyncThunk("campaign/getClaimable", async (_, { dispatch }): Promise<CampaignType[]> => {
  try {
    const { data } = await axios.get<Response<CampaignType[]>>(`${config.apiURL}/v1/claimable`);
    if (data.status) {
      return data.data;
    }

    dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));

    return [];
  } catch (error) {
    return [];
  }
});

export const claim = createAsyncThunk("campaign/claim", async (): Promise<CampaignType[]> => {
  try {
    const { data } = await axios.post<{ data: CampaignType[] }>(`${config.apiURL}/v1/claim`);

    return data.data;
  } catch (error) {
    return [];
  }
});

const campaignReducer = createReducer(defaultCampaignReducer, (builder) => {
  return builder
    .addCase(getCampaigns.fulfilled, (state, action) => {
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
