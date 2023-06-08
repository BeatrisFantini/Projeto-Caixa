import { ProdutoVendido } from "../../entidades/Produto-vendido";
import { ProdutoVendidoRepositorio } from "../produto-vendido-repositorio";

export class ProdutoVendidoRepositorioEmMemoria
  implements ProdutoVendidoRepositorio
{
  public produtosVendidos: ProdutoVendido[] = [];

  async procurarTodosPorIdVenda(idVenda: string): Promise<ProdutoVendido[]> {
    return this.produtosVendidos.filter(
      (produtoVendido) => produtoVendido.idVenda === idVenda
    );
  }

  async criar(produtoVendido: ProdutoVendido): Promise<void> {
    this.produtosVendidos.push(produtoVendido);
  }
}
