import { beforeEach, describe, expect, it } from "vitest";

import { ProdutoRepositorio } from "../repositorios/produto-repositorio";
import { CriarProdutoCasoDeUso } from "./criar-produto";

let produtoRepositorio: ProdutoRepositorio;
let sut: CriarProdutoCasoDeUso; // System Under Test -> Sistema Sob Teste

describe("Criar Produto Caso de Uso", () => {
  beforeEach(() => {
    produtoRepositorio = new ProdutoRepositorio();

    sut = new CriarProdutoCasoDeUso(produtoRepositorio);
  });

  it("deve criar um produto", async () => {
    const produto = {
      nome: "Nome Produto",
      preco: 10,
      descricao: "Descrição Produto",
    };

    const { novoProduto } = await sut.executar(produto);

    expect(novoProduto.id).toEqual(expect.any(String));
  });
});
