import { randomUUID } from "node:crypto";

export class Product {
  constructor({
    name,
    cost,
    description,
    deactivatedAt,
    createdAt,
    updatedAt,
  }) {
    this.id = randomUUID();
    this.name = name;
    this.cost = cost;
    this.description = description;
    this.deactivatedAt = deactivatedAt;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt;
  }

  deactivate() {
    this.deactivatedAt = new Date();
  }

  activate() {
    this.deactivatedAt = null;
  }
}
