import { beforeEach, describe, expect, it } from "vitest";

import { CriarVendaCasoDeUso } from "./criar-venda";
import { VendaRepositorioEmMemoria } from "../repositorios/em-memoria/venda-repositorio";
import { ProdutoRepositorioEmMemoria } from "../repositorios/em-memoria/produto-repositorio";
import { Venda } from "../entidades/Venda";
import { ProdutoVendido } from "../entidades/Produto-vendido";
import { Produto } from "../entidades/Produto";

let vendaRepositorio: VendaRepositorioEmMemoria;
let produtoRepositorio: ProdutoRepositorioEmMemoria;
let sut: CriarVendaCasoDeUso; // System Under Test -> Sistema Sob Teste

describe("Criar Venda Caso de Uso", () => {
  beforeEach(() => {
    vendaRepositorio = new VendaRepositorioEmMemoria();
    produtoRepositorio = new ProdutoRepositorioEmMemoria();

    sut = new CriarVendaCasoDeUso(vendaRepositorio, produtoRepositorio);
  });

  it("deve criar um venda", async () => {
    const produtos = [
      new Produto({
        nome: "Nome Produto 1",
        preco: 30,
        descricao: "Descrição Produto 1",
      }),
      new Produto({
        nome: "Nome Produto 2",
        preco: 10,
        descricao: "Descrição Produto 2",
      }),
    ];

    await produtoRepositorio.criar(produtos[0]);
    await produtoRepositorio.criar(produtos[1]);

    const produtosVendidos = [
      new ProdutoVendido({
        produto: produtos[0],
        quantidade: 1,
        idVenda: null,
      }),
      new ProdutoVendido({
        produto: produtos[1],
        quantidade: 2,
        idVenda: null,
      }),
    ];

    const requestItems = produtosVendidos.map((produtoVendido) => {
      return {
        idProduto: produtoVendido.produto.id,
        quantidade: produtoVendido.quantidade,
      };
    });

    await sut.executar({
      request: {
        items: requestItems,
        tipoPagamento: ["dinheiro"],
      },
    });

    expect(vendaRepositorio.vendas[0].id).toEqual(expect.any(String));
    expect(vendaRepositorio.vendas[0].produtosVendidos).toHaveLength(2);
  });
});
