import { Venda } from "../entidades/Venda";
import { transformaPreco } from "../utils/transformaPreco";
import { ProdutosVendidosMapeamento } from "./produtos-vendidos-mapeamento";

export class VendaMapeamento {
  static paraExcel(vendas: Venda[]) {
    const colunas = ["id_venda", "tipoPagamento", "valorTotal"];

    const linhas = vendas.map((venda) => {
      return [venda.id, venda.tipoPagamento, venda.precoTotal];
    });

    return {
      colunas,
      linhas,
    };
  }

  static paraHttp(vendas: Venda[]) {
    return vendas.map((venda) => {
      return {
        id: venda.id,
        tipoPagamento: venda.tipoPagamento,
        precoTotal: transformaPreco(venda.precoTotal),
        produtosVendidos: ProdutosVendidosMapeamento.paraHttp(
          venda.produtosVendidos
        ),
      };
    });
  }
}
