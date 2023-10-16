import { Button, Slider, styled } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { withStyles } from "@mui/styles";
import dayjs from "dayjs";
import { CampaignType } from "../../features/campaigns/types";

const Separator = styled("div")(
  ({ theme }) => `
  height: ${theme.spacing(3)};
`,
);

function valueText(value: number) {
  return `${value}`;
}

const CampaiggnTimeSlider = withStyles((theme) => {
  return {};
})(Slider);

const Campaign: React.FC<{ campaign: CampaignType }> = ({ campaign }) => {
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

  const CTAButton = () => {
    return <Button>Register</Button>;
  };

  const currentTime = dayjs();
  const dateBetween = currentTime.diff(campaign.startTime, "days");
  const dateRange = campaign.startTime.diff(campaign.endTime, "days");
  let dateValue = currentTime.isBefore(campaign.startTime) ? 0 : currentTime.isAfter(campaign.endTime) ? 100 : (dateBetween / dateRange) * 100;
  if (!campaign.hasEndTime) dateValue = 0;

  return (
    <Card variant="outlined">
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={campaign.banner} srcSet={`${campaign.banner} 2x`} loading="lazy" alt="" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{campaign.name}</Typography>
        <Typography level="body-sm">{campaign.description}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            6.3k Participants
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
          <div className="max-w-[200px] mx-auto w-full">
            <CampaiggnTimeSlider
              disableSwap={true}
              track="inverted"
              aria-labelledby="track-inverted-slider"
              getAriaValueText={valueText}
              defaultValue={dateValue}
              onChange={(e) => {
                e.preventDefault();
              }}
              marks={marks}
            />
            <Separator />
          </div>
        </CardContent>
      </CardOverflow>
      <CardOverflow>
        <div>Tracks</div>
        <div className="my-4 mx-auto">
          {campaign.tracks.map((track, index) => {
            return (
              <div key={index}>
                <div className="">
                  {" "}
                  <img className="block mx-auto" src={track.image} alt="" width={50} />
                </div>
                <div>{track.track} meters</div>
              </div>
            );
          })}
        </div>
      </CardOverflow>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <CardContent>{CTAButton()}</CardContent>
      </CardOverflow>
    </Card>
  );
};

export default Campaign;
