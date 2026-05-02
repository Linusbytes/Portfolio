import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "react-responsive";
import "../styles/Experience.css";
import { IoArrowBack, IoArrowForward, IoRefresh, IoHome } from "react-icons/io5";

// Asset imports (required for production builds)
import schneiderLogo from "../assets/schneider electric logo.png";
import armyLogo from "../assets/Singapore Army logo.png";
import formationPatch from "../assets/formation patch.JPG";
import bmtSarges from "../assets/bmt sarges.JPG";
import notATankee from "../assets/not a tankee.JPG";
import sectPic from "../assets/sect pic.JPG";
import hunterImg from "../assets/hunter.jpg";

const Experience = ({ setSection }) => {
    // Current "Tab" state
    const [activeTab, setActiveTab] = useState("schneider");

    // Tab Order State (for Reordering)
    const [tabs, setTabs] = useState(["schneider", "armour"]);

    // Full Screen State
    const [isFullScreen, setIsFullScreen] = useState(false);

    // New Tab State
    const [hasAddedTab, setHasAddedTab] = useState(false);

    // Drag State
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);

    // Tooltip State
    const [visibleTooltip, setVisibleTooltip] = useState(null);

    // Tutorial State
    const [showTutorial, setShowTutorial] = useState(true);
    const [tutorialStep, setTutorialStep] = useState(0);

    // Media Query for Mobile
    const isMobile = useMediaQuery({ maxWidth: 768 });

    // Data for experiences (simulated websites)
    const experienceData = {
        schneider: {
            id: "schneider",
            tabTitle: "Schneider Electric",
            title: "Schneider Electric",
            logo: schneiderLogo,
            url: "https://schneider-electric.com/about",
            role: "Quality and Industrial Performance Intern",
            duration: "January 2026 - July 2026",
            durationTooltip: "7 months",
            description: [
                "Collaborated with cross-functional teams to define requirements and deliver features.",
                "Implemented automated testing using Jest and Cypress."
            ],
            images: [
                // Add image paths here, e.g., "/src/assets/schneider/img1.png"
            ],
            tooltip: {
                title: "Schneider Electric",
                url: "schneider-electric.com",
                memory: "Memory usage: 145 MB"
            }
        },
        armour: {
            id: "armour",
            tabTitle: "Armour",
            title: "Armour Vocation",
            logo: armyLogo,
            url: "https://singapore-army.com/about",
            role: "Platoon Sergeant",
            duration: "January 2024 - November 2025",
            durationTooltip: "1 year 10 months",
            description: [
                "Promoted to **Platoon Sergeant** in Unit, commanding **25 soldiers** across **4 mission exercises** and upheld the highest standards in force preparation and operational readiness to consistently achieve **mission success**",
                "Awarded **Coin** by 40 SAR **Regimental Sergeant Major** for outstanding results attained in Soldier Fundamentals",
                "Awarded **Coin** by **Commanding Officer** of Armour Unit Training Centre for exceptional command and control during Company Mission Exercise for Unit Evaluation in Exercise Wallaby 2025",
                "In Charge of **NDP Traffic Operations** for road closure - directly deescalated and managed injuries after a severe traffic collision, successfully minimised delays for **200+** buses fetching all the students after the show"
            ],
            images: [
                formationPatch,
                bmtSarges,
                notATankee,
                sectPic,
                hunterImg,
            ],
            tooltip: {
                title: "Singapore Army",
                url: "mindef.gov.sg",
                memory: "Memory usage: 140 MB"
            }
        },
        newdoc: {
            id: "newdoc",
            tabTitle: "New Tab",
            title: "This tab is reserved for you.",
            logo: "",
            url: "https://learning-opportunities.com/about",
            role: "Intern",
            duration: "2027",
            description: [
                "...",
                "..."
            ],
            images: [],
            tooltip: {
                title: "New Tab",
                url: "opportunities.com",
                memory: "Memory usage: 45 MB"
            }
        }
    };



    // Loading State for Refresh
    const [isLoading, setIsLoading] = useState(false);

    // Navigation Handlers
    const handleBack = () => { if (setSection) setSection(1); };
    const handleForward = () => { if (setSection) setSection(3); };
    const handleHome = () => { if (setSection) setSection(0); };
    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    // Mac Traffic Light Logic
    const enterFullScreen = () => {
        if (!isFullScreen) setIsFullScreen(true);
    };

    const exitFullScreen = () => {
        if (isFullScreen) setIsFullScreen(false);
    };

    // New Tab Logic
    const handleAddTab = () => {
        if (!hasAddedTab) {
            const newTabs = [...tabs, "newdoc"];
            setTabs(newTabs);
            setHasAddedTab(true);
            setActiveTab("newdoc");

            // Smooth scroll to the end to show the new tab
            setTimeout(() => {
                if (tabsContainerRef.current) {
                    tabsContainerRef.current.scrollTo({
                        left: tabsContainerRef.current.scrollWidth,
                        behavior: 'smooth'
                    });
                }
            }, 50);
        }
    };

    const handleCloseTab = (e, tabKey) => {
        e.stopPropagation();
        const newTabs = tabs.filter(t => t !== tabKey);
        setTabs(newTabs);

        if (tabKey === "newdoc") {
            setHasAddedTab(false);
        }

        if (activeTab === tabKey && newTabs.length > 0) {
            setActiveTab(newTabs[newTabs.length - 1]);
        }
    };

    // Tutorial Logic
    const tutorialContent = [
        {
            title: "Welcome to /experience!",
            text: "This section is designed as an interactive browser to showcase my past roles.",
            icon: "👋"
        },
        {
            title: "Interactive Tabs",
            text: "Switch between tabs to view different roles. You can also drag and drop to reorder them.",
            icon: "👆"
        },
        {
            title: "Window Controls",
            text: "Toggle between the MacOS-inspired traffic light buttons to resize the window.",
            icon: "💻"
        },
        {
            title: "One last thing...",
            text: "Notice the '+' button next to the tabs? Give it a click!",
            icon: "☝️"
        }
    ];

    const nextStep = () => {
        if (tutorialStep < tutorialContent.length - 1) {
            setTutorialStep(tutorialStep + 1);
        } else {
            setShowTutorial(false);
        }
    };

    const prevStep = () => {
        if (tutorialStep > 0) {
            setTutorialStep(tutorialStep - 1);
        }
    };

    const skipTutorial = () => {
        setShowTutorial(false);
    };

    // Live Sort Drag and Drop Logic
    const onDragStart = (e, index) => {
        setDraggedItemIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const onDragOver = (e, index) => {
        e.preventDefault();
        if (draggedItemIndex === null) return;
        if (draggedItemIndex === index) return;

        const newTabs = [...tabs];
        const draggedItem = newTabs[draggedItemIndex];

        newTabs.splice(draggedItemIndex, 1);
        newTabs.splice(index, 0, draggedItem);

        setTabs(newTabs);
        setDraggedItemIndex(index);
    };

    const onDragEnd = () => {
        setDraggedItemIndex(null);
    };

    const currentData = experienceData[activeTab];

    // Helper to render text with **bold** markings
    const renderDescription = (text) => {
        if (!text) return "";
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    // Scroll Reset Ref
    const browserContentRef = useRef(null);
    const tabsContainerRef = useRef(null);

    // Reset scroll to top when tab changes
    useEffect(() => {
        if (browserContentRef.current) {
            browserContentRef.current.scrollTop = 0;
        }
        // Auto-dismiss tooltip when changing tabs
        setVisibleTooltip(null);
    }, [activeTab]);

    const handleTabDoubleClick = (tabKey) => {
        setVisibleTooltip(visibleTooltip === tabKey ? null : tabKey);
    };

    const windowContent = (
        <>


            {/* Overlay Background for Full Screen */}
            {isFullScreen && (
                <div
                    className="full-screen-backdrop"
                    onClick={exitFullScreen}
                ></div>
            )}

            <div 
                className={`browser-window-container ${isFullScreen ? 'full-screen-window' : ''}`}
                onClick={() => setVisibleTooltip(null)}
            >

                {/* Chrome Top Bar */}
                <div className="chrome-top-bar">
                    <div className="tabs-row" style={{ position: 'relative', display: 'flex', width: '100%' }}>
                        {/* Window Controls (Mac Style + Resize) */}
                        <div className="window-controls-overlay">
                        <div className="traffic-lights">
                            <span className="light red"></span>
                            <span
                                className={`light yellow ${!isFullScreen ? 'disabled' : ''}`}
                                onClick={exitFullScreen}
                            ></span>
                            <span
                                className={`light green ${isFullScreen ? 'disabled' : ''}`}
                                onClick={enterFullScreen}
                            ></span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="chrome-tabs-container" ref={tabsContainerRef}>
                        {tabs.map((tabKey, index) => (
                            <div
                                key={tabKey}
                                className={`chrome-tab ${activeTab === tabKey ? 'active' : ''} ${draggedItemIndex === index ? 'dragging' : ''} ${visibleTooltip === tabKey ? 'active-tooltip' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab(tabKey);
                                }}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    handleTabDoubleClick(tabKey);
                                }}
                                draggable
                                onDragStart={(e) => onDragStart(e, index)}
                                onDragOver={(e) => onDragOver(e, index)}
                                onDragEnd={onDragEnd}
                            >
                                <span className="tab-title">{experienceData[tabKey].tabTitle}</span>

                                {experienceData[tabKey].tooltip && (
                                    <div className="chrome-tab-tooltip">
                                        <div className="tooltip-content">
                                            <div className="tooltip-title">{experienceData[tabKey].tooltip.title}</div>
                                            <div className="tooltip-url">{experienceData[tabKey].tooltip.url}</div>
                                        </div>
                                        <div className="tooltip-footer">
                                            {experienceData[tabKey].tooltip.memory}
                                        </div>
                                    </div>
                                )}

                                {(tabKey !== 'schneider' && tabKey !== 'armour') && (
                                    <span
                                        className="tab-close"
                                        onClick={(e) => handleCloseTab(e, tabKey)}
                                    >×</span>
                                )}
                            </div>
                        ))}
                        {!hasAddedTab && (
                            <div className="chrome-new-tab" onClick={handleAddTab}>+</div>
                        )}
                    </div>
                    </div>

                    {/* Address Bar Area */}
                    <div className="chrome-nav-bar">
                        <div className="nav-controls">
                            <button className="nav-icon" onClick={handleBack} aria-label="Back to /about me"><IoArrowBack /></button>
                            <button className="nav-icon" onClick={handleForward} aria-label="Forward to /projects"><IoArrowForward /></button>
                            <button className="nav-icon" onClick={handleRefresh} aria-label="Refresh?"><IoRefresh /></button>
                            <button className="nav-icon" onClick={handleHome} aria-label="to /home"><IoHome /></button>
                        </div>
                        <div className="omnibox">
                            <span className="secure-lock">🔒</span>
                            <span className="url-text">{currentData ? currentData.url : 'about:blank'}</span>
                        </div>

                        {/* Right Side Controls */}
                        <div className="window-actions">
                            <div className="profile-icon">L</div>
                        </div>
                    </div>
                </div>

                {/* Browser Content (Website) */}
                <div className="browser-content" ref={browserContentRef}>
                    {isLoading ? (
                        <div className="loading-website">
                            <div className="loading-dots">
                                <div className="dot blue"></div>
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                            </div>
                            <div className="loading-text">loading, give me a moment...</div>
                        </div>
                    ) : currentData ? (
                        <div className="website-container intro-fade-in">
                            <div className="website-header">
                                {currentData.logo && (
                                    <img
                                        src={currentData.logo}
                                        alt={`${currentData.title} Logo`}
                                        className="website-logo"
                                    />
                                )}
                                <h1 className="website-title">{currentData.title}</h1>
                                <div className="website-subtitle">
                                    <span className="website-role">{currentData.role}</span>
                                    <span
                                        className="website-time"
                                        data-tooltip={currentData.durationTooltip}
                                    >{currentData.duration}</span>
                                </div>
                            </div>

                            <div className="website-body">
                                <div className="website-section">
                                    <h3>About my role</h3>
                                    <ul className="website-list">
                                        {currentData.description.map((item, idx) => (
                                            <li key={idx}>{renderDescription(item)}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="website-section">
                                    <h3>Gallery</h3>
                                    <div className="gallery-grid">
                                        {currentData.images && currentData.images.length > 0 ? (
                                            currentData.images.map((imgSrc, idx) => (
                                                <img
                                                    key={idx}
                                                    src={imgSrc}
                                                    alt={`Gallery ${idx + 1}`}
                                                    className="gallery-image"
                                                />
                                            ))
                                        ) : (
                                            <>
                                                <div className="gallery-placeholder">
                                                    <span></span>
                                                </div>
                                                <div className="gallery-placeholder">
                                                    <span></span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="loading-website">Loading...</div>
                    )}
                </div>

                {/* Tutorial Popup */}
                {showTutorial && (
                    <div className="tutorial-overlay">
                        <div className="tutorial-popup">
                            <div className="tutorial-icon" style={{ opacity: tutorialContent[tutorialStep].icon ? 1 : 0 }}>
                                {tutorialContent[tutorialStep].icon || '\u00A0'}
                            </div>
                            <div className="tutorial-text-content">
                                <h2 className="tutorial-title">{tutorialContent[tutorialStep].title}</h2>
                                <p className="tutorial-text">{tutorialContent[tutorialStep].text}</p>
                            </div>
                            <div className="tutorial-footer">
                                <div className="tutorial-dots">
                                    {tutorialContent.map((_, idx) => (
                                        <span
                                            key={idx}
                                            className={`tutorial-dot ${idx === tutorialStep ? 'active' : ''}`}
                                        ></span>
                                    ))}
                                </div>
                                <div className="tutorial-actions">
                                    {tutorialStep === 0 ? (
                                        <button className="tutorial-btn-secondary" onClick={skipTutorial}>
                                            Skip
                                        </button>
                                    ) : (
                                        <button className="tutorial-btn-secondary" onClick={prevStep}>
                                            Back
                                        </button>
                                    )}
                                    <button className="tutorial-btn-primary" onClick={nextStep}>
                                        {tutorialStep === tutorialContent.length - 1 ? 'Done' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

    if (isFullScreen) {
        return createPortal(windowContent, document.body);
    }

    return (
        <div id="experience" className={`experience-container ${isFullScreen ? 'full-screen-mode' : ''}`}>
            {windowContent}
        </div>
    );
};

export default Experience;