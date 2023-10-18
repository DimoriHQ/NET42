import React from "react";
import { useEffectOnce } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCampaigns, selectCampaign } from "../../features/campaigns/reducer";
import Section from "../Layout/Section";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import Campaign from "./Campaign";
import { Box, Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/joy";

const Campaigns: React.FC = () => {
  const campaign = useAppSelector(selectCampaign);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(getCampaigns());
  });

  return (
    <section className="bg-gray-200 p-6">
      <Section>
        <div className="grid grid-cols-3" id='Campaigns'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            sx={{
              "--Grid-borderWidth": "1px",
              borderTop: "var(--Grid-borderWidth) solid",
              borderLeft: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
              "& > div": {
                borderRight: "var(--Grid-borderWidth) solid",
                borderBottom: "var(--Grid-borderWidth) solid",
                borderColor: "divider",
              },
            }}
          >
            {[
              { name: "Hue Running", time: "Feb 24 to April 02, 2024", distances: "21km, 42km, 70km, 100km" },
              { name: "Sai Gon Running", time: "March 24 to May 02, 2024", distances: "21km, 42km, 70km, 100km" },
              { name: "Ha Noi Running", time: "April 24 to Jun 02, 2024", distances: "21km, 42km, 70km, 100km" },
              { name: "Nha Trang Running", time: "May 24 to Jul 02, 2024", distances: "21km, 42km, 70km, 100km" },
            ].map((name, index) => {
              return (
                <Grid key={index} xs={12} sm={6} md={3} display="flex" justifyContent="center" alignItems="center" minHeight={180}>
                  <Card sx={{ width: 320 }}>
                    <div>
                      <Typography level="title-lg">{name.name}</Typography>
                      <Typography level="body-sm">{name.time}</Typography>
                      <IconButton aria-label="bookmark Bahamas Islands" variant="plain" color="neutral" size="sm" sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}>
                        <BookmarkAdd />
                      </IconButton>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                      srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                      loading="lazy"
                      alt=""
                    />
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography level="body-xs">Total price:</Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                         {name.distances}
                        </Typography>
                      </div>
                      <Button variant="solid" size="md" color="primary" aria-label="Explore Bahamas Islands" sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}>
                        Join 
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
    </section>
  );
};

export default Campaigns;
