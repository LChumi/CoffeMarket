import {inject} from "@angular/core";
import {catchError, of} from "rxjs";
import {ResolveFn} from "@angular/router";
import {ProductoService} from "@services/producto.service";
import {Producto} from "@models/producto";

export const productosCategoryResolver: ResolveFn<Producto[]> = (route, state) => {
  const productoService = inject(ProductoService);
  const categoryId = route.paramMap.get('categoryId');
  return categoryId ? productoService.getAllByCategory(categoryId) : of([]);
};
