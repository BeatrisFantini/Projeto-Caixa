import { VendaRepositorio } from "../repositorios/venda-repositorio";

export class ProcurarTodasVendasCasoDeUso {
  constructor(private vendaRepositorio: VendaRepositorio) {}

  public async executar() {
    return await this.vendaRepositorio.procurarTodas();
  }
}
