import React from "react";
import { Outlet } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";
import { useAccount } from "wagmi";
import { useAppDispatch } from "../../app/hooks";
import { verify } from "../../features/authentication/reducer";

const RootLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { address } = useAccount();

  useEffectOnce(() => {
    dispatch(verify({ address }));
  });

  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
