import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import React from "react";

const Admin: React.FC = () => {
  return (
    <List
      orientation="horizontal"
      variant="outlined"
      sx={{
        flexGrow: 0,
        mx: "auto",
        "--ListItemDecorator-size": "48px",
        "--ListItem-paddingY": "1rem",
        borderRadius: "sm",
      }}
    >
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/1.jpg" />
        </ListItemDecorator>
        Create Campaign
      </ListItem>
      <ListDivider inset="gutter" />
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Boyd Burt
      </ListItem>
    </List>
  );
};

export default Admin;
