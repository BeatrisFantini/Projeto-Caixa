import express from "express";
import fs from "node:fs";

import { CriarProdutoCasoDeUso } from "./casos-de-uso/criar-produto";
import { ProdutoRepositorioEmMemoria } from "./repositorios/em-memoria/produto-repositorio";
import { ProcurarTodosProdutosCasoDeUso } from "./casos-de-uso/procurar-todos-produtos";
import { VendaRepositorioEmMemoria } from "./repositorios/em-memoria/venda-repositorio";
import { CriarVendaCasoDeUso } from "./casos-de-uso/criar-venda";
import { ProdutoVendidoRepositorioEmMemoria } from "./repositorios/em-memoria/produto-vendido-repositorio";
import { CriarProdutoVendidoCasoDeUso } from "./casos-de-uso/criar-produto-vendido";
import { Excel } from "./lib/excel";
import { VendaMapeamento } from "./mapeamentos/venda-mapeamento";

const app = express();

app.use(express.json());

const produtosRepositorio = new ProdutoRepositorioEmMemoria();
const criarProdutoCasodeUso = new CriarProdutoCasoDeUso(produtosRepositorio);
const procurarTodosProdutosCasoDeUso = new ProcurarTodosProdutosCasoDeUso(
  produtosRepositorio
);

const produtoVendidoRepositorio = new ProdutoVendidoRepositorioEmMemoria();
const criarProdutoVendidoCasoDeUso = new CriarProdutoVendidoCasoDeUso(
  produtoVendidoRepositorio
);

const vendaRepositorio = new VendaRepositorioEmMemoria();
const criarVendaCasoDeUso = new CriarVendaCasoDeUso(
  vendaRepositorio,
  produtosRepositorio,
  criarProdutoVendidoCasoDeUso
);

app.post("/produtos", async (request, response) => {
  const { descricao, nome, preco } = request.body;

  await criarProdutoCasodeUso.executar({ descricao, nome, preco });

  return response.status(201).json();
});

app.get("/produtos", async (request, response) => {
  const produtos = await procurarTodosProdutosCasoDeUso.executar();

  return response.json(produtos);
});

app.post("/vendas", (request, response) => {
  const { items, tipoPagamento } = request.body;

  criarVendaCasoDeUso.executar({
    items,
    tipoPagamento,
  });

  return response.status(201).json();
});

app.get("/vendas", async (request, response) => {
  const vendas = await vendaRepositorio.procurarTodas();

  if (request.headers["user-agent"]?.includes("insomnia")) {
    return response.json({
      vendas: VendaMapeamento.paraHttp(vendas),
    });
  }

  new Excel().write(vendas);

  const excel = fs.readFileSync("Excel.xlsx");

  if (!excel) {
    return response.status(500).json({ error: "Erro ao gerar relatório" });
  }

  return response.attachment("Excel.xlsx").send(excel);
});

const porta = 3333;

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}!`);
});
