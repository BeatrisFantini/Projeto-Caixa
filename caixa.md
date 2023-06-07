Entidades:

Produto {
nome: string
preco: float
unidade: string [ml, g]
quantidadePorUnidade: int
descricaoQuantidade: string [porcao, unidade, copo, lata]
ativo: boolean
}

Compra {
produto: Produto
quantidade: int
precoTotal: float
}

Venda {
  compras: Compra[]
  total: float
  tipoPagamento: string [dinheiro, debito, credito, pix]
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
[] - O total de compras deve ser calculado utilizando o valor de todas as compras feitas
[] - Os produtos podem ser cadastrados via planilha do excel com o template descrito no arquivo "template-excel.json"
[] - Os produtos podem ser alterados via planilha do excel com o template descrito no arquivo "template-excel.json"
[] - A compra deve verificar se o produto está ativo para poder ser realizada
[] - A compra deve realizar o tipo de pagamento. Caso for pago em dinheiro, deve ser feito o cálculo de: preço_compra - dinheiro_pago
  [] - Caso dinheiro_pago > preço_compra, deve ser retornado o troco
  [] - Caso dinheiro_pago < preço_compra, deve ser retornado o valor faltante
  [] - Caso dinheiro_pago == preço_compra, deve ser retornado sucesso

##RNF:
[] - O sistema será feito com NodeJS, utilizando express
[] - O banco de dados será um arquivo em excel

###-----------------------------------------------------------------------------------------------------------------------

#Frontend:
##RF:
[] - O sistema deve possuir uma tela de dashboard
  [] - dashboard deve possuir tela de produtos - [listagem, edição, desativação, cadastro]
  [] - dashboard deve possuir tela de compras - [cadastro, listagem]
[] - O sitema deve possuir uma tela para realizar compras
  [] - Tela deve possuir um campo de busca de produtos ativos
  [] - Tela deve possuir um campo de quantidade
  [] - Tela deve possuir um botão de adicionar produto
  [] - Tela deve possuir um botão de finalizar compra

##Regras de negócio:
[] - Ao finalizar uma compra, deve aparecer um modal com as informações da compra e botão de confirmação/cancelar compra
[] - Ao clicar em confirmar compra, deve ser feito o cálculo de troco ou valor faltante, caso seja compra com dinheiro
[] - Ao clicar em cancelar compra, deve ser retornado para a tela de vendas

##RNF:
[] - O sistema será feito com html/css