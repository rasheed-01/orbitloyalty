import React, { useState } from 'react';
import { QrCode, Store, Users, Wallet, Scan, Star, MapPin, ArrowRight, Shield, Smartphone } from 'lucide-react';
import LandingPage from './components/LandingPage';
import BusinessDashboard from './components/BusinessDashboard';
import CustomerExplore from './components/CustomerExplore';
import CustomerDashboard from './components/CustomerDashboard';
import POSScanner from './components/POSScanner';
import BusinessLandingPage from './components/BusinessLandingPage';


export type UserRole = 'business' | 'customer' | null;
export type CurrentPage = 'landing' | 'business-dashboard' | 'customer-explore' | 'customer-dashboard' | 'pos-scanner' | 'business-landing';

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('landing');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    if (role === 'business') {
      setCurrentPage('business-dashboard');
    } else if (role === 'customer') {
      setCurrentPage('customer-explore');
    }
  };

  const navigateToPage = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
  return <LandingPage onRoleSelect={handleRoleSelect} navigateToPage={navigateToPage} />;
      case 'business-dashboard':
        return (
          <BusinessDashboard
            onNavigate={navigateToPage}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        );
      case 'customer-explore':
        return (
          <CustomerExplore
            onNavigate={navigateToPage}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        );
      case 'customer-dashboard':
        return (
          <CustomerDashboard
            onNavigate={navigateToPage}
            currentUser={currentUser}
          />
        );
      case 'pos-scanner':
        return <POSScanner onNavigate={navigateToPage} />;
      case 'business-landing':
       return (
          <BusinessLandingPage
          onRoleSelect={handleRoleSelect}
          navigateToPage={navigateToPage}
        />
        );
     default:
       return (
          <LandingPage
          onRoleSelect={handleRoleSelect}
          navigateToPage={navigateToPage}
          />
         );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentPage()}
    </div>
  );
}

export default App;