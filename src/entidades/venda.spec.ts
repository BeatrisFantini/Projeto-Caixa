import { describe, expect, it } from "vitest";

import { Venda } from "./Venda";
import { Produto } from "./Produto";
import { ProdutoVendido } from "./Produto-vendido";

describe("Venda", () => {
  it("Deve criar uma venda", () => {
    const produtosVendidos = [
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 1",
          preco: 10,
          descricao: "Descrição do produto 1",
        }),
        quantidade: 3,
        idVenda: null,
      }),
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 2",
          preco: 40,
          descricao: "Descrição do produto 2",
        }),
        quantidade: 2,
        idVenda: null,
      }),
    ];

    const venda = new Venda(
      {
        produtosVendidos,
        tipoPagamento: ["dinheiro"],
      },
      "1"
    );

    expect(venda.id).toEqual(expect.any(String));
  });

  it("Deve cancelar uma venda", () => {
    const produtosVendidos = [
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 1",
          preco: 10,
          descricao: "Descrição do produto 1",
        }),
        quantidade: 3,
        idVenda: null,
      }),
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 2",
          preco: 40,
          descricao: "Descrição do produto 2",
        }),
        quantidade: 2,
        idVenda: null,
      }),
    ];

    const venda = new Venda(
      {
        produtosVendidos,
        tipoPagamento: ["dinheiro"],
      },
      "1"
    );

    venda.cancelar();

    expect(venda.dataCancelamento).toEqual(expect.any(Date));
  });

  it("Deve calcular o troco", () => {
    const produtosVendidos = [
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 1",
          preco: 10,
          descricao: "Descrição do produto 1",
        }),
        quantidade: 3,
        idVenda: null,
      }),
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 2",
          preco: 40,
          descricao: "Descrição do produto 2",
        }),
        quantidade: 2,
        idVenda: null,
      }),
    ];

    const venda = new Venda(
      {
        produtosVendidos,
        tipoPagamento: ["dinheiro"],
        quantidadePaga: 100,
      },
      "1"
    );

    expect(venda.calculaTroco()).toEqual(
      venda.precoTotal - venda.quantidadePaga
    );
  });

  it("Deve lançar um erro ao calcular o troco para pagamentos com mais de um tipo", async () => {
    const produtosVendidos = [
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 1",
          preco: 10,
          descricao: "Descrição do produto 1",
        }),
        quantidade: 3,
        idVenda: null,
      }),
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 2",
          preco: 40,
          descricao: "Descrição do produto 2",
        }),
        quantidade: 2,
        idVenda: null,
      }),
    ];

    const venda = new Venda(
      {
        produtosVendidos,
        tipoPagamento: ["dinheiro", "débito"],
        quantidadePaga: 100,
      },
      "1"
    );

    expect(() => venda.calculaTroco()).toThrow(
      "Não é possível calcular o troco para pagamentos com mais de um tipo"
    );
  });

  it("Deve lançar um erro ao calcular o troco para pagamentos sem dinheiro", async () => {
    const produtosVendidos = [
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 1",
          preco: 10,
          descricao: "Descrição do produto 1",
        }),
        quantidade: 3,
        idVenda: null,
      }),
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 2",
          preco: 40,
          descricao: "Descrição do produto 2",
        }),
        quantidade: 2,
        idVenda: null,
      }),
    ];

    const venda = new Venda(
      {
        produtosVendidos,
        tipoPagamento: ["débito"],
        quantidadePaga: 0,
      },
      "1"
    );

    expect(() => venda.calculaTroco()).toThrow(
      "Não é possível calcular o troco para um tipo de pagamento diferente de dinheiro"
    );
  });

  it("Deve lançar um erro ao calcular o troco para pagamentos sem dinheiro", async () => {
    const produtosVendidos = [
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 1",
          preco: 10,
          descricao: "Descrição do produto 1",
        }),
        quantidade: 3,
        idVenda: null,
      }),
      new ProdutoVendido({
        produto: new Produto({
          nome: "Produto 2",
          preco: 40,
          descricao: "Descrição do produto 2",
        }),
        quantidade: 2,
        idVenda: null,
      }),
    ];

    const venda = new Venda(
      {
        produtosVendidos,
        tipoPagamento: ["dinheiro"],
        quantidadePaga: 0,
      },
      "1"
    );

    expect(() => venda.calculaTroco()).toThrow(
      "Não é possível calcular o troco para um valor menor ou igual a zero"
    );
  });
});
