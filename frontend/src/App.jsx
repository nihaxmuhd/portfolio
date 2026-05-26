import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import { api } from './api';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    setIsAdmin(api.isAuthenticated());
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
  };

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 selection:bg-violet-500/30 selection:text-white text-slate-900 dark:text-gray-100 overflow-x-hidden">
      <Navbar
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onOpenLogin={() => setIsLoginOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main content — full width, no horizontal padding/max-w here */}
      <main>
        <Hero />
        <About />
        <Skills isAdmin={isAdmin} />
        <Projects isAdmin={isAdmin} />
        <Experience isAdmin={isAdmin} />
        <Contact />
      </main>

      <Footer
        onOpenLogin={() => setIsLoginOpen(true)}
        isAdmin={isAdmin}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
