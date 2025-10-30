import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { USERS } from './data/users';
import type { User } from './data/types';

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  // Month is 0-indexed in JavaScript Date
  return new Date(year, month - 1, day);
};

const isExpired = (expiryDateStr: string): boolean => {
  const expiryDate = parseDate(expiryDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return expiryDate < today;
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = useCallback((name: string, code: string): string | null => {
    const user = USERS.find(
      (u) => u.name.trim().toLowerCase() === name.trim().toLowerCase() && u.code.trim().toLowerCase() === code.trim().toLowerCase()
    );

    if (!user) {
      return 'Họ và tên hoặc Mã code không chính xác.';
    }

    if (isExpired(user.expiryDate)) {
      return 'Mã code của bạn đã hết hạn.';
    }

    setCurrentUser(user);
    return null; // Success
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {currentUser ? (
        <MainPage user={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
