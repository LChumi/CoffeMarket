import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {PedidoService} from "@services/pedido.service";
import {Pedido} from "@models/pedido";
import {catchError, of} from "rxjs";

export const pedidoResolver: ResolveFn<Pedido | null> = (route, state) => {
  const pedidoService = inject(PedidoService);
  const id = route.paramMap.get('orderId');
  console.log(id)
  return id ? pedidoService.getByDocNum(id).pipe(
    catchError(() => of(null)) // si el servicio falla, devuelve null
  ) : of(null);
};
