import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Функция "входа" с mock данными
  const login = async (email, password, userType) => {
    setIsLoading(true);
    
    // Имитация запроса к API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock данные пользователя
    const mockUser = {
      id: 1,
      name: userType === 'advertiser' ? 'Компания "Рога и копыта"' : 'Иван Блогер',
      email: email,
      userType: userType,
      avatar: userType === 'advertiser' ? '🏢' : '🎬',
      registrationDate: '2024-01-15',
      balance: userType === 'advertiser' ? 50000 : 15000,
      campaigns: userType === 'advertiser' ? 5 : 3,
      statistics: {
        views: 12500,
        clicks: 345,
        conversions: 28,
        engagement: 4.2
      }
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return { success: true, user: mockUser };
  };

  // Функция "регистрации"
  const register = async (userData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser = {
      id: Date.now(),
      ...userData,
      avatar: userData.userType === 'advertiser' ? '🏢' : '🎬',
      registrationDate: new Date().toISOString().split('T')[0],
      balance: 0,
      campaigns: 0,
      statistics: {
        views: 0,
        clicks: 0,
        conversions: 0,
        engagement: 0
      }
    };
    
    setUser(newUser);
    setIsLoading(false);
    return { success: true, user: newUser };
  };

  // Функция выхода
  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};