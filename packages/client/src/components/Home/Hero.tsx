import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div>
      <Card sx={{ gap: 2, maxWidth: 300 }}>
        <Chip size="sm" variant="soft" sx={{ alignSelf: "flex-start", borderRadius: "xl" }}>
          New
        </Chip>
        <IconButton variant="outlined" color="neutral" size="sm" sx={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
          <BookmarkOutlinedIcon />
        </IconButton>
        <Typography level="title-lg" fontWeight="lg">
          Learn how to build super fast websites.
        </Typography>
        <Button variant="solid" endDecorator={<KeyboardArrowRightIcon />}>
          Read more
        </Button>
      </Card>
    </div>
  );
};

export default Hero;
