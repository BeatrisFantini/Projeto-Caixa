import { ProdutoRepositorio } from "../repositorios/produto-repositorio";

export class DesativarProdutoCasoDeUso {
  constructor(private produtoRepositorio: ProdutoRepositorio) {
    this.produtoRepositorio = produtoRepositorio;
  }

  async executar(id: string) {
    const produto = await this.produtoRepositorio.procurarPorId(id);

    if (!produto) {
      throw new Error("produto não encontrado");
    }

    produto.desativar();

    await this.produtoRepositorio.alterar(id, produto);

    return { produto };
  }
}
