import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ProductoService} from "@services/producto.service";
import {Producto} from "@models/producto";
import {CurrencyPipe} from "@angular/common";
import {getUrlImage} from "@utils/image-util";
import {ProductoModalComponent} from "@admin/components/producto-modal/producto-modal.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-admin-products',
  imports: [
    CurrencyPipe,
    ProductoModalComponent
  ],
  templateUrl: './admin-products.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export class AdminProductsComponent implements OnInit {

  private productsService = inject(ProductoService)
  private toastr = inject(MessageService);

  productos: Producto[] = []
  modalProducto = false;
  modo: 'agregar' | 'editar' = 'agregar'
  idProducto = ''
  removeIndex: number | null = null;

  ngOnInit() {
    this.getProductos()
  }

  getProductos() {
    this.productsService.getAll().subscribe({
      next: data => {
        this.productos = data
      }
    })
  }

  abrirModal() {
    this.idProducto = ''
    this.modalProducto = true;
    this.modo = 'agregar';
  }

  abrirModalProducto(producto: Producto) {
    this.modalProducto = true;
    this.modo = 'editar';
    this.idProducto = producto.id;
  }

  deleteProduct(producto: Producto) {
    this.productsService.delete(producto.id).subscribe({
      next: () => {
        this.toastr.add({ severity: 'info', summary: 'Info', detail: 'Producto elminado'})
        this.getProductos()
      }
    })
  }

  handleSaveRequest(event: {editUpdate: boolean}) {
    if (event.editUpdate) {
      this.idProducto = ''
      this.getProductos()
    }
  }

  protected readonly getUrlImage = getUrlImage;
}
