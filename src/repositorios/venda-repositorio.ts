import { Venda } from "../entidades/Venda";

export interface VendaRepositorio {
  criar(venda: Venda): Promise<void>;
  procurarTodas(): Promise<Venda[]>;
}
