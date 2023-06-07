import { describe, it, beforeEach, expect } from "vitest";

import { ProdutoRepositorio } from "../repositorios/produto-repositorio";
import { Produto } from "./Produto";

let produtoRepositorio: ProdutoRepositorio;

describe("Produto", () => {
  beforeEach(() => {
    produtoRepositorio = new ProdutoRepositorio();
  });

  it("deve ativar um produto", async () => {
    const produto = new Produto({
      nome: "Nome Produto",
      preco: 10,
      descricao: "Descrição Produto",
    });

    produtoRepositorio.procurarPorId(produto.id);

    produto.ativar();

    expect(produto.dataDesativacao).toBe(null);
  });

  it("deve desativar um produto", async () => {
    const produto = new Produto({
      nome: "Nome Produto",
      preco: 10,
      descricao: "Descrição Produto",
    });

    produtoRepositorio.procurarPorId(produto.id);

    produto.desativar();

    expect(produto.dataDesativacao).toEqual(expect.any(Date));
  });
});
