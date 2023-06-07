import { beforeEach, describe, expect, it } from "vitest";

import { ProdutoRepositorio } from "../repositorios/produto-repositorio";
import { ProcurarProdutoPorIdCasoDeUso } from "./procurar-produto-por-id";
import { Produto } from "../entidades/Produto";

let produtoRepositorio: ProdutoRepositorio;
let sut: ProcurarProdutoPorIdCasoDeUso; // System Under Test -> Sistema Sob Teste

describe("Procurar Produto Por Id Caso de Uso", () => {
  beforeEach(() => {
    produtoRepositorio = new ProdutoRepositorio();
    sut = new ProcurarProdutoPorIdCasoDeUso(produtoRepositorio);
  });

  it("deve procurar o produto por id", async () => {
    const novoProduto = new Produto({
      nome: "Produto 1",
      preco: 10,
      descricao: "Descrição",
    });

    const produtoCriado = await produtoRepositorio.criar(novoProduto);

    const { produto } = await sut.executar(produtoCriado.id);

    expect(produto.nome).toEqual("Produto 1");
  });
});
