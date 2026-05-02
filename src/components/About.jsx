import "../styles/About.css";
import meLight from "../assets/camera roll.mov"
import meDark from "../assets/EmojiMovie787397153.MOV"
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const About = ({ theme }) => {
    return (
        <div id="about">
            <div className="section-header">
                <h1>about me</h1>
            </div>
            <div className="about-container">
                <div className="about-text">
                    <div key={theme} className="about-image-wrapper">
                        <video
                            className="about-image"
                            src={theme === 'dark' ? meDark : meLight}
                            autoPlay
                            loop
                            muted
                            playsInline
                        ></video>
                    </div>
                    <p>
                        I find myself understanding new subjects constantly while anchoring myself in strong fundamentals. Feel free to <span className="contact-word-container">
                            <span className="contact-word-flipper">
                                <span className="contact-word-front">contact</span>
                                <span className="contact-word-back">
                                    <a href="https://www.linkedin.com/in/linus-cheng-ming-hong/" target="_blank" rel="noopener noreferrer">
                                        <LinkedInIcon className="contact-linkedin-icon" />
                                    </a>
                                </span>
                            </span>
                        </span> me to find out more about my thoughts and motivations behind my journey.
                    </p>
                    <p>
                        In my free time, I am a Formula 1 fan and a loyal supporter of the <span className="f1-link">Mercedes-AMG Petronas F1 Team</span>. I also love listening to podcasts and going for runs.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;