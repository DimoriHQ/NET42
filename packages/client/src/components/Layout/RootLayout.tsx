import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import { useAppDispatch } from "../../app/hooks";
import { verify } from "../../features/authentication/reducer";
import ScrollToTop from "./ScrollToTop";

const RootLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      dispatch(verify({ address }));
    }
  }, [address]);

  return (
    <>
      <Outlet />
      <ScrollToTop />
    </>
  );
};

export default RootLayout;
