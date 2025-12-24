import {Component, inject, OnInit} from '@angular/core';
import {ProductoService} from "@services/producto.service";
import {Producto} from "@models/producto";
import {CurrencyPipe} from "@angular/common";
import {getUrlImage} from "@utils/image-util";
import {ProductoModalComponent} from "@admin/components/producto-modal/producto-modal.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-products',
  imports: [
    CurrencyPipe,
    ProductoModalComponent
  ],
  templateUrl: './admin-products.component.html',
  styles: ``
})
export class AdminProductsComponent implements OnInit {

  private productsService = inject(ProductoService)
  private toastr = inject(ToastrService);

  productos: Producto[] = []
  modalProducto = false;
  modo: 'agregar' | 'editar' = 'agregar'
  idProducto = ''
  removeAction = false;
  removeIndex: number | null = null;

  ngOnInit() {
    this.getProductos()
  }

  getProductos() {
    this.productsService.getAll().subscribe({
      next: data => {
        console.log(data);
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
      next: data => {
        this.toastr.success('Producto elminado');
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
