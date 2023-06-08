import { Produto } from "../entidades/Produto";
import { ProdutoVendido } from "../entidades/Produto-vendido";
import { ProdutoVendidoRepositorio } from "../repositorios/produto-vendido-repositorio";

export interface CriarProdutoVendidoCasoDeUsoRequest {
  idVenda: string;
  produto: Produto;
  quantidade: number;
}

export class CriarProdutoVendidoCasoDeUso {
  constructor(private produtoVendidoRepositorio: ProdutoVendidoRepositorio) {} //invertendo dependencia

  async executar({
    idVenda,
    produto,
    quantidade,
  }: CriarProdutoVendidoCasoDeUsoRequest) {
    const novoProdutoVendido = new ProdutoVendido({
      idVenda,
      produto,
      quantidade,
    });

    await this.produtoVendidoRepositorio.criar(novoProdutoVendido);

    return { novoProdutoVendido };
  }
}
