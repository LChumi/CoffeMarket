import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "@models/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl= environment.apiUrl + 'producto';
  private http = inject(HttpClient)

  constructor() { }

  save(pedido: Producto):Observable<Producto>{
    return this.http.post<Producto>(`${this.baseUrl}/save`, pedido);
  }

  getById(id: string):Observable<Producto>{
    return this.http.get<Producto>(`${this.baseUrl}/by/${id}`);
  }

  getBySku(sku: string):Observable<Producto>{
    return this.http.get<Producto>(`${this.baseUrl}/sku/${sku}`);
  }

  getAll():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.baseUrl}/get/all`);
  }

  getAllByCategory(category: string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.baseUrl}/get/category/${category}`);
  }

  update(id: string, pedido: Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.baseUrl}/update/${id}`, pedido);
  }
}
