import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {catchError, of} from 'rxjs';
import {Producto} from "@models/producto";
import {ProductoService} from "@services/producto.service";

export const productoResolver: ResolveFn<Producto | null> = (route, state) => {
  const productoService = inject(ProductoService);
  const id = route.paramMap.get('productoId');
  return id ? productoService.getById(id).pipe(
    catchError(() => of(null))
  ) : of(null);
};
