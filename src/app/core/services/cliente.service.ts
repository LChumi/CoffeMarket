import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "@models/cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl= environment.apiUrl + 'cliente';
  private http = inject(HttpClient)

  constructor() { }

  save(pedido: Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${this.baseUrl}/save`, pedido);
  }

  getById(id: string):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.baseUrl}/by/${id}`);
  }

  getByEmail(email: string):Observable<Cliente>{
    const params = new HttpParams().set('email', email);
    return this.http.get<Cliente>(`${this.baseUrl}/by/email`);
  }

  getAll():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.baseUrl}/get/all`);
  }

  update(id: string, pedido: Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.baseUrl}/update/${id}`, pedido);
  }
}
