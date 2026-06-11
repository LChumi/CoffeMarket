import {Component, inject, OnInit} from '@angular/core';
import {PedidoService} from "@services/pedido.service";
import {ToastrService} from "ngx-toastr";
import {Pedido} from "@models/pedido";
import {DatePipe, DecimalPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductsOrderModalComponent} from "@admin/components/products-order-modal/products-order-modal.component";
import {ItemCarrito} from "@models/dto/item-carrito";
import {finalize} from "rxjs";
import {EstadoCountPipe} from "@shared/pipes/estado-count.pipe";

@Component({
  selector: 'app-admin-orders',
  imports: [
    DatePipe,
    FormsModule,
    ProductsOrderModalComponent,
    EstadoCountPipe,
    DecimalPipe
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
  docAutorizaqcion: string = "";
  searchOrder: string = "";
  selectedItems: ItemCarrito[] = [];
  showItemsModal: boolean = false;
  isSaving = false;
  // Filtros y tabs
  activeTab: 'todos' | 'pendientes' | 'finalizados'  | 'expirados' = 'todos';

  tabs = [
    { label: 'Todos', value: 'todos' },
    { label: 'Pendientes', value: 'pendientes' },
    { label: 'Finalizados', value: 'finalizados' },
    { label: 'Expirados', value: 'expirados' },
  ] as const;

  ngOnInit() {
    this.getPedidos();
  }

  get pedidosFiltrados(): Pedido[] {
    return this.pedidos.filter((p) => {
      const matchTab =
        this.activeTab === 'todos'
          ? true
          : this.activeTab === 'finalizados'
            ? p.estado === true
            : p.estado === false;

      const q = this.searchOrder.toLowerCase();
      const matchSearch =
        !q || p.docNum?.toString().includes(q) || p.clienteId?.toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }

  getPedidos() {
    this.pedidoService.getAll().subscribe({
      next: (data) => {
        this.pedidos = data;
      },
    });
  }

  editarPedido(pedido: Pedido) {
    this.pedidoSelected = { ...pedido };
    this.docAutorizaqcion = pedido.docAutorizacion;
    if (!this.pedidoSelected.metodoPago) {
      this.pedidoSelected.metodoPago = 'Efectivo'; // valor por defecto
    }
    this.modalPedido = true;
  }

  verItems(pedido: Pedido) {
    this.selectedItems = pedido.items;
    this.showItemsModal = true;
  }

  guardarPedido() {
    if (!this.pedidoSelected) return;
    this.isSaving = true;

    const payload = {
      ...this.pedidoSelected,
      docAutorizacion: this.docAutorizaqcion,
    };

    this.pedidoService
      .update(this.pedidoSelected.id, payload)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: (value) => {
          const idx = this.pedidos.findIndex((p) => p.id === value.id);
          if (idx !== -1) this.pedidos[idx] = value; // usar el objeto real del backend
          this.modalPedido = false;
          this.toastr.success('Pedido actualizado');
        },
        error: () => this.toastr.error('No se pudo guardar'),
      });
  }

  closeModal() {
    this.showItemsModal = false;
    this.selectedItems = [];
  }
}
