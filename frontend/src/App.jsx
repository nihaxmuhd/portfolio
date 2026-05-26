import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ChatAssistant from './components/chat/ChatAssistant';
import { api } from './api';
import AdminResume from './components/AdminResume';

function App() {
  const [isAdmin, setIsAdmin] = useState(() => api.isAuthenticated());
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-sans text-slate-900 transition-colors duration-300 dark:text-slate-100">
      <Navbar
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onOpenLogin={() => setIsLoginOpen(true)}
        theme={theme}
        toggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      />

      <main>
        <Hero />
        <AdminResume
          isAdmin={isAdmin}
        />
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

      <ChatAssistant />
    </div>
  );
}

export default App;
