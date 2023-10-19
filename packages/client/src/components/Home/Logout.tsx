import React from "react";
import { disconnect } from "@wagmi/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearAuth, selectAuth } from "../../features/authentication/reducer";

const Logout: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const logout = async () => {
    dispatch(clearAuth());
    await disconnect();
    await auth.web3AuthModalPack.signOut();
  };

  return (
    <>
    </>
    // logout();
    // navigate('/');
  );
};

export default Logout;