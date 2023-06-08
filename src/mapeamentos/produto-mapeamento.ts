import { Produto } from "../entidades/Produto";
import { transformaPreco } from "../utils/transformaPreco";

export class ProdutoMapeamento {
  static paraHttp(produto: Produto) {
    return {
      id: produto.id,
      nome: produto.nome,
      preco: transformaPreco(produto.preco),
      descricao: produto.descricao,
    };
  }

  static paraProdutoVendido(produto: Produto) {
    return {
      nome: produto.nome,
      preco: transformaPreco(produto.preco),
      descricao: produto.descricao,
    };
  }
}
