import express from "express";

import { ProdutoRepositorio } from "./repositorios/produto-repositorio";
import { CriarProdutoCasoDeUso } from "./casos-de-uso/criar-produto";

const app = express();

app.use(express.json());

const produtosRepositorio = new ProdutoRepositorio();
const criarProdutoCasodeUso = new CriarProdutoCasoDeUso(produtosRepositorio);

app.post("/products", async (request, response) => {
  const { descricao, nome, preco } = request.body;

  await criarProdutoCasodeUso.executar({ descricao, nome, preco });

  return response.status(201).json();
});

app.get("/produtos", (request, response) => {
  const produtos = produtosRepositorio.procurarTodos();

  return response.json(produtos);
});

app.get("/produtos/:id", (request, response) => {
  const { id } = request.params;

  const produto = produtosRepositorio.procurarPorId(id);

  return response.json(produto);
});

const porta = 3333;

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}!`);
});
