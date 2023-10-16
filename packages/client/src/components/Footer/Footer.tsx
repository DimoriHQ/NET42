import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authentication/reducer";
import Section from "../Layout/Section";

const Footer: React.FC = () => {
  const auth = useAppSelector(selectAuth);

  return (
    <footer>
      <Section>
        footer{" "}
        {auth.isAdmin && (
          <div>
            <Link to="/admin/create">create campaign</Link>
          </div>
        )}
      </Section>
    </footer>
  );
};

export default Footer;
