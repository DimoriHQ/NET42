import { RootState } from "../app/store";

export const getStateToken = async (state: unknown): Promise<string> => {
  const { auth } = state as RootState;
  if (auth.web3AuthModalPack.web3Auth) {
    const token = await auth.web3AuthModalPack.web3Auth!.authenticateUser();
    return token.idToken;
  }

  return "";
};

export const getAuthStateToken = async (state: unknown): Promise<string> => {
  const { auth } = state as RootState;
  return auth.token;
};
