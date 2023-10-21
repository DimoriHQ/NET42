import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { ethers } from "ethers";
import { RootState } from "../../app/store";
import { setToast } from "../../components/Toast/toastReducer";
import config from "../../config";
import { getAuthStateToken, getStateToken } from "../../services/getStateToken";
import { Response } from "../../services/response";
import { defaultAuthReducer, tokenStorage } from "./types";

export const setProvider = createAction<ethers.providers.Web3Provider>("auth/setProvider");
export const clearAuth = createAction("auth/clearAuth");

export const verify = createAsyncThunk(
  "auth/verify",
  async (
    { address }: { address: `0x${string}` | undefined },
    { dispatch, getState },
  ): Promise<{ isAuth: boolean; isAdmin: boolean; isStravaConnected: boolean; token: string }> => {
    const token = await getAuthStateToken(getState());

    const tryVerity = async (token: string, tried: boolean): Promise<{ isAuth: boolean; isAdmin: boolean; isStravaConnected: boolean; token: string }> => {
      try {
        const { data } = await axios.post<Response<{ isAuth: boolean; isAdmin: boolean; isStravaConnected: boolean }>>(
          `${config.apiURL}/v1/auth/verify?address=${address}`,
          undefined,
          {
            headers: { Authorization: "Bearer " + token },
          },
        );
        if (data.status) {
          if (data.data.isAuth) {
            tokenStorage.set(token);
            return { ...data.data, token };
          } else {
            if (!tried) {
              const web3authToken = await getStateToken(getState());
              return await tryVerity(web3authToken.token, true);
            }
          }
        }

        dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));
        return { isAuth: false, isAdmin: false, isStravaConnected: false, token: "" };
      } catch (error) {
        console.error(error);
        return { isAuth: false, isAdmin: false, isStravaConnected: false, token: "" };
      }
    };

    return await tryVerity(token, false);
  },
);

export const connectStrava = createAsyncThunk(
  "auth/connectStrava",
  async ({ isConnected, callback }: { isConnected: boolean; callback: (requestCode: string) => Promise<void> }, { getState, dispatch }) => {
    let token = "";
    let address = "";
    if (isConnected) {
      const data = await getStateToken(getState());
      token = data.token;
      address = data.address;
    } else {
      return;
    }

    try {
      const { data } = await axios.post<Response<string>>(`${config.apiURL}/v1/strava/request?address=${address}`, undefined, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.status) {
        callback(data.data);
        return;
      }

      dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));

      throw new Error(data.message.text);
    } catch (error) {
      console.error(error);
      return [];
    }
  },
);

const authReducer = createReducer(defaultAuthReducer, (builder) => {
  return builder
    .addCase(setProvider, (state, action) => {
      state.provider = action.payload;
    })
    .addCase(verify.pending, (state) => {
      state.isVerifyLoading = true;
    })
    .addCase(verify.fulfilled, (state, action) => {
      state.isVerifyInit = true;
      state.isVerifyLoading = false;
      state.isVerify = action.payload.isAuth;
      state.isAdmin = action.payload.isAdmin;
      state.isStravaConnected = action.payload.isStravaConnected;
      state.token = action.payload.token;
    })
    .addCase(verify.rejected, (state) => {
      state.isVerifyInit = true;
      state.isVerifyLoading = false;
      state.isVerify = false;
      state.isStravaConnected = false;
      state.isAdmin = false;
    })
    .addCase(clearAuth, (state) => {
      state.isVerifyInit = true;
      state.isVerifyLoading = false;
      state.isVerify = false;
      state.isAdmin = false;
      state.isStravaConnected = false;
      state.token = "";
      tokenStorage.set("");
    });
});

export const selectAuth = (state: RootState) => state.auth;

export default authReducer;
