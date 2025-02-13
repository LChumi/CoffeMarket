import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categorias} from "@models/data/categorias";
import {Products} from "@models/data/products";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private http = inject(HttpClient)

  constructor() { }

  getCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>('data/categorias.json');
  }

  getProductos(): Observable<Products[]> {
    return this.http.get<Products[]>('data/products.json');
  }
}
