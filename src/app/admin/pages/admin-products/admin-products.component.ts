import {Component, inject, OnInit} from '@angular/core';
import {ProductoService} from "@services/producto.service";
import {Producto} from "@models/producto";
import {CurrencyPipe} from "@angular/common";
import {getUrlImage} from "@utils/image-util";

@Component({
  selector: 'app-admin-products',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './admin-products.component.html',
  styles: ``
})
export class AdminProductsComponent implements OnInit {

  private productsService = inject(ProductoService)

  productos: Producto[] = []

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

  protected readonly getUrlImage = getUrlImage;
}
