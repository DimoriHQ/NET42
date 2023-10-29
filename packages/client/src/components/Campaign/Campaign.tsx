import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authentication/reducer";
import { CampaignType } from "../../features/campaigns/types";
import { usePopups } from "../Popup/PopupProvider";

export const DetailContainer: React.FC<{
  title: string;
  data: any;
  className?: string;
}> = ({ title, data, className }) => {
  return (
    <div className={`${className} flex-1 flex flex-col justify-center space-y-1 items-center py-2`}>
      <div className="w-full text-center mb-4">{title}</div>
      <p className="leading-[20px] font-bold">{data}</p>
    </div>
  );
};

const Campaign: React.FC<{ campaign: CampaignType }> = ({ campaign }) => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [minting, setMinting] = useState(false);
  const [tokenId, setTokenId] = useState(-1);
  const { addPopup, removeAll } = usePopups();

  const marks = [
    {
      value: 0,
      label: `${campaign.startTime.format("MMM DD HH:mmA")}`,
    },
    {
      value: 100,
      label: campaign.hasEndTime ? (campaign.endTime ? `${campaign.endTime.format("MMM DD HH:mmA")}` : "∞") : "∞",
    },
  ];

  const currentTime = dayjs();
  const dateBetween = currentTime.diff(campaign.startTime, "days");
  const dateRange = campaign.startTime.diff(campaign.endTime, "days");
  let dateValue = currentTime.isBefore(campaign.startTime) ? 0 : currentTime.isAfter(campaign.endTime) ? 100 : (dateBetween / dateRange) * 100;
  if (!campaign.hasEndTime) dateValue = 0;

  return (
    <Card variant="outlined">
      <CardOverflow>
        <Link to={`/campaign/${campaign._id!}`}>
          <AspectRatio ratio="1">
            <img src={campaign.image} srcSet={`${campaign.image} 2x`} loading="lazy" alt="" />
          </AspectRatio>
        </Link>
      </CardOverflow>

      <CardContent>
        <Link to={`/campaign/${campaign._id!}`}>
          <div className="mb-2 text-[22px]">{campaign.name}</div>
          <div className="text-[14px] truncate">{campaign.description}</div>
        </Link>
      </CardContent>

      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            {campaign.joined} participants
          </Typography>
          <Divider orientation="vertical" />

          <div className="flex gap-2">
            <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
              Register From
            </Typography>

            <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
              {campaign.registerTime.format("LLL")}
            </Typography>
          </div>
        </CardContent>
      </CardOverflow>
      <CardOverflow>
        <CardContent>
          <Stepper activeStep={0} alternativeLabel>
            {marks.map((label) => (
              <Step key={label.value}>
                <StepLabel>{label.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default Campaign;
