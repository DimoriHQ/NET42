import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authentication/reducer";

const UserLayout: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const navigate = useNavigate();

  const isConnected = false;

  useEffect(() => {
    if (auth.isVerifyInit && !auth.isVerify) {
      navigate("/");
    }

    if (!isConnected) {
      navigate("/");
    }
  }, [auth]);

  return <Outlet />;
};

export default UserLayout;
