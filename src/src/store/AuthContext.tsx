import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserDto } from '@types/domain';
import { authApi } from '@api/authApi';

interface AuthContextValue {
  user: UserDto | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: UserDto) => void;
  logout: () => Promise<void>;
  setUser: (user: UserDto | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMe = async () => {
      try {
        const current = await authApi.me();
        setUser(current);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void loadMe();
  }, []);

  const handleLogin = (loggedInUser: UserDto) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    await authApi.logout();
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    loading,
    login: handleLogin,
    logout: handleLogout,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

