import {Component, inject, OnInit} from '@angular/core';
import {PedidoService} from "@services/pedido.service";
import {ToastrService} from "ngx-toastr";
import {Pedido} from "@models/pedido";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-orders',
  imports: [
    DatePipe,
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './admin-orders.component.html',
  styles: ``
})
export class AdminOrdersComponent implements OnInit {

  private pedidoService = inject(PedidoService);
  private toastr = inject(ToastrService)

  pedidos: Pedido[] = [];
  pedidoSelected: Pedido | null = null;
  modalPedido = false;
  docAutorizaqcion : string = "";

  ngOnInit() {
    this.getPedidos()
  }

  editarPedido(pedido: Pedido) {
    this.pedidoSelected = pedido;
    this.modalPedido = true;
  }

  cerrarModal(){
    this.modalPedido = false;
    this.docAutorizaqcion = '';
  }

  actualizar(){
    if (this.docAutorizaqcion != "" && this.pedidoSelected){
      this.pedidoSelected.docAutorizacion = this.docAutorizaqcion.toUpperCase()
      this.pedidoService.update(this.pedidoSelected.id, this.pedidoSelected).subscribe({
        next: data => {
          this.toastr.success(`Se registro la autorizacion al pedido ${data.docNum}`, 'Pedido actualizado');
          this.getPedidos()
        }
      })
    }
  }

  getPedidos(){
    this.pedidoService.getNotFinished().subscribe({
      next: data => {
        this.pedidos = data;
        this.modalPedido = false
      }
    })
  }

}
