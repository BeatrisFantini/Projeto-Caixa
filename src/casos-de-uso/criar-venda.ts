import { ProdutoVendido } from "../entidades/Produto-vendido";
import { TipoPagamento, Venda } from "../entidades/Venda";
import { ProdutoRepositorio } from "../repositorios/produto-repositorio";
import { VendaRepositorio } from "./../repositorios/venda-repositorio";

type CriarVendaCasoDeUsoRequisicaoProps = {
  idProduto: string;
  quantidade: number;
};

interface CriarVendaCasoDeUsoRequisicao {
  request: {
    items: CriarVendaCasoDeUsoRequisicaoProps[];
    tipoPagamento: TipoPagamento[];
  };
}

export class CriarVendaCasoDeUso {
  constructor(
    private vendaRepositorio: VendaRepositorio,
    private produtoRepositorio: ProdutoRepositorio
  ) {}

  async executar({ request }: CriarVendaCasoDeUsoRequisicao) {
    const produtosVendidos = await Promise.allSettled(
      request.items.map(async (item) => {
        const produto = await this.produtoRepositorio.procurarPorId(
          item.idProduto
        );

        if (!produto) {
          throw new Error("Produto não encontrado");
        }

        return new ProdutoVendido({
          produto,
          quantidade: item.quantidade,
          idVenda: null,
        });
      })
    );

    const produtosVendidosFiltrados = [];
    const produtosVendidosRejeitados = [];

    for (const produtoVendido of produtosVendidos) {
      if (produtoVendido.status === "fulfilled") {
        produtosVendidosFiltrados.push(produtoVendido.value);
      } else {
        produtosVendidosRejeitados.push(produtoVendido);
      }
    }

    const venda = new Venda({
      produtosVendidos: produtosVendidosFiltrados,
      tipoPagamento: request.tipoPagamento,
    });

    await this.vendaRepositorio.criar(venda);

    return {
      produtosVendidosRejeitados,
      venda,
    };
  }
}
