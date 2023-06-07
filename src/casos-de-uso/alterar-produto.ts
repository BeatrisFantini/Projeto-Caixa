import { ProdutoRepositorio } from "../repositorios/produto-repositorio";

interface AlterarProdutoCasoDeUsoRequisicao {
  id: string;
  nome?: string;
  preco?: number;
  descricao?: string;
}

export class AlterarProdutoCasoDeUso {
  constructor(private produtoRepositorio: ProdutoRepositorio) {}

  async executar({
    id,
    descricao,
    nome,
    preco,
  }: AlterarProdutoCasoDeUsoRequisicao) {
    const produto = await this.produtoRepositorio.procurarPorId(id);

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    produto.nome = nome ?? produto.nome;
    produto.preco = preco ?? produto.preco;
    produto.descricao = descricao ?? produto.descricao;

    await this.produtoRepositorio.alterar(id, produto);

    return { produto };
  }
}
