export function transformaPreco(preco: number) {
  return preco.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
