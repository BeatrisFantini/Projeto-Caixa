import { beforeEach, describe, expect, it } from "vitest";
import { AlterarProdutoCasoDeUso } from "./alterar-produto";
import { Produto } from "../entidades/Produto";
import { ProdutoRepositorioEmMemoria } from "../repositorios/em-memoria/produto-repositorio";

let produtoRepositorio: ProdutoRepositorioEmMemoria;
let sut: AlterarProdutoCasoDeUso;

describe("Alterar Produto Caso de Uso", () => {
  beforeEach(() => {
    produtoRepositorio = new ProdutoRepositorioEmMemoria();
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
