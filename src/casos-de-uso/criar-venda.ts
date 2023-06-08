import { randomUUID } from "crypto";
import { ProdutoVendido } from "../entidades/Produto-vendido";
import { TipoPagamento, Venda } from "../entidades/Venda";
import { ProdutoRepositorio } from "../repositorios/produto-repositorio";
import { VendaRepositorio } from "./../repositorios/venda-repositorio";
import { CriarProdutoVendidoCasoDeUso } from "./criar-produto-vendido";

type CriarVendaCasoDeUsoRequisicaoProps = {
  idProduto: string;
  quantidade: number;
};

interface CriarVendaCasoDeUsoRequisicao {
  items: CriarVendaCasoDeUsoRequisicaoProps[];
  tipoPagamento: TipoPagamento[];
}

/**
 *
 */

export class CriarVendaCasoDeUso {
  constructor(
    private vendaRepositorio: VendaRepositorio,
    private produtoRepositorio: ProdutoRepositorio,
    private criarProdutoVendidoCasoDeUso: CriarProdutoVendidoCasoDeUso
  ) {}

  async executar({ items, tipoPagamento }: CriarVendaCasoDeUsoRequisicao) {
    const idVenda = randomUUID();

    console.log({ items });

    const produtosVendidos = await Promise.allSettled(
      items.map(async (item) => {
        console.log({ id: item });
        const produto = await this.produtoRepositorio.procurarPorId(
          item.idProduto
        );

        if (!produto) {
          throw new Error("Produto não encontrado");
        }

        return new ProdutoVendido({
          produto,
          quantidade: item.quantidade,
          idVenda,
        });
      })
    );

    const produtosVendidosFiltrados = [];
    const produtosVendidosRejeitados = [];

    console.log({ produtosVendidos });

    for (const produtoVendido of produtosVendidos) {
      if (produtoVendido.status === "fulfilled") {
        produtosVendidosFiltrados.push(produtoVendido.value);

        await this.criarProdutoVendidoCasoDeUso.executar({
          idVenda,
          produto: produtoVendido.value.produto,
          quantidade: produtoVendido.value.quantidade,
        });
      } else {
        produtosVendidosRejeitados.push(produtoVendido);
      }
    }
    console.log({ produtosVendidosFiltrados });
    const venda = new Venda(
      {
        produtosVendidos: produtosVendidosFiltrados,
        tipoPagamento,
      },
      idVenda
    );

    await this.vendaRepositorio.criar(venda);

    return {
      produtosVendidosRejeitados,
      venda,
    };
  }
}
