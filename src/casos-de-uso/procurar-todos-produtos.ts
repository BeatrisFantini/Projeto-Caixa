import { ProdutoRepositorio } from "../repositorios/produto-repositorio";

export class ProcurarTodosProdutosCasoDeUso {
  constructor(private produtoRepositorio: ProdutoRepositorio) {}

  async executar() {
    const produtos = await this.produtoRepositorio.procurarTodos();

    return { produtos };
  }
}
