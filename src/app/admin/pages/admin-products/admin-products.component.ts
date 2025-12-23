import {Component, inject, OnInit} from '@angular/core';
import {ProductoService} from "@services/producto.service";
import {Producto} from "@models/producto";
import {CurrencyPipe} from "@angular/common";
import {getUrlImage} from "@utils/image-util";
import {ProductoModalComponent} from "@admin/components/producto-modal/producto-modal.component";

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

  productos: Producto[] = []
  modalProducto = false;
  modo: 'agregar' | 'editar' = 'agregar'

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
    this.modalProducto = true;
    this.modo = 'agregar';
  }

  protected readonly getUrlImage = getUrlImage;
}
