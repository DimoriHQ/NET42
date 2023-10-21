import { RootState } from "../app/store";

export const getStateToken = async (state: unknown): Promise<{ token: string; address: string }> => {
  const { auth } = state as RootState;

  if (auth.web3AuthModalPack.web3Auth) {
    auth.web3AuthModalPack;

    const address = await auth.web3AuthModalPack.getAddress();

    if (!address) {
      return { token: "", address: "" };
    }

    const token = await auth.web3AuthModalPack.web3Auth!.authenticateUser();

    return { token: token.idToken, address };
  }

  return { token: "", address: "" };
};

export const getAuthStateToken = async (state: unknown): Promise<string> => {
  const { auth } = state as RootState;
  return auth.token;
};
