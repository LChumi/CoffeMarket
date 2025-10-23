import {Component, inject, OnInit} from '@angular/core';
import {PedidoService} from "@services/pedido.service";
import {ToastrService} from "ngx-toastr";
import {Pedido} from "@models/pedido";
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-admin-orders',
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './admin-orders.component.html',
  styles: ``
})
export class AdminOrdersComponent implements OnInit {

  private pedidoService = inject(PedidoService);
  private toastr = inject(ToastrService)

  pedidos: Pedido[] = [];

  ngOnInit() {
    this.pedidoService.getNotFinished().subscribe({
      next: data => {
        this.pedidos = data;
      }
    })
  }

  editarPedido(pedido: Pedido) {

  }

}
