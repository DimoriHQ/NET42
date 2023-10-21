import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, setProvider, verify } from "../../features/authentication/reducer";
import { getCampaigns } from "../../features/campaigns/reducer";
import Button from "./Button";

const Connect = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { address, isConnected } = useAccount();

  const connect = async () => {
    await auth.web3AuthModalPack.signIn();
    const provider = new ethers.providers.Web3Provider(auth.web3AuthModalPack.getProvider()!);
    dispatch(setProvider(provider));
    dispatch(verify({ address: (await provider.getSigner().getAddress()) as `0x${string}` }));
    dispatch(getCampaigns({ isConnected }));
  };

  const Profile = () => {
    if (isConnected) {
      return (
        <Link to={`/profile/${address}`}>
          <Button>View Profile</Button>
        </Link>
      );
    } else {
      return <Button onClick={connect}>Connect Wallet</Button>;
    }
  };

  return Profile();
};

export default Connect;
