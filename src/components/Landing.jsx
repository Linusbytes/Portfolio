import React from 'react';
import '../styles/Landing.css';
import { Fade } from "react-awesome-reveal";
import { IoChevronDown } from "react-icons/io5";

const Landing = () => {
    return (
        <div className="landing-container">
            <div className="landing-quote">
                <p className="quote">I am always doing that which I cannot do,<br />in order that<br />I may learn how to do it. <span className="quote-author"> - Pablo Picasso</span></p>
            </div>
            <div className="scroll-hint">
                <IoChevronDown size={30} />
            </div>
        </div>
    );
};

export default Landing;
