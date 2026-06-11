import { Pipe, PipeTransform } from '@angular/core';
import {Pedido} from "@models/pedido";

@Pipe({
  name: 'estadoCount'
})
export class EstadoCountPipe implements PipeTransform {

  transform(pedidos: Pedido[] | null | undefined, estado: boolean): number {
    if (!pedidos) {
      return 0;
    }

    return pedidos.filter((p) => p.estado === estado).length;
  }
}
