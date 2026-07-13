import { Usuario } from "./Usuario";
import { type Categoria } from "./Categoria";

export interface Produto {
  id: number;
  nome: string;
  dataValidade: string; 
  preco: number;
  calorias: number;
  marca: string;
  categoria: Categoria | null;
  usuario?: Usuario | null; 
}