import { Box, Card, CardContent, Grid, Typography } from "@mui/joy";
import Stack from '@mui/joy/Stack';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
import React from "react";
import "../../styles/Information.css";
import Section from "../Layout/Section";

const Information: React.FC = () => {
  return (
    <div className="information" id="information" py-5>
      <Divider />
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            top: 0,
            px: 3,
            py: 3,
            // zIndex: 10000,
            backgroundColor: "#0b6bcb",
          }}
        >
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={12} sm={2} md={12} display="flex" justifyContent="center" alignItems="center" minHeight={180}>
            <Card sx={{ width: 250, height: 400, marginRight: 10 }}>
              <Typography level="h2">NFT-based Rewards</Typography>
              <Divider />
              <CardContent orientation="horizontal">
                <Typography fontSize={24} textAlign={"left"}>
                  We mint NFTs as digital medals, celebrating your fitness milestones and dedication
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 250, height: 400, marginBottom: 30, marginRight: 10}}>
              <Typography level="h2">Charity-Powered</Typography>
              <Divider />
              <CardContent orientation="horizontal">
                <Typography fontSize={24} textAlign={"left"}>
                  NFTs Minted - a metric of success in social causes campaigns
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 250, height: 400, marginRight: 10 }}>
              <Typography level="h2">Community Hub</Typography>
              <Divider />
              <CardContent orientation="horizontal">
                <Typography fontSize={24} textAlign={"left"}>
                  Our platform connects runners, letting them share experiences, achievements, and charitable contribution.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 250, height: 400, marginBottom: 30, marginRight: 10 }}>
              <Typography level="h2">App Integration</Typography>
              <Divider />
              <CardContent orientation="horizontal">
                <Typography fontSize={24} textAlign={"left"}>
                  Syncs seamlessly with your favorite fitness apps, keeping you on track and on a mission
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        </Box>
        <center>
          <AspectRatio
            ratio="1"
            sx={{ width: 320, borderRadius: '100%' }}
          >
            <img
              src="/images/n42.png"
              loading="lazy"
              alt="NET42"
            />
          </AspectRatio>
          <Typography level="h2" fontSize={32} color="primary">
            <em>where running meets NFTs and Social Impact</em>
          </Typography>
        </center>
      </Stack>
    </div>
  );
};

export default Information;
