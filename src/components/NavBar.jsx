import "../styles/NavBar.css";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';


const NavBar = ({ setSection, closeDrawer }) => {
    const [copyNotification, setCopyNotification] = useState({ visible: false, text: '' });

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyNotification({ visible: true, text: 'Copied!' });
            setTimeout(() => {
                setCopyNotification({ visible: false, text: '' });
            }, 1500);
        });
    };

    return (
        <Fade triggerOnce direction="left">
            <div id="navbar">
                <ul>
                    <li className="navbar-item">
                        <a href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSection(0);
                                if(closeDrawer) closeDrawer();
                            }}
                        >/home</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSection(1);
                                if(closeDrawer) closeDrawer();
                            }}
                        >/about me</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSection(2);
                                if(closeDrawer) closeDrawer();
                            }}
                        >/experience</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSection(3);
                                if(closeDrawer) closeDrawer();
                            }}
                        >/projects</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSection(5);
                                if(closeDrawer) closeDrawer();
                            }}
                        >/skills</a>
                    </li>
                    {/* Gallery navigation removed - images deleted */}
                    <li>
                        <div className="socials">
                            <div className="social-icon" onClick={() => copyToClipboard('linuscheng55@gmail.com')} data-tooltip="linuscheng55@gmail.com">
                                <MailOutlineRoundedIcon style={{ fontSize: 25 }}></MailOutlineRoundedIcon>
                            </div>
                            <a className="social-icon" href="https://github.com/Linusbytes" target="_blank" data-tooltip="Linusbytes">
                                <GitHubIcon style={{ fontSize: 25 }}></GitHubIcon>
                            </a>
                            <a className="social-icon" href="https://www.linkedin.com/in/linus-cheng-ming-hong/" target="_blank" data-tooltip="To my Linkedin page">
                                <LinkedInIcon style={{ fontSize: 25 }}></LinkedInIcon>
                            </a>
                            <div className="social-icon" onClick={() => copyToClipboard('9721 6375')} data-tooltip="9721 6375">
                                <PhoneIcon style={{ fontSize: 25 }}></PhoneIcon>
                            </div>
                            {copyNotification.visible && (
                                <div className="copy-notification">{copyNotification.text}</div>
                            )}
                        </div>
                    </li>
                </ul>
            </ div>
        </Fade>
    )
}

export default NavBar;