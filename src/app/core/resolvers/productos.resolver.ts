import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Products} from "@models/data/products";
import {DataService} from "@services/data/data.service";
import {map, Observable, of} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductosResolver implements Resolve<Products[]> {
  dataService = inject(DataService);

  resolve(route: ActivatedRouteSnapshot): Observable<Products[]> {
    const categoryId = route.paramMap.get('categoryId');
    if (!categoryId) return of([]);

    return this.dataService.getProductos().pipe(
      map((productos: Products[]) =>
        productos.filter(p => p.categoria_id?.toString() === categoryId.toString())
      )
    );
  }
}
