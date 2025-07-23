// src/app/resolvers/producto.resolver.ts
import {inject, Injectable, makeStateKey, TransferState} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {map, Observable, of, tap} from 'rxjs';
import {DataService} from "@services/data/data.service";
import {Products} from "@models/data/products";

@Injectable({ providedIn: 'root' })
export class ProductoResolver implements Resolve<Products | null> {

  dataService = inject(DataService);
  transferState = inject(TransferState);

  resolve(route: ActivatedRouteSnapshot): Observable<Products | null> {
    const id = route.paramMap.get('productoId');
    if (!id) return of(null);

    const PRODUCT_KEY = makeStateKey<Products | null>('producto-' + id);

    const saved = this.transferState.get<Products | null>(PRODUCT_KEY, null);
    if (saved) {
      return of(saved);
    }

    return this.dataService.getProductos().pipe(
      map(productos => productos.find(p => p.sku.toString() === id.toString()) || null),
      tap(producto => {
        if (producto) {
          this.transferState.set(PRODUCT_KEY, producto);
        }
      })
    );
  }
}
