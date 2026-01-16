import {ResolveFn} from "@angular/router";
import {Producto} from "@models/producto";
import {inject} from "@angular/core";
import {ProductoService} from "@services/producto.service";
import {catchError, of} from "rxjs";

export const productosResolver: ResolveFn<Producto[]> = (route, state) => {
  const productoService = inject(ProductoService);
  return productoService.getAll().pipe(
    catchError(() => of([]))
  );
};
