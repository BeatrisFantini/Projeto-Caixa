import xl from "excel4node";
import { Venda } from "../entidades/Venda";
import { VendaMapeamento } from "../mapeamentos/venda-mapeamento";

export class Excel {
  read() {}

  write(vendas: Venda[]) {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Sheet 1");

    const colunas = VendaMapeamento.paraExcel(vendas).colunas;
    const linhas = VendaMapeamento.paraExcel(vendas).linhas;

    for (let i = 0; i < colunas.length; i++) {
      ws.cell(1, i + 1).string(colunas[i]);
    }

    for (let i = 0; i < linhas.length; i++) {
      for (let j = 0; j < linhas[i].length; j++) {
        ws.cell(i + 2, j + 1).string(linhas[i][j]);
      }
    }

    wb.write("Excel.xlsx");
  }
}
