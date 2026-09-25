"use client";

import React, { createContext, useContext, type ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signupUser, loginUser, verifyUserEmail, logoutThunk, setUser } from '@/store/authSlice';
import { resetProfile } from '@/store/profileSlice';
import { resetWallet } from '@/store/walletSlice';
import type { AuthUser } from '@/store/authSlice';
export type User = AuthUser;

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);

  const signup = async (name: string, email: string, phone: string, password: string) => {
    const res: any = await dispatch(signupUser({ fullName: name, email, phone, password, confirmPassword: password }));
    if (res.error || signupUser.rejected.match(res)) throw new Error((res.payload as string) || res.error?.message || 'Signup failed');
  };

  const verifyEmail = async (email: string, otp: string) => {
    const res: any = await dispatch(verifyUserEmail({ email, otp }));
    if (res.error || verifyUserEmail.rejected.match(res)) throw new Error((res.payload as string) || res.error?.message || 'Verification failed');
  };

  const login = async (identifier: string, password: string) => {
    const res: any = await dispatch(loginUser({ identifier, password }));
    if (res.error || loginUser.rejected.match(res)) throw new Error((res.payload as string) || res.error?.message || 'Login failed');
  };

  const logout = () => {
    dispatch(logoutThunk());
    // Clear cached profile/wallet so the next session (or user) refetches.
    dispatch(resetProfile());
    dispatch(resetWallet());
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (!user) return;
    dispatch(setUser({ ...user, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!isAuthenticated, login, signup, verifyEmail, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
