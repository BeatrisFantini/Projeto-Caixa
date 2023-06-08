import { ProdutoVendido } from "../entidades/Produto-vendido";
import { transformaPreco } from "../utils/transformaPreco";

export class ProdutosVendidosMapeamento {
  static paraHttp(produtosVendidos: ProdutoVendido[]) {
    return produtosVendidos.map((produtoVendido) => {
      return {
        id: produtoVendido.id,
        nome: produtoVendido.produto.nome,
        descricao: produtoVendido.produto.descricao,
        quantidade: produtoVendido.quantidade,
        precoUnitario: transformaPreco(produtoVendido.produto.preco),
        precoTotal: transformaPreco(produtoVendido.precoTotal),
      };
    });
  }

  static paraVenda(produtosVendidos: ProdutoVendido[]) {
    return produtosVendidos.map((produtoVendido) => {
      return {
        nome: produtoVendido.produto.nome,
        quantidade: produtoVendido.quantidade,
        precoTotal: transformaPreco(produtoVendido.precoTotal),
      };
    });
  }
}
