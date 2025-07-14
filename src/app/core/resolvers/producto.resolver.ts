// src/app/resolvers/producto.resolver.ts
import {inject, Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {DataService} from "@services/data/data.service";
import {Products} from "@models/data/products";

@Injectable({ providedIn: 'root' })
export class ProductoResolver implements Resolve<Products | null> {

  dataService = inject(DataService);

  resolve(route: ActivatedRouteSnapshot): Observable<Products | null> {
    const id = route.paramMap.get('productoId');

    if (!id) return of (null);

    return this.dataService.getProductos().pipe(
      map(productos =>
        productos.find(p => p.sku.toString() === id.toString()) || null
      )
    );

  }
}
