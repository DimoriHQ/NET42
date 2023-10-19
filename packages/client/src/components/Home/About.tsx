import { Card, CardContent, Grid, Typography } from "@mui/joy";
import Stack from '@mui/joy/Stack';
import Chip from '@mui/joy/Chip';
import React from "react";
import Section from "../Layout/Section";

const About: React.FC = () => {
  return (
    <Section>
      <Stack spacing={2.5}>
        <Card> 
          <Typography level="body-lg" fontSize={20}>
            Welcome to the world of <Chip color="primary" size="lg" variant="outlined">NET42</Chip> where every step you take not only boosts your health but also fuels a brighter future. We're on a mission to infuse running with purpose and passion, driven by the magic of NFTs and the boundless potential of Web3.
          </Typography>
        </Card>
        <Card> 
          <Typography level="body-lg" fontSize={20}>
            Within the fitness community, there is a growing need for motivation, engagement, and sustainability. Traditional fitness apps often lack compelling incentives and a sense of community, particularly in addressing environmental impact and supporting social causes. Meanwhile, runners seek ways to contribute beyond their personal health and turn their passion into a force for good.
          </Typography>
        </Card>
        <Card> 
          <Typography level="body-lg" fontSize={20}>
          <Chip color="primary" size="lg" variant="outlined">NET42</Chip> tackles these issues head-on. We're building a platform that encourages users to run not only for personal health, but also environmental and social causes. Our secret sauce? NFT-based rewards. Imagine earning unique digital tokens for your running achievements and using them to support social causes.
          </Typography>
        </Card> 
      </Stack>
    </Section>
  );
};

export default About;
