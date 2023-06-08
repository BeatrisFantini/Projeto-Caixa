import { ProdutoVendido } from "../entidades/Produto-vendido";

export interface ProdutoVendidoRepositorio {
  procurarTodosPorIdVenda(idVenda: string): Promise<ProdutoVendido[]>;
  criar(produtoVendido: ProdutoVendido): Promise<void>;
}
