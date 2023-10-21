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
import { Exit } from "@styled-icons/boxicons-regular";
import { TravelExplore } from "@styled-icons/material-outlined";
import dayjs from "dayjs";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAccount, useContractReads, useContractWrite, useWaitForTransaction } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import config from "../../config";
import { selectAuth, setProvider, verify } from "../../features/authentication/reducer";
import { registerCampaign } from "../../features/campaigns/reducer";
import { CampaignType } from "../../features/campaigns/types";
import { sleep } from "../../services/utils/sleep";
import Popup from "../Popup/Popup";
import { usePopups } from "../Popup/PopupProvider";
import { setToast } from "../Toast/toastReducer";

export const DetailContainer: React.FC<{
  title: string;
  data: any;
  className?: string;
}> = ({ title, data, className }) => {
  return (
    <div className={`${className} flex-1 flex flex-col justify-center space-y-1 items-center py-2`}>
      <div className="w-full text-center mb-4">{title}</div>
      <p className="text-[54px] leading-[20px] font-bold">{data}</p>
    </div>
  );
};

const Campaign: React.FC<{ campaign: CampaignType }> = ({ campaign }) => {
  const { address, isConnected } = useAccount();
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

  const {
    data: contract,
    isError: contractError,
    isLoading: contractLoading,
    isFetched: contractFetched,
  } = useContractReads({
    watch: true,
    contracts: [
      {
        ...config.contract,
        functionName: "totalSupply",
      },
      {
        ...config.contract,
        functionName: "tokenURI",
        args: [tokenId],
      },
    ],
  });

  const tokenURI = (contract?.[1].result || "") as string;

  const {
    data: mintData,
    write,
    status: mintStatus,
    isLoading: mintLoading,
  } = useContractWrite({
    address: config.contractAddress,
    abi: config.contract.abi,
    functionName: "safeMint",
    onError(error) {
      setMinting(false);

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

  const {
    data: txData,
    isError: txError,
    isLoading: txLoading,
    isFetched,
  } = useWaitForTransaction({
    confirmations: 1,
    hash: mintData?.hash,
  });

  const mintSuccess = mintStatus === "success" && !!txData;
  const loading = minting || mintLoading || txLoading;
  const valid = !loading && address;
  const hasError = contractError || txError;

  useEffect(() => {
    if (mintSuccess && isFetched) {
      const nftId = parseInt(txData.logs[0].topics[3] as any, 16);
      setTokenId(nftId);
    }
  }, [mintSuccess, isFetched, txData]);

  useEffect(() => {
    if (tokenURI && tokenId != -1) {
      dispatch(
        setToast({
          show: true,
          title: "",
          message: `Submit transaction success!`,
          type: "success",
        }),
      );

      const fetchMetadata = () => {
        fetch(tokenURI)
          .then(async (res: any) => {
            const metadata = await res.json();

            setTimeout(() => {
              addPopup({
                Component: () => {
                  return (
                    <Popup className="bg-white">
                      <h2 className="text-center font-bold text-[24px] leading-[28px] ">Congratulation!</h2>
                      <div className="px-3 mb-2 mt-8 border-b-[1px] border-gray-300">
                        <div className="flex flex-col justify-center items-center space-y-2">
                          <img className="w-[400px] h-[400px] border border-none rounded-2xl" src={metadata.image} alt="nftimg" />
                          <div className="text-[18px] font-semibold">{metadata.name}</div>
                        </div>
                        <div className="flex justify-center items-center space-x-2 !text-gray-900 mx-16 my-4 p-2">
                          <DetailContainer className="font-bold" title="Level" data={metadata.attributes[0].value} />
                          <DetailContainer className="font-bold" title="Point" data={metadata.attributes[1].value} />
                          <DetailContainer className="font-bold" title="Day" data={metadata.attributes[2].value} />
                        </div>
                      </div>
                      <div className="w-full flex justify-between items-center !text-white">
                        <button
                          onClick={() => {
                            window.open(`${config.explorerURL}/${mintData?.hash}`, "_blank", "noopener,noreferrer");
                          }}
                          className="flex-1 bg-[#8d1cfe] max-w-[220px] text-[16px] leading-[32px] font-bold px-6 py-2 border border-none rounded-3xl flex space-x-2 justify-center items-center"
                        >
                          <p>View on explorer</p>
                          <TravelExplore size={20} />
                        </button>
                        <button
                          onClick={() => removeAll()}
                          className="flex-1 bg-[#8d1cfe] max-w-[200px] text-[16px] leading-[32px] font-bold px-6 py-2 border border-none rounded-3xl flex space-x-2 justify-center items-center"
                        >
                          <p>Go to campaign</p>
                          <Exit size={20} />
                        </button>
                      </div>
                    </Popup>
                  );
                },
                removeCallback: () => {
                  setMinting(false);
                  setTokenId(-1);
                },
              });

              setMinting(false);
            }, 3000);

            return;
          })
          .catch(() => {
            sleep(2000).then(() => {
              fetchMetadata();
            });
          });
      };

      fetchMetadata();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addPopup, dispatch, removeAll, tokenURI]);

  const CTAButton = () => {
    if (!isConnected || !address) {
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

    switch (campaign?.claim?.status) {
      case "available":
        return (
          <Button
            onClick={async () => {
              setMinting(true);

              if (!valid) return;

              try {
                dispatch(
                  registerCampaign({
                    isConnected,
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
                setMinting(false);
              }
            }}
            loading={minting}
          >
            Register
          </Button>
        );
      case "not_start_yet":
        return <Button disabled>Not Start Yet</Button>;
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
            loading={minting}
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
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <CardContent>{CTAButton()}</CardContent>
      </CardOverflow>
    </Card>
  );
};

export default Campaign;
