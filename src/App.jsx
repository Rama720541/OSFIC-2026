import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BootstrapCarousel from './components/BootstrapCarousel';
import ProblemSolutionGrid from './components/ProblemSolutionGrid';
import CoreModulesShowcase from './components/CoreModulesShowcase';
import InteractiveDashboardSwitcher from './components/InteractiveDashboardSwitcher';
import RoiCalculator from './components/RoiCalculator';
import MetricsBar from './components/MetricsBar';
import SecurityArchitecture from './components/SecurityArchitecture';
import Footer from './components/Footer';
import PilotModal from './components/PilotModal';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

export function App() {
  const [theme, setTheme] = useState('dark');
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState('Teacher');
  const [registerRole, setRegisterRole] = useState('Institution');

  // Initialize and synchronize theme with document data-bs-theme
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenPilotModal = () => {
    setIsPilotModalOpen(true);
  };

  const handleOpenLoginModal = (role = 'Teacher') => {
    setLoginRole(role);
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleOpenRegisterModal = (role = 'Institution') => {
    setRegisterRole(role);
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const handleScrollToDemo = () => {
    const el = document.getElementById('dashboards');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Global Navigation Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenPilotModal={handleOpenPilotModal}
        onOpenLoginModal={handleOpenLoginModal}
        onOpenRegisterModal={handleOpenRegisterModal}
      />

      <main className="flex-grow-1">
        {/* 1. Hero Section (The 1Cr Hook) */}
        <HeroSection
          onOpenPilotModal={handleOpenPilotModal}
          onScrollToDemo={handleScrollToDemo}
        />

        {/* 2. Flagship Capabilities Bootstrap Carousel */}
        <BootstrapCarousel onOpenPilotModal={handleOpenPilotModal} />

        {/* 3. Problem vs Solution Grid (Dual Dark/Light Optimized) */}
        <ProblemSolutionGrid onOpenPilotModal={handleOpenPilotModal} />

        {/* 4. Core Product Modules Showcase */}
        <CoreModulesShowcase onOpenPilotModal={handleOpenPilotModal} />

        {/* 5. Interactive Dashboard Switcher (Teacher vs Student) */}
        <InteractiveDashboardSwitcher onOpenPilotModal={handleOpenPilotModal} />

        {/* 6. Institutional ROI & Space Optimization Calculator */}
        <RoiCalculator onOpenPilotModal={handleOpenPilotModal} />

        {/* 7. Impact & ROI Metrics Bar (Investor Appeal) */}
        <MetricsBar onOpenPilotModal={handleOpenPilotModal} />

        {/* 8. Security & Architecture Trust Section */}
        <SecurityArchitecture />
      </main>

      {/* 9. Global Footer & Institutional Links */}
      <Footer
        onOpenPilotModal={handleOpenPilotModal}
        onOpenLoginModal={handleOpenLoginModal}
      />

      {/* Interactive Modals */}
      <PilotModal
        isOpen={isPilotModalOpen}
        onClose={() => setIsPilotModalOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        initialRole={loginRole}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToDashboard={() => handleScrollToDemo()}
        onSwitchToRegister={() => handleOpenRegisterModal('Institution')}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        initialRole={registerRole}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => handleOpenLoginModal('Teacher')}
      />
    </div>
  );
}
export default App;
