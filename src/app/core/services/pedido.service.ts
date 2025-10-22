import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Pedido} from "@models/pedido";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl= environment.apiUrl + 'pedido';
  private http = inject(HttpClient)

  constructor() { }

  save(pedido: Pedido):Observable<Pedido>{
    return this.http.post<Pedido>(`${this.baseUrl}/save`, pedido, {withCredentials: true});
  }

  sendMail(docNum: string):Observable<void>{
    return this.http.get<void>(`${this.baseUrl}/send_mail/${docNum}`);
  }

  getById(id: string):Observable<Pedido>{
    return this.http.get<Pedido>(`${this.baseUrl}/by/${id}`);
  }

  getByDocNum(doc: string):Observable<Pedido>{
    return this.http.get<Pedido>(`${this.baseUrl}/by/${doc}/doc`);
  }

  getAll():Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.baseUrl}/get/all`);
  }

  getNotFinished():Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.baseUrl}/get/not-finished`)
  }

  update(id: string, pedido: Pedido):Observable<Pedido>{
    return this.http.put<Pedido>(`${this.baseUrl}/update/${id}`, pedido, {withCredentials: true});
  }
}
