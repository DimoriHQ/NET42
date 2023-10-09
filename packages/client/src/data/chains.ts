export type ChainType = {
  name: string;
  rpc: string;
  chainId: number;
  icon: string;
  nativeCurrency: {
    name: string;
    decimals: number;
    symbol: string;
  };
};
