import { Product } from "../entities/Produto";

export class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute({ cost, name, description }) {
    const newProduct = new Product({
      cost,
      name,
      description,
    });

    await this.productRepository.create(newProduct);

    return { newProduct };
  }
}
