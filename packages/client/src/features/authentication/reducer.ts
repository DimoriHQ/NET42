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
  async ({ address }: { address: `0x${string}` | undefined }, { dispatch, getState }): Promise<{ isAuth: boolean; isAdmin: boolean; token: string }> => {
    const token = await getAuthStateToken(getState());

    const tryVerity = async (token: string, tried: boolean): Promise<{ isAuth: boolean; isAdmin: boolean; token: string }> => {
      try {
        const { data } = await axios.post<Response<{ isAuth: boolean; isAdmin: boolean }>>(`${config.apiURL}/v1/auth/verify?address=${address}`, undefined, {
          headers: { Authorization: "Bearer " + token },
        });
        if (data.status) {
          if (data.data.isAuth) {
            tokenStorage.set(token);
            return { ...data.data, token };
          } else {
            if (!tried) {
              const web3authToken = await getStateToken(getState());
              return await tryVerity(web3authToken, true);
            }
          }
        }

        dispatch(setToast({ show: true, title: "", message: data.message.text, type: "error" }));
        return { isAuth: false, isAdmin: false, token: "" };
      } catch (error) {
        console.error(error);
        return { isAuth: false, isAdmin: false, token: "" };
      }
    };

    return await tryVerity(token, false);
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
      state.token = action.payload.token;
    })
    .addCase(verify.rejected, (state) => {
      state.isVerifyInit = true;
      state.isVerifyLoading = false;
      state.isVerify = false;
      state.isAdmin = false;
    })
    .addCase(clearAuth, (state) => {
      state.isVerifyInit = true;
      state.isVerifyLoading = false;
      state.isVerify = false;
      state.isAdmin = false;
      state.token = "";
      tokenStorage.set("");
    });
});

export const selectAuth = (state: RootState) => state.auth;

export default authReducer;
