import { Venda } from "../../entidades/Venda";

export class VendaRepositorioEmMemoria {
  public vendas: Venda[] = [];

  public async criar(venda: Venda): Promise<void> {
    this.vendas.push(venda);
  }

  public async procurarTodas(): Promise<Venda[]> {
    return this.vendas;
  }
}
