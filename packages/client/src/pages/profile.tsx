import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import Container from "../components/Layout/Container";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const Profile: React.FC = () => {
  return <Container></Container>;
};

export default Profile;
