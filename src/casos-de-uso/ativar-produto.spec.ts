import { describe, it, beforeEach, expect } from "vitest";

import { AtivarProdutoCasoDeUso } from "./ativar-produto";
import { Produto } from "../entidades/Produto";
import { ProdutoRepositorioEmMemoria } from "../repositorios/em-memoria/produto-repositorio";

let produtoRepositorio: ProdutoRepositorioEmMemoria;
let sut: AtivarProdutoCasoDeUso; // System Under Test -> Sistema Sob Teste

describe("Ativar Produto Caso de Uso", () => {
  beforeEach(() => {
    produtoRepositorio = new ProdutoRepositorioEmMemoria();

    sut = new AtivarProdutoCasoDeUso(produtoRepositorio);
  });

  it("deve ativar um produto", async () => {
    const novoProduto = new Produto({
      nome: "Nome Produto",
      preco: 10,
      descricao: "Descrição Produto",
      dataDesativacao: new Date(),
    });

    await produtoRepositorio.criar(novoProduto);

    await sut.executar(novoProduto.id);

    expect(produtoRepositorio.produtos[0].dataDesativacao).toBe(null);
  });
});
