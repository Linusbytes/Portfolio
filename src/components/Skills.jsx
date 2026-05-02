import React, { useState, useRef } from "react";
import "../styles/Skills.css";
import "../styles/Experience.css"; // Reuse section header styles

import {
    SiPython,
    SiAutodesk,
    SiArduino,
    SiSiemens
} from "react-icons/si";
import {
    IoSettingsSharp,
    IoCodeSlash,
    IoEyeOutline,
    IoServerOutline,
    IoSyncCircleOutline
} from "react-icons/io5";

// Images from Projects
import ginIcon from "../assets/Gin Framework.png";
import sfmlIcon from "../assets/sfml-icon-big.png";
import streamlitIcon from "../assets/streamlit-logo.png";
import nextJsIcon from "../assets/next-js.svg";
import viteIcon from "../assets/Vitejs-logo.svg.png";
import osrmIcon from "../assets/osrm_logo.svg";
import solidWorksIcon from "../assets/SOLIDWORKS-Logo.png";

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [showCategoryPopup, setShowCategoryPopup] = useState(null);
    const [isExiting, setIsExiting] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const buttonRefs = useRef({});
    const exitTimeoutRef = useRef(null);

    // Category icon mapping
    const categoryIcons = {
        Engineering: { icon: <IoSettingsSharp /> },
        Languages: { icon: <IoCodeSlash /> },
        Frontend: { icon: <IoEyeOutline /> },
        Backend: { icon: <IoServerOutline /> },
        DevOps: { icon: <IoSyncCircleOutline /> }
    };

    // Hover handlers
    const handleMouseEnter = (cat, e) => {
        if (cat === "All") return;

        // Clear any pending exit timeout
        if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current);
            exitTimeoutRef.current = null;
        }

        // Position logic
        if (buttonRefs.current[cat]) {
            const rect = buttonRefs.current[cat].getBoundingClientRect();
            const filterBarRect = buttonRefs.current[cat].parentElement.getBoundingClientRect();

            setPopupPosition({
                x: rect.left - filterBarRect.left + rect.width / 2,
                y: rect.top - filterBarRect.top
            });
            setIsExiting(false);
            setShowCategoryPopup(cat);
        }
    };

    const handleMouseLeave = () => {
        setIsExiting(true);
        exitTimeoutRef.current = setTimeout(() => {
            setIsExiting(false);
            setShowCategoryPopup(null);
            exitTimeoutRef.current = null;
        }, 200); // Match CSS animation duration
    };

    // Handle category click (Filter only)
    const handleCategoryClick = (cat) => {
        setActiveCategory(cat);
    };

    const skillsData = {
        Engineering: [
            { name: "SolidWorks", icon: <img src={solidWorksIcon} alt="SolidWorks" className="skill-custom-icon" /> },
            { name: "NX", icon: <SiSiemens color="#009999" /> },
            { name: "AutoCAD", icon: <SiAutodesk color="#0696D7" /> },
            { name: "Arduino", icon: <SiArduino color="#00979D" /> },
            { name: "MATLAB", icon: <i className="devicon-matlab-plain colored"></i> },
        ],
        Languages: [
            { name: "JavaScript", icon: <i className="devicon-javascript-plain colored"></i> },
            { name: "TypeScript", icon: <i className="devicon-typescript-plain colored"></i> },
            { name: "Python", icon: <SiPython color="#3776AB" /> },
            { name: "C++", icon: <i className="devicon-cplusplus-plain colored"></i> },
            { name: "Go", icon: <i className="devicon-go-original-wordmark colored"></i> },
            { name: "CSS", icon: <i className="devicon-css3-plain colored"></i> },
        ],
        Frontend: [
            { name: "React", icon: <i className="devicon-react-original colored"></i> },
            { name: "Three.js", icon: <i className="devicon-threejs-original colored"></i> },
            { name: "Tailwind CSS", icon: <i className="devicon-tailwindcss-plain colored"></i> },
            { name: "Next.js", icon: <img src={nextJsIcon} alt="Next.js" className="skill-custom-icon" /> },
            { name: "Vite", icon: <img src={viteIcon} alt="Vite" className="skill-custom-icon" /> },
            { name: "Streamlit", icon: <img src={streamlitIcon} alt="Streamlit" className="skill-custom-icon" /> },
        ],
        Backend: [
            { name: "Go (Gin)", icon: <img src={ginIcon} alt="Gin" className="skill-custom-icon" /> },
            { name: "PostgreSQL", icon: <i className="devicon-postgresql-plain colored"></i> },
            { name: "Redis", icon: <i className="devicon-redis-plain colored"></i> },
            { name: "Docker", icon: <i className="devicon-docker-plain colored"></i> },
            { name: "WebSockets", icon: <i className="devicon-socketio-original colored"></i> },
            { name: "OSRM", icon: <img src={osrmIcon} alt="OSRM" className="skill-custom-icon" /> },
        ],
        DevOps: [
            { name: "Git", icon: <i className="devicon-git-plain colored"></i> },
            { name: "AWS", icon: <i className="devicon-amazonwebservices-plain-wordmark colored"></i> },
            { name: "CI/CD", icon: <i className="devicon-githubactions-plain colored"></i> },
        ]
    };

    const categories = ["All", "Engineering", "Languages", "Frontend", "Backend", "DevOps",];

    // Flatten skills for "All" view, removing duplicates if any (though structure suggests simple concat currently)
    // Using a Map to ensure uniqueness by name if needed, or just flatten.
    // Given the data, Python appears in both Backend and Languages. We should probably dedup.
    const getAllSkills = () => {
        const all = [];
        const seen = new Set();

        Object.values(skillsData).forEach(catSkills => {
            catSkills.forEach(skill => {
                if (!seen.has(skill.name)) {
                    seen.add(skill.name);
                    all.push(skill);
                }
            });
        });
        return all;
    };

    // Calculate Counts
    const getCount = (category) => {
        if (category === "All") {
            return getAllSkills().length;
        }
        return skillsData[category].length;
    };

    const displaySkills = activeCategory === "All" ? getAllSkills() : skillsData[activeCategory];

    return (
        <div id="skills" className="skills-section">
            <div className="section-header">
                <h1>skills</h1>
            </div>

            <div className="skills-content-wrapper">
                {/* Top Filter Bar */}
                <div className="skills-filter-bar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            ref={(el) => (buttonRefs.current[cat] = el)}
                            className={`skills-filter-btn ${activeCategory === cat ? "active" : ""}`}
                            onClick={() => handleCategoryClick(cat)}
                            onMouseEnter={(e) => handleMouseEnter(cat, e)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {cat}
                            <span className="skills-filter-count">{getCount(cat)}</span>
                        </button>
                    ))}

                    {/* Category Icon Animation */}
                    {(showCategoryPopup || isExiting) && categoryIcons[showCategoryPopup] && (
                        <div
                            className={`category-popup ${isExiting ? "exit" : ""}`}
                            key={showCategoryPopup}
                            style={{
                                left: popupPosition.x,
                                top: popupPosition.y
                            }}
                        >
                            <div className="category-popup-icon">
                                {categoryIcons[showCategoryPopup].icon}
                            </div>
                        </div>
                    )}
                </div>

                {/* Grid */}
                <div className="skills-grid">
                    {displaySkills.map((skill, index) => (
                        <div key={skill.name + index} className="skill-card">
                            <div className="skill-icon">
                                {skill.icon}
                            </div>
                            <span className="skill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Skills;
