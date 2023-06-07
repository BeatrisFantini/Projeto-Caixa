import { beforeEach, describe, expect, it } from "vitest";

import { ProdutoRepositorio } from "../repositorios/produto-repositorio";
import { Produto } from "../entidades/Produto";
import { ProcurarTodosProdutosCasoDeUso } from "./procurar-todos-produtos";

let produtoRepositorio: ProdutoRepositorio;
let sut: ProcurarTodosProdutosCasoDeUso; // System Under Test -> Sistema Sob Teste

describe("Procurar Todos os Produtos Caso de Uso", () => {
  beforeEach(() => {
    produtoRepositorio = new ProdutoRepositorio();
    sut = new ProcurarTodosProdutosCasoDeUso(produtoRepositorio);
  });

  it("deve procurar todos os produtos", async () => {
    await produtoRepositorio.criar(
      new Produto({
        nome: "Produto 1",
        preco: 10,
        descricao: "Descrição",
      })
    );

    await produtoRepositorio.criar(
      new Produto({
        nome: "Produto 2",
        preco: 10,
        descricao: "Descrição",
      })
    );

    const { produtos } = await sut.executar();

    expect(produtos).toHaveLength(2);
  });
});
