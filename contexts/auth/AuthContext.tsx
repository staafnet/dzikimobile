import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isReady: boolean;
  isAuthenticated: boolean;
  hasOnboarded: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setOnboarded: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isReady, setReady] = useState(false);
  const [isAuthenticated, setAuth] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [token, onboarded] = await Promise.all([
          SecureStore.getItemAsync('auth_token'),
          AsyncStorage.getItem('has_onboarded'),
        ]);
        setAuth(!!token);
        setHasOnboarded(onboarded === '1');
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const login = async (token: string) => {
    await SecureStore.setItemAsync('auth_token', token);
    setAuth(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    setAuth(false);
  };

  const setOnboarded = async () => {
    await AsyncStorage.setItem('has_onboarded', '1');
    setHasOnboarded(true);
  };

  return (
    <AuthContext.Provider value={{ isReady, isAuthenticated, hasOnboarded, login, logout, setOnboarded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}