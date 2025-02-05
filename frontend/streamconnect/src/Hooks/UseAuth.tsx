 import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UseLocalStorage } from "./UseLocaleStorage";

// Definição do tipo de usuário


// Definição do contexto de autenticação
interface AuthContextType {
  user: string
  loginAuth:  (data: string) => Promise<void>;
  logout: () => void;
}

// Criando o contexto com tipagem correta
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

// Definição do provider
export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = UseLocalStorage("user", null);
  const navigate = useNavigate();

  // Função de login
  const loginAuth = async (data: string) => {
    setUser(data);
    navigate("/catalog", { replace: true });
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  // Memoização do valor do contexto
  const value = useMemo(
    () => ({
      user,
      loginAuth,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
