import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "@models/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = environment.apiUrl + 'usuario';
  private http = inject(HttpClient);

  constructor() { }

  save(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.baseUrl}/save`, usuario, {withCredentials: true});
  }

  getById(id: string):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/by/${id}`, {withCredentials: true});
  }

  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}/get/all`, {withCredentials: true});
  }

  update(id: string, pedido: Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.baseUrl}/update/${id}`, pedido, {withCredentials: true});
  }

  delete(id: string):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {withCredentials: true});
  }

}
