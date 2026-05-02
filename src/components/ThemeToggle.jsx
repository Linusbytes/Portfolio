import React, { useState, useEffect } from 'react';
import '../styles/ThemeToggle.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggle = ({ theme, toggleTheme }) => {
    const [isFaded, setIsFaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFaded(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`theme-toggle-container ${isFaded ? 'faded' : ''}`}
            onClick={toggleTheme}
        >
            <div className="toggle-content">
                {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                <span className="toggle-text">Click this corner to toggle  {'>'}</span>
            </div>
            {/* Helper active area always present */}
        </div>
    );
};

export default ThemeToggle;
