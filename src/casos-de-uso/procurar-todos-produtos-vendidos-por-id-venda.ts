import { ProdutoVendidoRepositorio } from "../repositorios/produto-vendido-repositorio";

export class ProcurarTodosProdutosVendidosPorIdVendaCasoDeUso {
  constructor(private produtoVendidoRepositorio: ProdutoVendidoRepositorio) {}

  async executar(idVenda: string) {
    const produtosVendidos =
      await this.produtoVendidoRepositorio.procurarTodosPorIdVenda(idVenda);

    return { produtosVendidos };
  }
}
