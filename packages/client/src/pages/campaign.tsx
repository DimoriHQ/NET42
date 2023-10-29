import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const Campaign: React.FC = () => {
  return <div />;
};

export default Campaign;
