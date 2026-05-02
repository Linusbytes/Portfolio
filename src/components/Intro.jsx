import "../styles/Intro.css";
import Typewriter from "typewriter-effect";
import { Fade } from "react-awesome-reveal";

const Intro = () => {
    return (
        <Fade triggerOnce direction="up" cascade>
            <div id="intro">
                <span className="emoji">👋</span> Hi, I'm <span className="name">Linus</span>
                <div className="description">
                    <span>Aspiring Engineer,</span>
                    <div className="bio">
                        <span>and full time&nbsp;</span>
                        <div className="roles">
                            <Typewriter
                                options={{
                                    strings: ['student.', 'learner.', 'inventor.'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default Intro;