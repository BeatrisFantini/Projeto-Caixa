import { ProdutoRepositorio } from "../repositorios/produto-repositorio";

export class ProcurarProdutoPorIdCasoDeUso {
  constructor(private produtoRepositorio: ProdutoRepositorio) {}

  async executar(id: string) {
    const produto = await this.produtoRepositorio.procurarPorId(id);

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    return { produto };
  }
}
