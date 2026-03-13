import {Component, inject, OnInit} from '@angular/core';
import {PedidoService} from "@services/pedido.service";
import {ToastrService} from "ngx-toastr";
import {Pedido} from "@models/pedido";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductsOrderModalComponent} from "@admin/components/products-order-modal/products-order-modal.component";
import {ItemCarrito} from "@models/dto/item-carrito";

@Component({
  selector: 'app-admin-orders',
  imports: [
    DatePipe,
    CurrencyPipe,
    FormsModule,
    ProductsOrderModalComponent
  ],
  templateUrl: './admin-orders.component.html',
  styles: ``
})
export class AdminOrdersComponent implements OnInit {

  private pedidoService = inject(PedidoService);
  private toastr = inject(ToastrService)

  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  pedidoSelected: Pedido | null = null;
  modalPedido = false;
  docAutorizaqcion: string = "";
  searchOrder: string = "";
  selectedItems: ItemCarrito[] = [];
  showItemsModal: boolean = false;

  ngOnInit() {
    this.getPedidos()
  }

  editarPedido(pedido: Pedido) {
    this.pedidoSelected = pedido;
    this.modalPedido = true;
  }

  cerrarModal() {
    this.modalPedido = false;
    this.docAutorizaqcion = '';
  }

  actualizar() {
    if (this.docAutorizaqcion != "" && this.pedidoSelected) {
      this.pedidoSelected.docAutorizacion = this.docAutorizaqcion.toUpperCase()
      this.pedidoService.update(this.pedidoSelected.id, this.pedidoSelected).subscribe({
        next: data => {
          this.toastr.success(`Se registro la autorizacion al pedido ${data.docNum}`, 'Pedido actualizado');
          this.getPedidos()
        }
      })
    }
  }

  getPedidos() {
    this.pedidoService.getNotFinished().subscribe({
      next: data => {
        this.pedidos = data;
        this.pedidosFiltrados = data
        this.modalPedido = false
      }
    })
  }

  filtrarPedidos() {
    const filtro = this.searchOrder.trim().toLowerCase();
    this.pedidos = this.pedidosFiltrados.filter(p =>
      p.docNum.toLowerCase().includes(filtro)
    )
  }

  openItems(items: ItemCarrito[]){
    this.selectedItems = items;
    this.showItemsModal = true;
  }

  closeModal(){
    this.showItemsModal = false;
    this.selectedItems = []
  }

}
