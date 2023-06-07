import { Produto } from "../entidades/Produto";

import { ProdutoRepositorio } from "../repositorios/produto-repositorio";

interface CriarProdutoCasoDeUsoRequisicao {
  nome: string;
  preco: number;
  descricao: string;
}

export class CriarProdutoCasoDeUso {
  constructor(private produtoRepositorio: ProdutoRepositorio) {
    this.produtoRepositorio = produtoRepositorio;
  }

  async executar({ preco, nome, descricao }: CriarProdutoCasoDeUsoRequisicao) {
    const novoProduto = new Produto({
      nome,
      preco,
      descricao,
    });

    await this.produtoRepositorio.criar(novoProduto);

    return { novoProduto };
  }
}
