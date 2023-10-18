import { Button } from "@mui/joy";
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
import { ethers } from "ethers";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAccount, useContractWrite } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import config from "../../config";
import { selectAuth, setProvider, verify } from "../../features/authentication/reducer";
import { registerCampaign } from "../../features/campaigns/reducer";
import { CampaignType } from "../../features/campaigns/types";
import { setToast } from "../Toast/toastReducer";

const Campaign: React.FC<{ campaign: CampaignType }> = ({ campaign }) => {
  const { address, isConnected } = useAccount();
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

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

  const {
    data,
    write,
    status,
    isLoading: mintLoading,
  } = useContractWrite({
    address: config.contractAddress,
    abi: config.contract.abi,
    functionName: "safeMint",
    onSuccess: () => {
      setLoading(false);
    },
    onError(error) {
      setLoading(false);
      dispatch(
        setToast({
          show: true,
          title: "",
          message: error.message.split("\n")?.[0] || error.message,
          type: "error",
        }),
      );
    },
  });

  const CTAButton = () => {
    if (!isConnected) {
      return (
        <Button
          onClick={async () => {
            await auth.web3AuthModalPack.signIn();
            const provider = new ethers.providers.Web3Provider(auth.web3AuthModalPack.getProvider()!);
            dispatch(setProvider(provider));
            if (address) dispatch(verify({ address }));
          }}
        >
          Connect
        </Button>
      );
    }

    switch (campaign.status) {
      case "available":
        return (
          <Button
            onClick={async () => {
              setLoading(true);

              try {
                dispatch(
                  registerCampaign({
                    address: address!,
                    id: campaign._id!,
                    callback: ({ data }) => {
                      write({
                        args: [data.nft.baseNft.campaignId, data.nft.baseNft.type, data.nft.baseNft._id, data.nft.baseNft.metadata, data.proof],
                      });
                    },
                  }),
                );
              } catch (error) {
                console.error(error);
                setLoading(false);
              }
            }}
            loading={loading}
          >
            Register
          </Button>
        );
      case "ended":
        return <Button disabled>Ended</Button>;
      case "finished":
        return <Button disabled>Unfinished</Button>;
      case "unfinished":
        return <Button disabled>Unfinished</Button>;
      case "registered":
        return <Button disabled>Registered</Button>;
      case "claimable":
        return (
          <Button
            onClick={() => {
              //
            }}
            loading={loading}
          >
            Claimable
          </Button>
        );

      default:
        break;
    }
  };

  const currentTime = dayjs();
  const dateBetween = currentTime.diff(campaign.startTime, "days");
  const dateRange = campaign.startTime.diff(campaign.endTime, "days");
  let dateValue = currentTime.isBefore(campaign.startTime) ? 0 : currentTime.isAfter(campaign.endTime) ? 100 : (dateBetween / dateRange) * 100;
  if (!campaign.hasEndTime) dateValue = 0;

  return (
    <Card variant="outlined">
      <CardOverflow>
        <Link to={`/campaign/${campaign._id!}`}>
          <AspectRatio ratio="2">
            <img src={campaign.banner} srcSet={`${campaign.banner} 2x`} loading="lazy" alt="" />
          </AspectRatio>
        </Link>
      </CardOverflow>

      <CardContent>
        <Link to={`/campaign/${campaign._id!}`}>
          <Typography level="title-md">{campaign.name}</Typography>
          <Typography level="body-sm">{campaign.description}</Typography>
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
      <CardOverflow>
        <Link to={`/campaign/${campaign._id!}`}>
          <div>Tracks</div>
          <div className="my-4 mx-auto flex">
            {campaign.tracks.map((track, index) => {
              return (
                <div key={index} className="">
                  <div className="">
                    {" "}
                    <img className="block mx-auto" src={track.image} alt="" width={50} />
                  </div>
                  <div>{track.track} meters</div>
                </div>
              );
            })}
          </div>
        </Link>
      </CardOverflow>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <CardContent>{CTAButton()}</CardContent>
      </CardOverflow>
    </Card>
  );
};

export default Campaign;
