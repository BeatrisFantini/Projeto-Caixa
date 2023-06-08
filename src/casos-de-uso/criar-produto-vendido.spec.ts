import { beforeEach, describe, expect, it } from "vitest";
import { ProdutoVendidoRepositorioEmMemoria } from "../repositorios/em-memoria/produto-vendido-repositorio";
import { CriarProdutoVendidoCasoDeUso } from "./criar-produto-vendido";
import { Produto } from "../entidades/Produto";

let produtoVendidoRepositorio: ProdutoVendidoRepositorioEmMemoria;
let sut: CriarProdutoVendidoCasoDeUso;

describe("Criar Produto Vendido Caso de Uso", () => {
  beforeEach(() => {
    produtoVendidoRepositorio = new ProdutoVendidoRepositorioEmMemoria();
    sut = new CriarProdutoVendidoCasoDeUso(produtoVendidoRepositorio);
  });

  it("deve criar um produto vendido", async () => {
    const produto = new Produto({
      nome: "Produto 1",
      preco: 10,
      descricao: "Descrição do produto 1",
    });

    await sut.executar({
      produto,
      quantidade: 1,
      idVenda: "1",
    });

    expect(produtoVendidoRepositorio.produtosVendidos[0].id).toEqual(
      expect.any(String)
    );
    expect(produtoVendidoRepositorio.produtosVendidos[0].idVenda).toEqual("1");
  });

  it("deve devolver o calculo do preco total", async () => {
    const produto = new Produto({
      nome: "Produto 1",
      preco: 10,
      descricao: "Descrição do produto 1",
    });

    await sut.executar({
      produto,
      quantidade: 2,
      idVenda: "1",
    });

    expect(produtoVendidoRepositorio.produtosVendidos[0].precoTotal).toEqual(
      20
    );
  });
});
