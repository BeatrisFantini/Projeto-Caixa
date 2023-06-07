Entidades:

Produto {
  nome: string
  preco: float
  unidade: string [ml, g]
  quantidadePorUnidade: int
  descricaoQuantidade: string [porcao, unidade, copo, lata]
  quantidade_disponível: int
  data_desativacao: date | null
  data_criação: date
  data_ultima_alteração: date | null
}

Produto_vendido {
  produto: Produto
  quantidade: int
  precoTotal: float
  id_venda: int | null
}

Venda {
  compras: Produto_vendido[]
  preco_venda: float
  tipoPagamento: string [dinheiro, debito, credito, pix]
  data_cancelamento: date | null
  data_criação: date
}

VendasTotal {
  vendas: Venda[]
  total: float
}

###-----------------------------------------------------------------------------------------------------------------------

#Backend:
##RF:
[] - O sistema deve permitir cadastrar produtos
[] - O sistema deve permitir alterar produtos já cadastrados
[] - O sistema deve permitir desativar produtos cadastrados
[] - O sistema deve permitir uma compra ser feita
[] - O sistema deve permitir calcular todas as vendas feitas
[] - O sistema deve permitir desativar um produto
[] - O sistema deve permitir reativar um produto
[] - O sistema deve permitir calcular o total de compras feitas
[] - O sistema deve permitir buscar os produtos
[] - O sistema deve permitir buscar apenas produtos ativos

##Regras de negócio:
[] - O total de produtos_vendidos deve ser calculado utilizando o valor de todos os produtos que foram comprados na mesma venda
[] - A compra deve verificar se o produto está ativo para poder ser realizada
[] - A venda deve realizar o tipo de pagamento. Caso for pago em dinheiro, deve ser feito o cálculo de: preço_compra - dinheiro_pago
  [] - Caso dinheiro_pago > preço_venda, deve ser retornado o troco
  [] - Caso dinheiro_pago < preço_venda, deve ser retornado o valor faltante
  [] - Caso dinheiro_pago == preço_venda, deve ser retornado 0.00
[] - Deve ser possível cancelar uma venda
[] - Ao fazer uma venda, deve-se adicionar a cada "produto_vendido" o id da venda
//
#[] - Os produtos podem ser cadastrados via planilha do excel com o template descrito no arquivo "template-excel.json"
#[] - Os produtos podem ser alterados via planilha do excel com o template descrito no arquivo "template-excel.json"

##RNF:
[] - O sistema será feito com NodeJS, utilizando express
[] - O banco de dados será um arquivo em excel

###-----------------------------------------------------------------------------------------------------------------------

#Frontend:
##RF:
[] - O sitema deve possuir uma tela para realizar vendas
  [] - Tela deve possuir um campo de seleção dos produtos ativos
  [] - Tela deve possuir um campo de quantidade
  [] - Tela deve possuir um botão de adicionar produto
  [] - Tela deve possuir um botão de finalizar venda

##Regras de negócio:
[] - Ao finalizar uma venda, deve aparecer um modal com botão de confirmação e de cancelar venda
[] - Ao clicar em confirmar venda, deve ser feito o cálculo de troco ou valor faltante, caso seja compra com dinheiro
[] - Ao clicar em cancelar venda, deve ser retornado para a tela de vendas

##RNF:
[] - O sistema será feito com html/css