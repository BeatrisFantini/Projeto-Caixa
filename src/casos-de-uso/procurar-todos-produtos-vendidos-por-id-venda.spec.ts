import { beforeEach, describe, expect, it } from "vitest";
import { ProdutoVendidoRepositorioEmMemoria } from "../repositorios/em-memoria/produto-vendido-repositorio";
import { ProcurarTodosProdutosVendidosPorIdVendaCasoDeUso } from "./procurar-todos-produtos-vendidos-por-id-venda";
import { ProdutoVendido } from "../entidades/Produto-vendido";
import { Produto } from "../entidades/Produto";

let produtovendidoRepositorio: ProdutoVendidoRepositorioEmMemoria;
let sut: ProcurarTodosProdutosVendidosPorIdVendaCasoDeUso; // System Under Test -> Sistema Sob Teste

describe("Procurar Todos os ProdutoVendidos Caso de Uso", () => {
  beforeEach(() => {
    produtovendidoRepositorio = new ProdutoVendidoRepositorioEmMemoria();
    sut = new ProcurarTodosProdutosVendidosPorIdVendaCasoDeUso(
      produtovendidoRepositorio
    );
  });

  it("deve procurar todos os produtovendidos", async () => {
    await produtovendidoRepositorio.criar(
      new ProdutoVendido({
        idVenda: "1",
        produto: new Produto({
          nome: "ProdutoVendido 1",
          preco: 10,
          descricao: "Descrição",
        }),
        quantidade: 1,
      })
    );

    await produtovendidoRepositorio.criar(
      new ProdutoVendido({
        idVenda: "2",
        produto: new Produto({
          nome: "ProdutoVendido 1",
          preco: 10,
          descricao: "Descrição",
        }),
        quantidade: 1,
      })
    );

    await produtovendidoRepositorio.criar(
      new ProdutoVendido({
        idVenda: "1",
        produto: new Produto({
          nome: "ProdutoVendido 1",
          preco: 10,
          descricao: "Descrição",
        }),
        quantidade: 1,
      })
    );

    const { produtosVendidos } = await sut.executar("1");

    expect(produtosVendidos).toHaveLength(2);
  });
});
