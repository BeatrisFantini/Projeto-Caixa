import { ProdutoRepositorio } from "../repositorios/produto-repositorio";

export class AtivarProdutoCasoDeUso {
  constructor(private produtoRepositorio: ProdutoRepositorio) {}

  async executar(id: string) {
    const produto = await this.produtoRepositorio.procurarPorId(id);

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    produto.ativar();

    await this.produtoRepositorio.alterar(id, produto);

    return { produto };
  }
}
