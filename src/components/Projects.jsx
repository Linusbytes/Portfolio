import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "react-responsive";
import "../styles/Projects.css";
import { IoGrid, IoList } from "react-icons/io5";
import { SiPython } from "react-icons/si";

import ginIcon from "../assets/Gin Framework.png";
import sfmlIcon from "../assets/sfml-icon-big.png";
import streamlitIcon from "../assets/streamlit-logo.png";
import nextJsIcon from "../assets/next-js.svg";
import viteIcon from "../assets/Vitejs-logo.svg.png";
import osrmIcon from "../assets/osrm_logo.svg";
import ecoTwinScreenshot from "../assets/EcoTwin Screenshot.png";
import ecoTwinVideo from "../assets/EcoTwin Recording.mov";
import aeroMLScreenshot from "../assets/AeroML screenshot.jpeg";
import aeroMLVideo from "../assets/AeroML Recording.mp4";
import pathfinderVideo from "../assets/pathfinder video recording.mp4";
import pathfinderScreenshot from "../assets/Pathfinder Screenshot.png";
import graphLabsScreenshot from "../assets/GraphLabs Screenshot.png";
import graphLabsVideo from "../assets/GraphLabs Recording.mov";

// Thumbnail component with hover-to-play video
const ProjectThumbnail = ({ thumbnail, demoVideo, title }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const videoRef = useRef(null);
    const hoverTimeoutRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (demoVideo) {
            hoverTimeoutRef.current = setTimeout(() => {
                setShowVideo(true);
            }, 500); // 0.5 second delay
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setShowVideo(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    useEffect(() => {
        if (showVideo && videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, [showVideo]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className="project-thumbnail"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {thumbnail ? (
                <img
                    src={thumbnail}
                    alt={title}
                    className={`thumbnail-image ${showVideo ? 'hidden' : ''}`}
                />
            ) : (
                <div className={`thumbnail-placeholder ${showVideo ? 'hidden' : ''}`}>
                    <span>{title.charAt(0)}</span>
                </div>
            )}
            {demoVideo && (
                <video
                    ref={videoRef}
                    src={demoVideo}
                    className={`thumbnail-video ${showVideo ? 'visible' : ''}`}
                    loop
                    muted
                    playsInline
                />
            )}
        </div>
    );
};

const Projects = () => {
    // State for context menu
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        project: null
    });

    // State for selected project (for keyboard navigation)
    const [selectedProject, setSelectedProject] = useState(null);

    // State for floating windows
    const [overviewWindow, setOverviewWindow] = useState({ visible: false, project: null, isFullScreen: false, isClosing: false });
    const [detailsWindow, setDetailsWindow] = useState({ visible: false, project: null, isFullScreen: false, isClosing: false });

    // View and Filter State
    const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

    // Media Query for Mobile
    const isMobile = useMediaQuery({ maxWidth: 768 });

    // Refs
    const projectGridRef = useRef(null);
    const contextMenuRef = useRef(null);

    // Project data with enhanced structure
    const projectData = {
        "EcoTwin": {
            id: "ecotwin",
            title: "EcoTwin",
            description: "Digital twin for visualising mechanical constraints",
            tags: ["React", "Go", "Python", "Three.js", "PostgreSQL", "WebSockets", "Next.js"],
            categories: ["Frontend", "Backend"],
            thumbnail: ecoTwinScreenshot,
            listThumbnail: ecoTwinScreenshot,
            demoVideo: ecoTwinVideo,
            repository: "https://github.com/chenglynn/ecotwin",
            overview: {
                about: [
                    "A digital twin platform for urban ecosystem monitoring and visualization.",
                    "Integrates real-time IoT sensor data with immersive 3D visualization.",
                    "Enables data-driven decision making for sustainable city planning."
                ],
                techStack: [
                    { name: "React", devicon: "react-original" },
                    { name: "Three.js", devicon: "threejs-original" },
                    { name: "Next.js", devicon: "nextjs-original", iconImage: nextJsIcon },
                    { name: "Go", devicon: "go-original-wordmark" },
                    { name: "Python", iconComponent: <SiPython color="#3776AB" /> },
                    { name: "PostgreSQL", devicon: "postgresql-plain" },
                    { name: "WebSockets", devicon: "socketio-original" }
                ]
            },
            details: {
                concepts: [
                    "**Digital Twin Architecture**: Implemented a real-time synchronization layer between physical sensors and virtual representations using WebSocket connections.",
                    "**3D Rendering Pipeline**: Utilized Three.js with custom shaders for efficient rendering of large-scale urban environments.",
                    "**Data Aggregation**: Built a time-series database integration for historical analysis and predictive modeling."
                ],
                challenges: [
                    "Optimizing render performance for thousands of dynamic objects",
                    "Handling real-time data streams from multiple IoT sources",
                    "Creating intuitive 3D navigation for non-technical users"
                ]
            }
        },
        "Physics Engine": {
            id: "physics-engine",
            title: "Physics Engine",
            description: "Visualises computational dynamics of rigid bodies",
            tags: ["C++", "OpenGL", "Game Dev"],
            categories: ["Languages", "Systems"],
            thumbnail: "/src/assets/physics-thumb.png",
            listThumbnail: "/src/assets/physics-list-thumb.png",
            demoVideo: null,
            repository: "https://github.com/chenglynn/physics-engine",
            overview: {
                about: [
                    "Custom 2D physics engine built from scratch in C++.",
                    "Implements rigid body dynamics, collision detection, and constraint solving.",
                    "Optimized for real-time game development applications."
                ],
                techStack: [
                    { name: "C++", devicon: "cplusplus-plain" },
                    { name: "SFML", devicon: "cplusplus-plain", iconImage: sfmlIcon },
                    { name: "Dear ImGui", devicon: "cplusplus-plain" }
                ]
            },
            details: {
                concepts: [
                    "**Separating Axis Theorem (SAT)**: Implemented for convex polygon collision detection with O(n) complexity.",
                    "**Verlet Integration**: Used for stable numerical integration of physics bodies over time.",
                    "**Spatial Partitioning**: Implemented quadtree for broad-phase collision detection, reducing complexity from O(n²) to O(n log n)."
                ],
                challenges: [
                    "Achieving stable stacking of multiple rigid bodies",
                    "Balancing accuracy vs performance for real-time applications",
                    "Implementing friction and restitution coefficients"
                ]
            }
        },
        "Pathfinder": {
            id: "pathfinder",
            title: "Pathfinder",
            description: "VRP solver with real-world mapping data",
            tags: ["TypeScript", "React", "Vite", "Docker", "Go", "Gin", "Redis", "OSRM"],
            categories: ["Frontend", "Backend"],
            thumbnail: pathfinderScreenshot,
            listThumbnail: pathfinderScreenshot,
            demoVideo: pathfinderVideo,
            repository: "https://github.com/chenglynn/pathfinder",
            overview: {
                about: [
                    "Interactive visualizer for graph traversal and pathfinding algorithms.",
                    "Supports A*, Dijkstra, BFS, DFS, and Greedy Best-First Search.",
                    "Features maze generation and weighted node placement."
                ],
                techStack: [
                    { name: "TypeScript", devicon: "typescript-plain" },
                    { name: "React", devicon: "react-original" },
                    { name: "Vite", devicon: "vitejs-plain", iconImage: viteIcon },
                    { name: "Go", devicon: "go-original-wordmark" },
                    { name: "Gin", devicon: "go-original", iconImage: ginIcon },
                    { name: "Docker", devicon: "docker-plain" },
                    { name: "Redis", devicon: "redis-plain" },
                    { name: "OSRM", devicon: "linux-plain", iconImage: osrmIcon }
                ]
            },
            details: {
                concepts: [
                    "**A* Algorithm**: Combines Dijkstra's algorithm with heuristics for optimal pathfinding.",
                    "**Priority Queue**: Implemented using a binary heap for O(log n) insertion and extraction.",
                    "**Recursive Backtracking**: Used for procedural maze generation with guaranteed solvability."
                ],
                challenges: [
                    "Visualizing algorithm execution in real-time without blocking the main thread",
                    "Handling edge cases in maze generation",
                    "Creating responsive grid that works across device sizes"
                ]
            }
        },
        "AeroML": {
            id: "aeroml",
            title: "AeroML",
            description: "Predict Remaining Useful Life of turbofan engines",
            tags: ["XGBoost", "StreamLit", "FastAPI"],
            categories: ["Backend", "Languages"],
            thumbnail: aeroMLScreenshot,
            listThumbnail: aeroMLScreenshot,
            demoVideo: aeroMLVideo,
            repository: "https://github.com/chenglynn/aeroml",
            overview: {
                about: [
                    "Machine learning models for predicting aerodynamic coefficients.",
                    "Trained on CFD simulation data for rapid aerodynamic analysis.",
                    "Achieved 95% accuracy in lift and drag prediction."
                ],
                techStack: [
                    { name: "XGBoost", devicon: "python-plain" },
                    { name: "StreamLit", devicon: "python-plain", iconImage: streamlitIcon },
                    { name: "FastAPI", devicon: "fastapi-plain" }
                ]
            },
            details: {
                concepts: [
                    "**Neural Network Architecture**: Multi-layer perceptron with batch normalization for stable training.",
                    "**Feature Engineering**: Extracted key geometric parameters from airfoil coordinates.",
                    "**Cross-Validation**: K-fold validation to ensure model generalization."
                ],
                challenges: [
                    "Handling high-dimensional CFD output data",
                    "Balancing model complexity with inference speed",
                    "Ensuring physical plausibility of predictions"
                ]
            }
        },
        "GraphLabs": {
            id: "graphlabs",
            title: "GraphLabs",
            description: "Interactive visualisation for graph traversal algorithms",
            tags: ["React", "TypeScript", "D3.js"],
            categories: ["Frontend"],
            thumbnail: graphLabsScreenshot,
            listThumbnail: graphLabsScreenshot,
            demoVideo: graphLabsVideo,
            repository: "https://github.com/chenglynn/graphlabs",
            overview: {
                about: [
                    "Interactive graph theory educational platform.",
                    "Visualizes graph algorithms and data structures.",
                    "Used by students to understand connectivity and traversal."
                ],
                techStack: [
                    { name: "Next.js", devicon: "nextjs-original", iconImage: nextJsIcon },
                    { name: "TypeScript", devicon: "typescript-plain" },
                    { name: "Tailwind CSS", devicon: "tailwindcss-plain" },
                    { name: "React", devicon: "react-original" }
                ]
            },
            details: {
                concepts: [
                    "**Force-Directed Layout**: Physics simulation for automatic graph positioning.",
                    "**Graph Algorithms**: BFS, DFS, Dijkstra, Kruskal's MST implementations.",
                    "**Interactive Canvas**: SVG-based rendering with pan, zoom, and drag interactions."
                ],
                challenges: [
                    "Creating intuitive graph editing interface",
                    "Animating algorithm execution step-by-step",
                    "Supporting large graphs without performance degradation"
                ]
            }
        }
    };

    const projectList = Object.keys(projectData);



    // Handle right-click context menu
    const handleContextMenu = useCallback((e, projectKey) => {
        e.preventDefault();
        e.stopPropagation();

        // Calculate position, ensuring menu doesn't go off-screen
        const menuWidth = 200;
        const menuHeight = 120;
        let x = e.clientX;
        let y = e.clientY;

        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }
        if (y + menuHeight > window.innerHeight) {
            y = window.innerHeight - menuHeight - 10;
        }

        setContextMenu({
            visible: true,
            x,
            y,
            project: projectKey
        });
        setSelectedProject(projectKey);
    }, []);

    // Close context menu on click outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu.visible) {
                setContextMenu(prev => ({ ...prev, visible: false }));
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [contextMenu.visible]);

    // Keyboard shortcut: Spacebar toggles overview
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space" && selectedProject) {
                e.preventDefault();

                // If details window is open, close it
                if (detailsWindow.visible) {
                    closeDetails();
                    return;
                }

                // Otherwise toggle overview window
                if (!detailsWindow.visible) {
                    if (overviewWindow.visible) {
                        closeOverview();
                    } else {
                        openOverview(selectedProject);
                    }
                }
            }
            // Escape closes windows
            if (e.code === "Escape") {
                if (overviewWindow.visible) closeOverview();
                if (detailsWindow.visible) closeDetails();
                if (contextMenu.visible) {
                    setContextMenu(prev => ({ ...prev, visible: false }));
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedProject, overviewWindow.visible, detailsWindow.visible, contextMenu.visible]);

    // Animation timeout handlers
    useEffect(() => {
        if (overviewWindow.isClosing) {
            const timer = setTimeout(() => {
                setOverviewWindow(prev => ({ ...prev, visible: false, isClosing: false }));
            }, 300); // Match CSS animation duration
            return () => clearTimeout(timer);
        }
    }, [overviewWindow.isClosing]);

    useEffect(() => {
        if (detailsWindow.isClosing) {
            const timer = setTimeout(() => {
                setDetailsWindow(prev => ({ ...prev, visible: false, isClosing: false }));
            }, 300); // Match CSS animation duration
            return () => clearTimeout(timer);
        }
    }, [detailsWindow.isClosing]);

    // Open windows
    const openOverview = (projectKey) => {
        setOverviewWindow({ visible: true, project: projectKey, isFullScreen: false, isClosing: false });
        setContextMenu(prev => ({ ...prev, visible: false }));
    };

    const closeOverview = () => {
        setOverviewWindow(prev => ({ ...prev, isClosing: true }));
    };

    const openDetails = (projectKey) => {
        setDetailsWindow({ visible: true, project: projectKey, isFullScreen: false, isClosing: false });
        setContextMenu(prev => ({ ...prev, visible: false }));
    };

    const closeDetails = () => {
        setDetailsWindow(prev => ({ ...prev, isClosing: true }));
    };

    const openRepository = (projectKey) => {
        window.open(projectData[projectKey].repository, "_blank");
        setContextMenu(prev => ({ ...prev, visible: false }));
    };

    // Render bold text helper
    const renderBoldText = (text) => {
        if (!text) return "";
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    // Floating Window Component
    const FloatingWindow = ({ type, windowState, setWindowState }) => {
        const project = windowState.project ? projectData[windowState.project] : null;
        if (!project) return null;

        const isOverview = type === "overview";
        const data = isOverview ? project.overview : project.details;
        const title = isOverview ? project.title : `${project.title} - Documentation`;
        const [stackView, setStackView] = useState("icons"); // 'icons' | 'list'

        const toggleFullScreen = () => {
            setWindowState(prev => ({ ...prev, isFullScreen: !prev.isFullScreen }));
        };

        const closeWindow = () => {
            setWindowState(prev => ({ ...prev, isClosing: true }));
        };

        const windowContent = (
            <>
                {windowState.isFullScreen && (
                    <div className="project-window-backdrop" onClick={closeWindow}></div>
                )}
                <div className={`project-floating-window ${windowState.isFullScreen ? "full-screen" : ""} ${windowState.isClosing ? "closing" : ""} ${isOverview ? "preview-mode" : ""}`}>
                    {/* Window Header with Traffic Lights */}
                    <div className={`project-window-header ${isOverview ? "preview-mode" : ""}`}>
                        <div className="project-traffic-lights">
                            <span className="project-light red" onClick={closeWindow}></span>
                            <span
                                className={`project-light yellow ${!windowState.isFullScreen ? "disabled" : ""}`}
                                onClick={windowState.isFullScreen ? toggleFullScreen : undefined}
                            ></span>
                            <span
                                className={`project-light green disabled`}
                                onClick={undefined}
                            ></span>
                        </div>
                        <div className="project-window-title">{title}</div>
                        <div className="project-window-spacer"></div>
                    </div>

                    {/* Document Content - Google Docs Style */}
                    <div className={`project-document-content ${isOverview ? "preview-mode" : ""}`}>
                        <div className={`project-document-body ${isOverview ? "preview-mode" : ""}`}>
                            {isOverview ? (
                                <>
                                    <div className="project-preview-container">
                                        {project.demoVideo ? (
                                            <video
                                                className="project-preview-video"
                                                src={project.demoVideo}
                                                controls
                                                autoPlay
                                                loop
                                                playsInline
                                            />
                                        ) : (
                                            <div className="project-preview-fallback">
                                                {project.thumbnail ? (
                                                    <img src={project.thumbnail} alt={project.title} className="preview-fallback-image" />
                                                ) : (
                                                    <div className="preview-placeholder-text">No preview available</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Documentation includes Overview content first */}
                                    <section className="doc-section">
                                        <h2 className="doc-section-title">About</h2>
                                        <div className="doc-section-content">
                                            {project.overview.about.map((paragraph, idx) => (
                                                <p key={idx}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="doc-section">
                                        <div className="doc-section-header-row">
                                            <h2 className="doc-section-title">Tech Stack</h2>
                                            <div className="stack-view-toggle">
                                                <button
                                                    className={`stack-toggle-btn ${stackView === "icons" ? "active" : ""}`}
                                                    onClick={() => setStackView("icons")}
                                                >
                                                    Icons
                                                </button>
                                                <button
                                                    className={`stack-toggle-btn ${stackView === "list" ? "active" : ""}`}
                                                    onClick={() => setStackView("list")}
                                                >
                                                    List
                                                </button>
                                            </div>
                                        </div>
                                        {stackView === "icons" ? (
                                            <div className="tech-stack-row">
                                                {project.overview.techStack.map((tech) => (
                                                    <div className="tech-icon-wrapper" key={tech.name}>
                                                        {tech.iconImage ? (
                                                            <img src={tech.iconImage} alt={tech.name} className="tech-icon custom-tech-icon" />
                                                        ) : (
                                                            <i className={`devicon-${tech.devicon} colored tech-icon`}></i>
                                                        )}
                                                        <span className="tech-label">{tech.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="tech-stack-list">
                                                <ul>
                                                    {project.overview.techStack.map((tech) => (
                                                        <li key={tech.name}>{tech.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </section>

                                    <section className="doc-section">
                                        <h2 className="doc-section-title">Key Concepts</h2>
                                        <div className="doc-section-content">
                                            {data.concepts.map((concept, idx) => (
                                                <p key={idx} className="concept-item">{renderBoldText(concept)}</p>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="doc-section">
                                        <h2 className="doc-section-title">Challenges</h2>
                                        <ul className="challenges-list">
                                            {data.challenges.map((challenge, idx) => (
                                                <li key={idx}>{challenge}</li>
                                            ))}
                                        </ul>
                                    </section>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );

        // Always portal to body for proper viewport centering
        return createPortal(windowContent, document.body);
    };

    return (
        <div id="projects" className="projects-section">
            <div className="section-header">
                <h1>projects</h1>

            </div>

            <div className="projects-toolbar">
                <div className="projects-instruction projects-instruction-grid">
                    {isMobile ? (
                        <span className="inst-feature">Long press on thumbnail to show Options.</span>
                    ) : (
                        <>
                            <span className="inst-action">Select and press <kbd>Space</kbd></span>
                            <span className="inst-sep">:</span>
                            <span className="inst-feature">Watch Recording</span>

                            <span className="inst-action">Double Click</span>
                            <span className="inst-sep">:</span>
                            <span className="inst-feature">View Documentation</span>

                            <span className="inst-action">Two-finger tap/Right-Click</span>
                            <span className="inst-sep">:</span>
                            <span className="inst-feature">View Options</span>
                        </>
                    )}
                </div>

                {!isMobile && (
                    <div className="view-toggles">
                        <button
                            className={`view-toggle ${viewMode === "grid" ? "active" : ""}`}
                            onClick={() => setViewMode("grid")}
                            title="Grid View"
                        >
                            <IoGrid />
                        </button>
                        <button
                            className={`view-toggle ${viewMode === "list" ? "active" : ""}`}
                            onClick={() => setViewMode("list")}
                            title="List View"
                        >
                            <IoList />
                        </button>
                    </div>
                )}
            </div>

            {/* Project Views */}
            <div className="projects-desktop-container" ref={projectGridRef}>
                {viewMode === "grid" || isMobile ? (
                    <div className="projects-desktop-grid fade-in-animation" key="grid">
                        {projectList.map((projectKey) => {
                            const project = projectData[projectKey];
                            return (
                                <div
                                    key={project.id}
                                    className={`project-icon-card ${selectedProject === projectKey ? "selected" : ""}`}
                                    onClick={() => setSelectedProject(projectKey)}
                                    onDoubleClick={() => openDetails(projectKey)}
                                    onContextMenu={(e) => handleContextMenu(e, projectKey)}
                                    tabIndex={0}
                                    onFocus={() => setSelectedProject(projectKey)}
                                >
                                    <ProjectThumbnail
                                        thumbnail={project.thumbnail}
                                        demoVideo={project.demoVideo}
                                        title={project.title}
                                    />
                                    <div className="project-icon-label">{project.title}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="projects-list-view fade-in-animation" key="list">
                        <div className="project-list-header">
                            <span className="col-title">Project</span>
                            <span className="col-tags">Tech Stack</span>
                            <span className="col-desc">Description</span>
                        </div>
                        {projectList.map((projectKey) => {
                            const project = projectData[projectKey];
                            return (
                                <div
                                    key={project.id}
                                    className={`project-list-item ${selectedProject === projectKey ? "selected" : ""}`}
                                    onClick={() => setSelectedProject(projectKey)}
                                    onDoubleClick={() => openDetails(projectKey)}
                                    onContextMenu={(e) => handleContextMenu(e, projectKey)}
                                    tabIndex={0}
                                    onFocus={() => setSelectedProject(projectKey)}
                                >
                                    <div className="col-title">
                                        {project.listThumbnail ? (
                                            <img src={project.listThumbnail} className="list-thumbnail" alt="" />
                                        ) : project.thumbnail ? (
                                            <img src={project.thumbnail} className="list-thumbnail" alt="" />
                                        ) : (
                                            <div className="list-thumbnail" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', fontWeight: 'bold' }}>
                                                {project.title.charAt(0)}
                                            </div>
                                        )}
                                        {project.title}
                                    </div>
                                    <div className="col-tags">
                                        {project.overview.techStack && project.overview.techStack.slice(0, 4).map(t => <span key={t.name} className="list-tag">{t.name}</span>)}
                                        {project.overview.techStack && project.overview.techStack.length > 4 && <span className="list-tag">+{project.overview.techStack.length - 4}</span>}
                                    </div>
                                    <div className="col-desc">{project.description}</div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="projects-footer">
                    Watch this space...
                </div>
            </div>

            {/* macOS Context Menu - Portaled to body for correct positioning */}
            {
                contextMenu.visible && createPortal(
                    <div
                        className="macos-context-menu"
                        style={{
                            top: contextMenu.y,
                            left: contextMenu.x
                        }}
                        ref={contextMenuRef}
                    >
                        <div
                            className="context-menu-item"
                            onClick={() => openOverview(contextMenu.project)}
                        >
                            Watch Recording
                        </div>
                        <div
                            className="context-menu-item"
                            onClick={() => openDetails(contextMenu.project)}
                        >
                            View Documentation
                        </div>
                        <div className="context-menu-divider"></div>
                        <div
                            className="context-menu-item"
                            onClick={() => openRepository(contextMenu.project)}
                        >
                            Go to Repository
                        </div>
                    </div>,
                    document.body
                )
            }

            {/* Floating Windows - portaled to body via FloatingWindow component */}
            {
                overviewWindow.visible && (
                    <>
                        {createPortal(
                            <div className={`project-window-overlay ${overviewWindow.isClosing ? "closing" : ""}`} onClick={closeOverview}></div>,
                            document.body
                        )}
                        <FloatingWindow
                            type="overview"
                            windowState={overviewWindow}
                            setWindowState={setOverviewWindow}
                        />
                    </>
                )
            }

            {
                detailsWindow.visible && (
                    <>
                        {createPortal(
                            <div className={`project-window-overlay ${detailsWindow.isClosing ? "closing" : ""}`} onClick={closeDetails}></div>,
                            document.body
                        )}
                        <FloatingWindow
                            type="details"
                            windowState={detailsWindow}
                            setWindowState={setDetailsWindow}
                        />
                    </>
                )
            }
        </div >
    );
};

export default Projects;