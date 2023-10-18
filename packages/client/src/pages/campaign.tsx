import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import Section from "../components/Layout/Section";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const Campaign: React.FC = () => {
  return <Section>campaign</Section>;
};

export default Campaign;
