import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  accessToken: string | null;
  userId: number | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (token: string, userId: number, username: string) => void;
  logout: () => void;
}

interface TokenPayload {
  payload: {
    username: string;
    sub: number;
  };
  iat: number;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Adicione o tipo de props para aceitar `children`
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const navigate = useNavigate();

  const login = (token: string, userId: number, username: string) => {
    setAccessToken(token);
    setUserId(userId);
    setUsername(username);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userId', String(userId));
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setAccessToken(null);
    setUserId(null);
    setUsername(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/signin');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (storedToken) {
      try {
        const decoded = jwtDecode<TokenPayload>(storedToken);
        if (decoded.exp * 1000 < Date.now()) {
          logout(); // Token expirado
        } else {
          setAccessToken(storedToken);
          setUserId(Number(storedUserId));
          setUsername(storedUsername || null);
        }
      } catch {
        logout(); // Token inválido
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        userId,
        username,
        isAuthenticated: !!accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
