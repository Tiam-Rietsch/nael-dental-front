"use client"

import { clearAuthData, getAccessToken } from '@/lib/auth/auth';
import authApi from '@/lib/auth/authApi';
import { api } from '@/lib/auth/axios';
import { User } from '@/lib/auth/type';
import { useRouter } from 'next/navigation';
import { useContext, createContext, useState, useEffect, useLayoutEffect } from 'react'


interface AuthContextInterface {
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextInterface | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter()

  useLayoutEffect(() => {
    const checkAuth = async () => {
      const access = await getAccessToken()
      if (!access) {
        clearAuthData();
        router.push('/login');
        return;
      }

      try {
        const userData = await authApi.getMe()
        setCurrentUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        clearAuthData();
        router.push('/login');
      }
    }

    checkAuth();
  }, [])
  
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export default useAuthContext