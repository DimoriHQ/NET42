import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import config from "../../config";
import { defaultRankReducer, Rank } from "./types";

export const getRanks = createAsyncThunk("ranks/get", async (): Promise<Rank[]> => {
  try {
    const RANK_API = `${config.apiURL}/v1/leaderboard`;
    const data = await fetch(RANK_API, { method: "GET", headers: { "Content-Type": "text/plain" } })
      .then(async (data) => {
        return await data.json();
      })
      .catch((err) => {
        return [];
      });

    return data;
  } catch (error) {
    return [];
  }
});

const rankReducer = createReducer(defaultRankReducer, (builder) => {
  builder
    .addCase(getRanks.pending, (state) => {
      return { ...state, isLoading: true };
    })
    .addCase(getRanks.fulfilled, (state, action) => {
      if (action.payload) {
        state.ranks = action.payload;
      }
      state.isLoading = false;
    })
    .addCase(getRanks.rejected, (state) => {
      return { ...state, isLoading: false };
    });
});

export const selectRanks = (state: RootState) => state.ranks;

export default rankReducer;
