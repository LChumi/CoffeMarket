import {Component, inject, ChangeDetectionStrategy, computed} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {ShoppingCartSidebarComponent} from "@components/shopping-cart-sidebar/shopping-cart-sidebar.component";
import {CarritoService} from "@services/carrito.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgOptimizedImage,
    ShoppingCartSidebarComponent
  ],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [``]
})
export class NavbarComponent {

  private carritoService = inject(CarritoService);
  private readonly carrito = toSignal(inject(CarritoService).carrito$);
  protected readonly cantidadItems = computed(() => this.carrito()?.items.length ?? 0);
  router = inject(Router)
  mobileMenu = false;
  visibleSidebar = false;


  openSidebar() {
    this.visibleSidebar = true;
  }

}
