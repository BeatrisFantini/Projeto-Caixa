import { describe, it, beforeEach, expect } from "vitest";

import { DesativarProdutoCasoDeUso } from "./desativar-produto";

import { Produto } from "../entidades/Produto";
import { ProdutoRepositorioEmMemoria } from "../repositorios/em-memoria/produto-repositorio";

let produtoRepository: ProdutoRepositorioEmMemoria;
let sut: DesativarProdutoCasoDeUso;

describe("Ativar Produto Caso de Uso", () => {
  beforeEach(() => {
    produtoRepository = new ProdutoRepositorioEmMemoria();

    sut = new DesativarProdutoCasoDeUso(produtoRepository);
  });

  it("deve desativar um produto", async () => {
    const novoProduto = new Produto({
      nome: "Nome Produto",
      preco: 10,
      descricao: "Descrição Produto",
    });

    await produtoRepository.criar(novoProduto);

    const { produto } = await sut.executar(novoProduto.id);

    expect(produto.dataDesativacao).toEqual(expect.any(Date));
  });
});
