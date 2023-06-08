import { randomUUID } from "node:crypto";

interface PropriedadesProduto {
  nome: string;
  preco: number;
  descricao: string;
  dataDesativacao?: Date | null;
  dataCriacao?: Date;
  dataAlteracao?: Date | null;
}

export class Produto {
  private _id: string;
  private props: PropriedadesProduto;

  constructor(
    {
      nome,
      preco,
      descricao,
      dataAlteracao,
      dataCriacao,
      dataDesativacao,
    }: PropriedadesProduto,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      nome,
      preco,
      descricao,
      dataCriacao: dataCriacao ?? new Date(),
      dataAlteracao,
      dataDesativacao,
    };
  }

  get id() {
    return this._id;
  }

  get nome() {
    return this.props.nome;
  }

  get preco() {
    return this.props.preco;
  }

  get descricao() {
    return this.props.descricao;
  }

  get dataCriacao() {
    return this.props.dataCriacao;
  }

  get dataAlteracao() {
    return this.props.dataAlteracao;
  }

  get dataDesativacao() {
    return this.props.dataDesativacao;
  }

  public alterar() {
    this.props.dataAlteracao = new Date();
  }

  set nome(nome: string) {
    this.props.nome = nome;
    this.alterar();
  }

  set preco(preco: number) {
    this.props.preco = preco;
    this.alterar();
  }

  set descricao(descricao: string) {
    this.props.descricao = descricao;
    this.alterar();
  }

  public desativar() {
    this.props.dataDesativacao = new Date();
    this.alterar();
  }

  public ativar() {
    this.props.dataDesativacao = null;
    this.alterar();
  }
}
