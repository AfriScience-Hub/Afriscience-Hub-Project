"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, phone: string, password: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIzODM4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('afrisciencehub_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('afrisciencehub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('afrisciencehub_user');
    }
  }, [user]);

  const login = (email: string, _password: string) => {
    // Accept any credentials — extract a display name from the email
    const namePart = email.split('@')[0] || 'User';
    const displayName = namePart
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

    setUser({
      name: displayName,
      email,
      phone: '',
      avatar: DEFAULT_AVATAR,
    });
  };

  const signup = (name: string, email: string, phone: string, _password: string) => {
    setUser({
      name: name || 'New User',
      email,
      phone,
      avatar: DEFAULT_AVATAR,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
