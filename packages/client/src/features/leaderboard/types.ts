export type RankReducer = {
  ranks: Array<Rank>;
  isLoading: boolean;
};

export type Rank = {
  address: string;
  point: number;
  count: number;
};

export const emptyRank: Rank = {
  address: "",
  point: 0,
  count: 0,
};

export const defaultRankReducer: RankReducer = {
  ranks: [],
  isLoading: false,
};
