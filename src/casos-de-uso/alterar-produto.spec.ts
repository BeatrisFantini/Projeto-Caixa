import { beforeEach, describe, expect, it } from "vitest";
import { AlterarProdutoCasoDeUso } from "./alterar-produto";
import { ProdutoRepositorio } from "../repositorios/produto-repositorio";
import { Produto } from "../entidades/Produto";

let produtoRepositorio: ProdutoRepositorio;
let sut: AlterarProdutoCasoDeUso;

describe("Alterar Produto Caso de Uso", () => {
  beforeEach(() => {
    produtoRepositorio = new ProdutoRepositorio();
    sut = new AlterarProdutoCasoDeUso(produtoRepositorio);
  });

  it("deve alterar o produto", async () => {
    const novoProduto = new Produto({
      nome: "Produto",
      preco: 10,
      descricao: "Descrição",
    });

    await produtoRepositorio.criar(novoProduto);

    await sut.executar({
      id: novoProduto.id,
      nome: "Produto Alterado",
    });

    expect(produtoRepositorio.produtos[0].nome).toBe("Produto Alterado");
  });
});
