import { createContext, useState, type ReactNode } from "react";

export interface Usuario {
  id: number;
  nome: string;
}

interface UserContextType {
  usuarioAtual: Usuario | null;
  estaLogado: boolean;
  login: (id: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

const integrantes: Usuario[] = [
  { id: 1, nome: 'Alanis Santos' },
  { id: 2, nome: 'Bruna Mendes' },
  { id: 3, nome: 'Eliane Orlandin' },
  { id: 4, nome: 'Flame Souza' },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(() => {
    const salvo = localStorage.getItem("usuario_id");
    if (salvo) {
      return integrantes.find(i => i.id === Number(salvo)) || null;
    }
    return null;
  });

  const login = (id: number) => {
    const user = integrantes.find(i => i.id === id);
    if (user) {
      setUsuarioAtual(user);
      localStorage.setItem("usuario_id", String(id));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuarioAtual(null);
    localStorage.removeItem("usuario_id");
    window.location.href = "/login"; 
  };

  const estaLogado = usuarioAtual !== null;

  return (
    <UserContext.Provider value={{ usuarioAtual, estaLogado, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}