import { randomUUID } from "crypto";
import { ProdutoVendido } from "./Produto-vendido";

export type TipoPagamento = "dinheiro" | "crédito" | "débito" | "pix";

interface VendaProps {
  produtosVendidos: ProdutoVendido[];
  tipoPagamento: TipoPagamento[];
  dataCancelamento?: Date | null;
  dataCriacao?: Date;
}

export class Venda {
  private _id: string;
  public props: VendaProps;

  constructor(
    {
      dataCriacao,
      produtosVendidos,
      tipoPagamento,
      dataCancelamento,
    }: VendaProps,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      produtosVendidos,
      tipoPagamento,
      dataCancelamento: dataCancelamento,
      dataCriacao: dataCriacao ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get produtosVendidos() {
    return this.props.produtosVendidos;
  }

  public get tipoPagamento() {
    return this.props.tipoPagamento;
  }

  public get dataCancelamento() {
    return this.props.dataCancelamento;
  }

  public get dataCriacao() {
    return this.props.dataCriacao;
  }

  public cancelar() {
    this.props.dataCancelamento = new Date();
  }

  public get precoTotal() {
    return this.props.produtosVendidos.reduce(
      (acc, produtoVendido) => acc + produtoVendido.precoTotal,
      0
    );
  }
}
