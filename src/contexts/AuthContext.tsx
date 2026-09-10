import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogin(usuarioLogin: UsuarioLogin): Promise<void>;
  handleLogout(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const usuarioVazio: UsuarioLogin = {
  id: 0,
  nome: "",
  usuario: "",
  senha: "",
  foto: "",
  token: "",
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>(usuarioVazio);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    await login("/usuarios/logar", usuarioLogin, setUsuario);
  }

  function handleLogout() {
    setUsuario(usuarioVazio);
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
