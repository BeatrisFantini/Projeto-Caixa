/**
 *
produto: Produto
quantidade: int
precoTotal: float
id_venda: int | null
 */

import { randomUUID } from "node:crypto";
import { Produto } from "./Produto";

interface ProdutoVendidoProps {
  produto: Produto;
  quantidade: number;
  idVenda: string | null;
}

export class ProdutoVendido {
  private _id: string;
  private props: ProdutoVendidoProps;

  constructor(
    { idVenda, produto, quantidade }: ProdutoVendidoProps,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      idVenda,
      produto,
      quantidade,
    };
  }

  get idVenda() {
    return this.props.idVenda;
  }

  get precoTotal() {
    return this.props.produto.preco * this.props.quantidade;
  }

  get quantidade() {
    return this.props.quantidade;
  }

  get produto() {
    return this.props.produto;
  }

  get id() {
    return this._id;
  }
}
