import { randomUUID } from "crypto";

import { ProdutoVendido } from "./Produto-vendido";
import { Substituir } from "../helpers/Substituir";

export type TipoPagamento = "dinheiro" | "crédito" | "débito" | "pix";

interface VendaProps {
  produtosVendidos: ProdutoVendido[];
  tipoPagamento: TipoPagamento[];
  quantidadePaga: number;
  dataCancelamento?: Date | null;
  dataCriacao?: Date;
}

export class Venda {
  private _id: string;
  private props: VendaProps;

  constructor(
    {
      dataCriacao,
      produtosVendidos,
      tipoPagamento,
      dataCancelamento,
      quantidadePaga,
    }: Substituir<
      VendaProps,
      {
        dataCriacao?: Date;
        quantidadePaga?: number;
      }
    >,
    id: string
  ) {
    this._id = id;
    this.props = {
      produtosVendidos,
      tipoPagamento,
      dataCancelamento: dataCancelamento,
      quantidadePaga: quantidadePaga ?? 0,
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

  public get quantidadePaga() {
    return this.props.quantidadePaga;
  }

  public calculaTroco() {
    if (this.props.tipoPagamento.length > 1) {
      throw new Error(
        "Não é possível calcular o troco para pagamentos com mais de um tipo"
      );
    }

    if (!this.props.tipoPagamento.includes("dinheiro")) {
      throw new Error(
        "Não é possível calcular o troco para um tipo de pagamento diferente de dinheiro"
      );
    }

    if (this.props.quantidadePaga <= 0) {
      throw new Error(
        "Não é possível calcular o troco para um valor menor ou igual a zero"
      );
    }

    return this.precoTotal - (this.props.quantidadePaga ?? 0);
  }
}
