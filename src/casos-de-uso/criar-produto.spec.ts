import { beforeEach, describe, expect, it } from "vitest";

import { CriarProdutoCasoDeUso } from "./criar-produto";
import { ProdutoRepositorioEmMemoria } from "../repositorios/em-memoria/produto-repositorio";

let produtoRepositorio: ProdutoRepositorioEmMemoria;
let sut: CriarProdutoCasoDeUso; // System Under Test -> Sistema Sob Teste

describe("Criar Produto Caso de Uso", () => {
  beforeEach(() => {
    produtoRepositorio = new ProdutoRepositorioEmMemoria();

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
