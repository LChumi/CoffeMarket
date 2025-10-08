import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {ItemCarrito} from "@models/dto/item-carrito";
import {CarritoService} from "@services/carrito.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CurrencyPipe} from "@angular/common";
import {ProductLoadingComponent} from "@components/product-loading/product-loading.component";

@Component({
  selector: 'app-shoping-cart',
  imports: [
    NavbarComponent,
    RouterLinkActive,
    RouterLink,
    CurrencyPipe,
    ProductLoadingComponent
  ],
  templateUrl: './shoping-cart.component.html',
  styles: ``
})
export default class ShopingCartComponent implements OnInit {

  private carritoService = inject(CarritoService);

  cartItems: ItemCarrito[] = [];

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(carrito => {
      this.cartItems = carrito.items;
    })
  }

  addQuantity(id:string){
    this.carritoService.agregarCantidad(id)
  }

  removeQuantity(id:string){
    this.carritoService.retirarCantidad(id)
  }

  removeProduct(id:string){
    this.carritoService.eliminarProducto(id)
  }

  calcularTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const precio = item.pvp;
      const cantidad = item.cantidad;
      return total + precio * cantidad;
    }, 0);
  }

}
