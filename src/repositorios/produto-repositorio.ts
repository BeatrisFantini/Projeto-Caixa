import { Produto } from "../entidades/Produto";

export interface ProdutoRepositorio {
  procurarTodos(): Promise<Produto[]>;
  procurarPorId(id: string): Promise<Produto | null>;
  criar(produto: Produto): Promise<void>;
  alterar(id: string, produto: Produto): Promise<void>;
}
