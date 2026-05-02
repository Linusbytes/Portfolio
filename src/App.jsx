import './App.css'
import Intro from './components/Intro'
import NavBar from './components/NavBar'
import About from './components/About'
import Projects from './components/Projects'
import Home from './components/Home'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Footer from './components/Footer'
// Gallery import removed - images deleted
import Landing from './components/Landing'
import ThemeToggle from './components/ThemeToggle'

// Analytics removed - not using Vercel hosting
import { useState, useEffect } from 'react'
import { Fade } from 'react-awesome-reveal'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

function App() {

  const [section, setSection] = useState(0);
  const [theme, setTheme] = useState('light');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  /* const [showLanding, setShowLanding] = useState(true); Removed as we want scroll behavior */


  return (
    <div className="app">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Landing />
      <div className="main-content-view">
        
        {/* Mobile Header with Hamburger Menu */}
        <div className="mobile-header">
          <div className="mobile-logo">Linus</div>
          <div className="hamburger-menu" onClick={() => setIsDrawerOpen(true)}>
            <MenuRoundedIcon fontSize="large" />
          </div>
        </div>

        {/* Drawer Overlay for Mobile */}
        {isDrawerOpen && (
          <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>
        )}

        <div className={`left-container ${isDrawerOpen ? 'drawer-open' : ''}`}>
          <Intro />
          <NavBar
            setSection={setSection}
            closeDrawer={() => setIsDrawerOpen(false)}
          />
        </div>
        <div className={`content-wrapper ${section === 2 ? 'center-content' : ''}`}>
          <div className="section-container">
            <div key={section} className="section-slide-in">
              {section === 0 && <Home />}
              {section === 1 && <About theme={theme} />}
              {section === 2 && <Experience setSection={setSection} />}
              {section === 3 && <Projects />}
              {/* Gallery section removed - images deleted */}
              {section === 5 && <Skills />}
            </div>
          </div>
          <Footer />
        </div>

      </div>

    </div>
  )
}


export default App
