import express from "express";

import { ProductRepository } from "./repositories/product-repository";
import { CreateProduct } from "./use-cases/create-product";

const app = express();

app.use(express.json());

const productsRepository = new ProductRepository();
const createProduct = new CreateProduct(productsRepository);

app.post("/", async (request, response) => {
  const { cost, name, description } = request.body;

  await createProduct.execute({ cost, name, description });

  const products = productsRepository.findAll();

  return response.json(products);
});

app.listen(3333, () => {
  console.log("servidor");
});
