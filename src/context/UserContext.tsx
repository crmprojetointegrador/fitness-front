import { createContext, useState, type ReactNode } from "react";

export interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  foto?: string;
}

interface UserContextType {
  usuarioAtual: Usuario | null;
  estaLogado: boolean;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  const login = (usuario: Usuario) => {
    setUsuarioAtual(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
  };

  const logout = () => {
    setUsuarioAtual(null);
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  const estaLogado = usuarioAtual !== null;

  return (
    <UserContext.Provider value={{ usuarioAtual, estaLogado, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}