import { Produto } from "../entidades/Produto";

export interface ProdutoRepositorio {
  procurarTodos(): Promise<Produto[]>;
  procurarPorId(id: string): Promise<Produto | null>;
  criar(produto: Produto): Promise<Produto>;
  alterar(id: string, produto: Produto): Promise<Produto>;
}
