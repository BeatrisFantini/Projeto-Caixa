import { Produto } from "../entidades/Produto";

export class ProdutoRepositorio {
  public produtos: Produto[];

  constructor() {
    this.produtos = [];
  }

  async procurarTodos() {
    return this.produtos;
  }

  async procurarPorId(id: string) {
    return this.produtos.find((produto) => produto.id == id);
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