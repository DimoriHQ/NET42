import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authentication/reducer";

const Footer: React.FC = () => {
  const auth = useAppSelector(selectAuth);

  return (
    <footer>
      footer{" "}
      {auth.isAdmin && (
        <div>
          admin
          <div>
            <Link to="/admin/create">create campaign</Link>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
