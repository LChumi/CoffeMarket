import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'public/data/products.json';

  constructor(private http: HttpClient) { }
}
