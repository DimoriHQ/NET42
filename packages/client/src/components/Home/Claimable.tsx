import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { Box, Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/joy";
import React from "react";
import "../../styles/Claimable.css";
import Section from "../Layout/Section";

const Claimable: React.FC = () => {
  return (
    <Section>
      <div className="claimable" id='claimable'>
      <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
          >
            {[
              { name: "NFT HUE 42km", quotes: "lalalalallalala", nft: "/images/oct23-42k.png" },
              { name: "NFT SAI GON 21km", quotes: "lalalalallalala", nft: "/images/oct23-21k.png" },
              { name: "NFT HA NOI 10km", quotes: "lalalalallalala", nft: "/images/oct23-10k.png" },
              { name: "NFT SAI GON 42km", quotes: "lalalalallalala", nft: "/images/oct23-42k.png" },
            ].map((name, index) => {
              return (
                <Grid key={index} xs={12} sm={6} md={3} display="flex" justifyContent="center" alignItems="center" minHeight={180}>
                  <Card sx={{ width: 320 }}>
                    <div>
                      <Typography level="title-lg">{name.name}</Typography>
                      {/* <Typography level="body-sm">{name.time}</Typography> */}
                      <IconButton aria-label="bookmark Bahamas Islands" variant="plain" color="neutral" size="sm" sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}>
                        <BookmarkAdd />
                      </IconButton>
                    </div>
                    <img
                      src={name.nft}
                      srcSet={name.nft}
                      loading="lazy"
                      alt=""
                    />
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography level="body-xs">Quotes for you: </Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                         {name.quotes}
                        </Typography>
                      </div>
                      <Button variant="solid" size="md" color="primary" aria-label="Explore Bahamas Islands" sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}>
                        Claim 
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    </Section>
  );
};

export default Claimable;
