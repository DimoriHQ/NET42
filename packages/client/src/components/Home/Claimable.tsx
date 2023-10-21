import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/joy";
import React from "react";
import Cointainer from "../Layout/Container";

const Claimable: React.FC = () => {
  const claimableNfts: { name: string; index: number; image: string }[] = [];

  return (
    <section className="py-[50px]">
      <Cointainer>
        <div className="mb-[16px]">
          <div className="text-[42px] font-bold text-center">Join running campaigns</div>
          <div className="text-[16px] text-center">Become part of the NET42 runner community</div>
        </div>
        {claimableNfts.map((name, index) => {
          return (
            <Grid key={index} xs={12} sm={6} md={3} display="flex" justifyContent="center" alignItems="center" minHeight={180}>
              <Card sx={{ width: 320 }}>
                <div>
                  <Typography level="title-lg">{name.name}</Typography>

                  <IconButton aria-label="bookmark Bahamas Islands" variant="plain" color="neutral" size="sm" sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}>
                    <BookmarkAdd />
                  </IconButton>
                </div>
                <img src={name.image} alt="" />
                <CardContent orientation="horizontal">
                  <div>
                    <Typography fontSize="lg" fontWeight="lg"></Typography>
                  </div>
                  <Button variant="solid" size="md" color="primary" aria-label="Explore Bahamas Islands" sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}>
                    Claim
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Cointainer>
    </section>
  );
};

export default Claimable;
