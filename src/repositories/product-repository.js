export class ProductRepository {
  constructor() {
    this.products = [];
  }

  findAll() {
    return this.products;
  }

  fetchById(id) {
    return this.products.find((product) => product.id == id);
  }

  create(product) {
    this.products.push(product);
  }

  save(id, product) {
    const index = this.products.findIndex((product) => product.id == id);

    this.products[index] = product;
  }

  //   delete(id) {
  //       const index = this.products.findIndex(product => product.id == id);

  //       this.products.splice(index, 1);
  //   }
}
