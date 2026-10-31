import React, { useState, useEffect, useRef } from 'react';
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
import LoginModal, { MOCK_ACCOUNTS } from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import DashboardSelectorModal from './components/DashboardSelectorModal';
import { api } from './services/api';

export function App() {
  const [theme, setTheme] = useState('light');
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDashboardSelectorOpen, setIsDashboardSelectorOpen] = useState(false);
  const [loginRole, setLoginRole] = useState('Teacher');
  const [registerRole, setRegisterRole] = useState('Institution');
  
  // Track authenticated user session from Mock SSO
  const [currentUser, setCurrentUser] = useState(() => {
    return MOCK_ACCOUNTS.teacher; // default initial demo profile
  });

  // Track backend connectivity status
  const [backendStatus, setBackendStatus] = useState({ isLive: false, status: 'checking' });

  // Ref to imperatively control the DashboardSwitcher's active tab
  const dashboardRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  // Periodic health check against FastAPI backend
  useEffect(() => {
    let isMounted = true;
    const probeBackend = async () => {
      const res = await api.checkHealth();
      if (isMounted) setBackendStatus(res);
    };
    probeBackend();
    const interval = setInterval(probeBackend, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleOpenPilotModal = () => setIsPilotModalOpen(true);

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
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Called when a role is selected from MockDashboardCTA or LoginModal
   */
  const handleSelectDashboardRole = (roleId) => {
    if (dashboardRef.current) {
      dashboardRef.current.goToTab(roleId);
    }
    setTimeout(() => {
      const el = document.getElementById('dashboards');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleUserAuthenticated = (account) => {
    setCurrentUser(account);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        currentUser={currentUser}
        backendStatus={backendStatus}
        onOpenPilotModal={handleOpenPilotModal}
        onOpenLoginModal={handleOpenLoginModal}
        onOpenRegisterModal={handleOpenRegisterModal}
      />

      <main className="flex-grow-1">
        <HeroSection
          onOpenPilotModal={handleOpenPilotModal}
          onScrollToDemo={handleScrollToDemo}
        />
        <BootstrapCarousel onOpenPilotModal={handleOpenPilotModal} />
        <ProblemSolutionGrid onOpenPilotModal={handleOpenPilotModal} />
        <CoreModulesShowcase onOpenPilotModal={handleOpenPilotModal} />

        {/* Dashboard Switcher — with active currentUser & backend sync */}
        <InteractiveDashboardSwitcher
          ref={dashboardRef}
          currentUser={currentUser}
          backendStatus={backendStatus}
          onOpenPilotModal={handleOpenPilotModal}
          onOpenLoginModal={handleOpenLoginModal}
          onOpenSelectorModal={() => setIsDashboardSelectorOpen(true)}
        />

        <RoiCalculator onOpenPilotModal={handleOpenPilotModal} />
        <MetricsBar onOpenPilotModal={handleOpenPilotModal} />
        <SecurityArchitecture />
      </main>

      <Footer
        onOpenPilotModal={handleOpenPilotModal}
        onOpenLoginModal={handleOpenLoginModal}
      />

      {/* Modals */}
      <PilotModal isOpen={isPilotModalOpen} onClose={() => setIsPilotModalOpen(false)} />

      <LoginModal
        isOpen={isLoginModalOpen}
        initialRole={loginRole}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToDashboard={handleSelectDashboardRole}
        onSwitchToRegister={() => handleOpenRegisterModal('Institution')}
        onUserAuthenticated={handleUserAuthenticated}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        initialRole={registerRole}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => handleOpenLoginModal('Teacher')}
      />

      {/* Dashboard Role Selector Modal */}
      <DashboardSelectorModal
        isOpen={isDashboardSelectorOpen}
        onClose={() => setIsDashboardSelectorOpen(false)}
        onSelectRole={handleSelectDashboardRole}
      />
    </div>
  );
}

export default App;
