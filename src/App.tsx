import React, { useState } from 'react';
import { QrCode, Store, Users, Wallet, Scan, Star, MapPin, ArrowRight, Shield, Smartphone } from 'lucide-react';
import LandingPage from './components/LandingPage';
import BusinessDashboard from './components/BusinessDashboard';
import CustomerExplore from './components/CustomerExplore';
import CustomerDashboard from './components/CustomerDashboard';
import POSScanner from './components/POSScanner';
import BusinessLandingPage from './components/BusinessLandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import CustomerTrack from './components/CustomerTrack';
import CustomerAccount from './components/CustomerAccount';
import BusinessProfileSetup from './components/BusinessProfileSetup';
import BusinessPrograms from './components/BusinessPrograms';
import BusinessAccount from './components/BusinessAccount';

export type UserRole = 'business' | 'customer' | null;
export type CurrentPage = 'landing' | 'business-dashboard' | 'customer-explore' | 'customer-dashboard' | 'pos-scanner' | 'business-landing' | 'login' | 'signup' | 'customer-track' | 'customer-account'   | 'business-profile-setup' | 'business-programs' | 'business-account';

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('landing');
  const [currentUser, setCurrentUser] = useState<any>(null);

const handleRoleSelect = (role: UserRole) => {
  setUserRole(role);
};

  const navigateToPage = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {

      case 'landing':
        return ( <LandingPage onRoleSelect={handleRoleSelect} navigateToPage={navigateToPage} /> );

      case 'business-dashboard':
        return ( <BusinessDashboard onNavigate={navigateToPage} currentUser={currentUser} setCurrentUser={setCurrentUser} navigateToPage={navigateToPage}/> );

      case 'customer-explore':
        return ( <CustomerExplore onNavigate={navigateToPage} currentUser={currentUser} setCurrentUser={setCurrentUser} navigateToPage={navigateToPage} onRoleSelect={handleRoleSelect}/> );

      case 'customer-dashboard':
        return ( <CustomerDashboard onNavigate={navigateToPage} navigateToPage={navigateToPage} currentUser={currentUser} /> );

      case 'pos-scanner':
        return <POSScanner onNavigate={navigateToPage} />;

      case 'business-landing':
       return ( <BusinessLandingPage onRoleSelect={handleRoleSelect} navigateToPage={navigateToPage} /> );

      case 'login':
       return ( <Login onRoleSelect={handleRoleSelect} navigateToPage={navigateToPage} /> );

      case 'signup':
       return ( <Signup userRole={userRole} onRoleSelect={handleRoleSelect} navigateToPage={navigateToPage} /> );

      case 'customer-track':
       return ( <CustomerTrack userRole={userRole} onRoleSelect={handleRoleSelect} navigateToPage={navigateToPage}/> );

      case 'customer-account':
       return <CustomerAccount navigateToPage={navigateToPage} onRoleSelect={handleRoleSelect} navigateToPage={navigateToPage} />;

     case 'business-profile-setup':
       return <BusinessProfileSetup navigateToPage={navigateToPage} />;

      case 'business-programs':
        return <BusinessPrograms navigateToPage={navigateToPage} />;
      
      case 'business-account':
        return <BusinessAccount navigateToPage={navigateToPage} />;
        
     default:
       return ( <LandingPage onRoleSelect={handleRoleSelect} navigateToPage={navigateToPage} /> );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentPage()}
    </div>
  );
}

export default App;