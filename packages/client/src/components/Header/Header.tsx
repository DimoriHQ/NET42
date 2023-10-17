import { disconnect } from "@wagmi/core";
import { ethers } from "ethers";
import React from "react";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearAuth, selectAuth, setProvider, verify } from "../../features/authentication/reducer";
import Section from "../Layout/Section";
import { Box, Button, Link } from "@mui/joy";
import Typography from '@mui/joy/Typography';
import "../../styles/header.css";
// import ColorSchemeToggle from './ColorSchemeToggle';

const Header: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { address, isConnected } = useAccount();

  const connect = async () => {
    await auth.web3AuthModalPack.signIn();
    const provider = new ethers.providers.Web3Provider(auth.web3AuthModalPack.getProvider()!);
    dispatch(setProvider(provider));
    dispatch(verify({ address: (await provider.getSigner().getAddress()) as `0x${string}` }));
  };

  const logout = async () => {
    dispatch(clearAuth());
    await disconnect();
    await auth.web3AuthModalPack.signOut();
  };

  const Profile = () => {
    if (isConnected) {
      return (  
        <div>
          <div>
            <Button color="neutral" variant="solid"><a href={`/profile/${address}`}>My profile: {address.slice(0, 8)}</a></Button>
            <Button color="danger" onClick={logout}>
          Logout
          </Button>
          </div>
          
        </div>
      );
    } else {
      return (
        <Button color="primary" onClick={connect}>
          Connect
        </Button>
      );
    }
  };

  return (
      <header className="header">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          top: 0,
          px: 1,
          py: 1,
          zIndex: 10000,
          // backgroundColor: 'black',
          // opacity: 0.8,
          // borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Link href="/">
            <img src="/images/n42.png" width={100} />
          </Link>
          <Typography component="h1" fontSize="lg" fontWeight="xl" textColor="white">
            Net Forty-Two
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Box
            sx={{
              gap: 1,
              alignItems: 'center',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <div>{Profile()}</div>
          </Box>
        </Box>
      </Box>
      </header>
  );
};

export default Header;
