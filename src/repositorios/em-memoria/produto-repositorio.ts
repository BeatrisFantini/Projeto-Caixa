import { Produto } from "../../entidades/Produto";
import { ProdutoRepositorio } from "../produto-repositorio";

export class ProdutoRepositorioEmMemoria implements ProdutoRepositorio {
  public produtos: Produto[] = [];

  async procurarTodos() {
    return this.produtos;
  }

  async procurarPorId(id: string) {
    const produto = this.produtos.find((produto) => produto.id === id);

    if (!produto) {
      return null;
    }

    return produto;
  }

  async criar(produto: Produto) {
    this.produtos.push(produto);
  }

  async alterar(id: string, produto: Produto) {
    const index = this.produtos.findIndex((produto) => produto.id == id);

    this.produtos[index] = produto;
  }

  // async deletar(id: string) {
  //   const index = this.produtos.findIndex((produto) => produto.id == id);

  //   this.produtos.splice(index, 1);
  // }
}
