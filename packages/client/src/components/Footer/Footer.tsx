import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authentication/reducer";
import Discord from "../Icon/Discord";
import Twitter from "../Icon/Twitter";
import Container from "../Layout/Container";

const Footer: React.FC = () => {
  const auth = useAppSelector(selectAuth);

  return (
    <footer className="py-[30px]">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>

            {auth.isAdmin && (
              <div>
                <Link to="/admin/create">Create campaign</Link>
              </div>
            )}
          </div>
          <div className="flex gap-[16px]">
            <a href="https://twitter.com/NET42run" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href="https://discord.gg/9kPGuWwq" target="_blank" rel="noopener noreferrer">
              <Discord />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
