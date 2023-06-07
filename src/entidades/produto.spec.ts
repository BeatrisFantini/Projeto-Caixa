import { describe, it, beforeEach, expect } from "vitest";

import { Produto } from "./Produto";
import { ProdutoRepositorioEmMemoria } from "../repositorios/em-memoria/produto-repositorio";

let produtoRepositorio: ProdutoRepositorioEmMemoria;

describe("Produto", () => {
  beforeEach(() => {
    produtoRepositorio = new ProdutoRepositorioEmMemoria();
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
