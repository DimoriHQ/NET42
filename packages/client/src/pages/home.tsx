import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { useEffectOnce } from "usehooks-ts";
import { useAppDispatch } from "../app/hooks";
import Campaigns from "../components/Campaign/Campaigns";
import Claimable from "../components/Home/Claimable";
import FeaturedUsers from "../components/Home/FeaturedUsers";
import Hero from "../components/Home/Hero";
import { getCampaigns } from "../features/campaigns/reducer";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(getCampaigns());
  });

  return (
    <>
      <Hero />
      <Claimable />
      <Campaigns />
      <FeaturedUsers />
    </>
  );
};

export default Home;
