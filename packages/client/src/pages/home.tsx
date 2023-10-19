import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useRef } from "react";
import { useEffectOnce } from "usehooks-ts";
import { useAppDispatch } from "../app/hooks";
import Campaigns from "../components/Campaign/Campaigns";
import Claimable from "../components/Home/Claimable";
import FeaturedUsers from "../components/Home/FeaturedUsers";
import Hero from "../components/Home/Hero";
import { getCampaigns } from "../features/campaigns/reducer";
import Information from "../components/Home/Information";
import About from "../components/Home/About";

import { CssVarsProvider, extendTheme  } from '@mui/joy/styles';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const customTheme = extendTheme({
  fontFamily: {
    body:
      "'Segoe UI Local', 'Segoe UI Web (West European)', var(--joy-fontFamily-fallback)"
  },
});

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(getCampaigns());
  });

  return (
    <CssVarsProvider theme={customTheme}>
      <Hero />
      <About />
      <Information />
      {/* <Claimable />
      <FeaturedUsers /> */}
    </CssVarsProvider>
  );
};

export default Home;
