"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, User } from "@/services/authService";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => User | null;
  register: (user: Omit<User, "id">) => User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const login = (email: string, password: string) => {
    const u = authService.login(email, password);
    setUser(u);
    return u;
  };

  const register = (data: Omit<User, "id">) => {
    const u = authService.register(data);
    setUser(u);
    return u;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
