import { Card, CardContent, Grid, Typography } from "@mui/joy";
import React from "react";
import "../../styles/Information.css";
import Section from "../Layout/Section";

const Information: React.FC = () => {
  return (
    <div className="information" id="infomation">
      <Section>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={12} sm={2} md={12} display="flex" justifyContent="center" alignItems="center" minHeight={180}>
            <Card sx={{ width: 180, height: 300, marginRight: 10 }}>
              <Typography level="title-lg">NFT-Base Reward</Typography>
              <CardContent orientation="horizontal">
                <Typography fontSize="lg" textAlign={"right"}>
                  We mint NFTs as digital medals, celebrating your fitness milestones and dedication
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 180, height: 300, marginBottom: 30, marginRight: 10}}>
              <Typography level="title-lg">Charity-Powered</Typography>
              <CardContent orientation="horizontal">
                <Typography fontSize="lg" textAlign={"right"}>
                  NFTs Minted - A Metric of Success in Social Causes Campaigns
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 180, height: 300, marginRight: 10 }}>
              <Typography level="title-lg">Community Hub</Typography>
              <CardContent orientation="horizontal">
                <Typography fontSize="lg" textAlign={"right"}>
                  Our platform connects runners, letting them share experiences, achievements, and charitable contribution.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 180, height: 300, marginBottom: 30, marginRight: 10 }}>
              <Typography level="title-lg">App Integration</Typography>
              <CardContent orientation="horizontal">
                <Typography fontSize="lg" textAlign={"right"}>
                  Syncs seamlessly with your favorite fitness apps, keeping you on track and on a mission
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br /> <br /> <br /> <br />
        <div>
          <h1>NET42 - where Running meets </h1>
          <h1>NFTs and Social Impact</h1>
        </div>
      </Section>
    </div>
  );
};

export default Information;
