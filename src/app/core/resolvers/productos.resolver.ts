import {ResolveFn} from "@angular/router";
import {Producto} from "@models/producto";
import {inject} from "@angular/core";
import {ProductoService} from "@services/producto.service";

export const productosResolver: ResolveFn<Producto[]> = (route, state) => {
  const productoService = inject(ProductoService);
  return productoService.getAll();
};
