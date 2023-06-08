import { describe, expect, it } from "vitest";

import { ProdutoVendido } from "./Produto-vendido";
import { Produto } from "./Produto";

describe("Produto Vendido", () => {
  it("deve ser possível criar um novo produto vendido", () => {
    const produto = new Produto({
      nome: "Produto 1",
      preco: 10,
      descricao: "Descrição do produto 1",
    });

    const novoProdutoVendido = new ProdutoVendido({
      idVenda: "1",
      produto,
      quantidade: 10,
    });

    expect(novoProdutoVendido.id).toEqual(expect.any(String));
  });
});
