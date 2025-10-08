import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {ItemCarrito} from "@models/dto/item-carrito";
import {CarritoService} from "@services/carrito.service";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-shoping-cart',
  imports: [
    NavbarComponent,
    RouterLinkActive,
    RouterLink
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

}
