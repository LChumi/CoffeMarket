import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass} from "@angular/common";
import {ShoppingCartSidebarComponent} from "@components/shopping-cart-sidebar/shopping-cart-sidebar.component";
import {CarritoService} from "@services/carrito.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    ShoppingCartSidebarComponent
  ],
  templateUrl: './navbar.component.html',
  styles: [`
    .active-link {
      text-decoration: underline;
      color: #c4b89b;
      transition: color 0.3s ease, text-decoration 0.3s ease;
    }

    svg-shop {
      color: #c4b89b;
      transition: color 0.3s ease;
    }

  `]
})
export class NavbarComponent {

  private carritoService = inject(CarritoService);
  router = inject(Router)
  mobileMenu = false;
  visibleSidebar = false;
  cantidadItems = 0;

  constructor() {
    this.carritoService.carrito$.subscribe(carrito => {
      this.cantidadItems = carrito.items?.length || 0;
    })
  }

}
