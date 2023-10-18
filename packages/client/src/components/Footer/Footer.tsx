import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authentication/reducer";
import Section from "../Layout/Section";
import "../../styles/Footer.css";
import AndroidIcon from '@mui/icons-material/Android';
import TagIcon from '@mui/icons-material/Tag';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';

const Footer: React.FC = () => {
  const auth = useAppSelector(selectAuth);

  return (
    <footer className="footer" id='footer'>
      <Section>
        <div>
          <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
          </div>
          <ul className="social-icon">
            <li className="social-icon__item">
              <a className="social-icon__link" href="#">
                <AndroidIcon />
              </a>
            </li>
            <li className="social-icon__item">
              <a className="social-icon__link" href="#">
                <TelegramIcon />
              </a>
            </li>
            <li className="social-icon__item">
              <a className="social-icon__link" href="#">
                <EmailIcon />
              </a>
            </li>
            <li className="social-icon__item">
              <a className="social-icon__link" href="#">
                <TagIcon />
              </a>
            </li>
          </ul>
          <ul className="menu">
            <li className="menu__item">
              <a className="menu__link" href="#">
                Home
              </a>
            </li>
            <li className="menu__item">
              <a className="menu__link" href="#">
                About
              </a>
            </li>
            <li className="menu__item">
              <a className="menu__link" href="#">
                Services
              </a>
            </li>
            <li className="menu__item">
              <a className="menu__link" href="#">
                Team
              </a>
            </li>
            <li className="menu__item">
              <a className="menu__link" href="#">
                Contact
              </a>
            </li>
          </ul>
          <p>&copy;2023 NET42 | Network - Environment - Technology - Fourty - Two</p>
        </div>
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
