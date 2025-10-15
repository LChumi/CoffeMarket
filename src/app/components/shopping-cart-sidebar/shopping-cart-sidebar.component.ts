import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {CurrencyPipe, NgClass} from "@angular/common";
import {ItemCarrito} from "@models/dto/item-carrito";
import {CarritoService} from "@services/carrito.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart-sidebar',
  imports: [
    NgClass,
    CurrencyPipe,
  ],
  templateUrl: './shopping-cart-sidebar.component.html',
  standalone: true,
  styles: ``
})
export class ShoppingCartSidebarComponent implements OnInit {

  private _visible = false;
  private carritoService = inject(CarritoService);
  private router = inject(Router);

  cartItems: ItemCarrito[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() set visible(val: boolean) {
    this._visible = val;
  }

  get visible(): boolean{
    return this._visible;
  }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(carrito => {
      this.cartItems = carrito.items;
    })
  }

  closeSidebar() {
    this._visible = false;
    this.visibleChange.emit(false);
  }

  calcularTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const precio = item.pvp;
      const cantidad = item.cantidad;
      return total + precio * cantidad;
    }, 0);
  }

  eliminarDelCarrito(id: string) {
    this.carritoService.eliminarProducto(id)
  }

  goToCart() {
    this.router.navigate(['/cart']).then(r => {
    })
  }

  goToCheckOut() {
    this.router.navigate(['/checkout']).then(r => {})
  }

}
