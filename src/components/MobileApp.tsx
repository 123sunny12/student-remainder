
import React, { useState } from 'react';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import HomeDashboard from './HomeDashboard';
import TimetableScreen from './TimetableScreen';
import LabRecordsScreen from './LabRecordsScreen';
import SettingsScreen from './SettingsScreen';
import BottomNavigation from './BottomNavigation';

type AppScreen = 'splash' | 'login' | 'home' | 'timetable' | 'labs' | 'settings';
type Screen = 'home' | 'timetable' | 'labs' | 'settings';

const MobileApp = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');

  const handleSplashComplete = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'home':
        return <HomeDashboard />;
      case 'timetable':
        return <TimetableScreen />;
      case 'labs':
        return <LabRecordsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeDashboard />;
    }
  };

  const showBottomNav = !(['splash', 'login'] as AppScreen[]).includes(currentScreen);

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
      <div className="min-h-screen">
        {renderScreen()}
      </div>
      {showBottomNav && (
        <BottomNavigation 
          activeScreen={currentScreen as Screen} 
          onNavigate={handleNavigate} 
        />
      )}
    </div>
  );
};

export default MobileApp;
