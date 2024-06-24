import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'public/data/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.productsUrl)
  }
}
