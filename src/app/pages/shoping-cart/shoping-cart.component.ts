import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {ItemCarrito} from "@models/dto/item-carrito";
import {CarritoService} from "@services/carrito.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CurrencyPipe} from "@angular/common";
import {ProductLoadingComponent} from "@components/product-loading/product-loading.component";
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "@environments/environment";
import {MetaService} from "@services/seo/meta.service";
import {FooterComponent} from "@shared/footer/footer.component";
import {getUrlImage} from "@utils/image-util";
import {ClarityService} from "@services/data/clarity.service";

@Component({
  selector: 'app-shoping-cart',
  imports: [
    NavbarComponent,
    RouterLinkActive,
    RouterLink,
    CurrencyPipe,
    ProductLoadingComponent,
    FooterComponent
  ],
  templateUrl: './shoping-cart.component.html',
  styles: ``
})
export default class ShopingCartComponent implements OnInit {

  private domain = environment.domain;
  private clarity = inject(ClarityService);

  constructor(
    private router: Router,
    private schemaService: SchemaService,
    private seoService: MetaService,
    private carritoService: CarritoService,
  ) {
    const currentUrl = `${this.domain}${this.router.url}`;
    const title = 'Carrito Compras | Bunna Accesorios para Café'
    const description = 'Consulta tus productos en nuestro carrito de compras'
    this.seoService.updateMetaTags({
      title,
      description,
      canonicalUrl: currentUrl,
      og: {
        title,
        description,
        url: currentUrl,
        image: `${this.domain}/images/logos/bunnaCirc.webp`
      }
    });

    const schema = this.schemaService.generateContentPageSchema(
      currentUrl,
      'Carrito de compras',
      description);
    this.schemaService.injectSchema(schema, 'ContentPage');
  }

  cartItems: ItemCarrito[] = [];

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(carrito => {
      this.cartItems = carrito.items;
      this.clarity.event('Carrito abierto');
      this.clarity.setTag('cartItems', carrito.items.length.toString());
      this.clarity.setTag('cartValue', this.calcularTotal().toString());
      this.clarity.setTag('cartStatus', carrito.items.length > 0 ? 'con_productos' : 'vacío');
    })
  }

  addQuantity(id: string) {
    this.carritoService.agregarCantidad(id)
    this.clarity.event('Cantidad aumentada');
    this.clarity.setTag('cartItems', this.cartItems.length.toString());
    this.clarity.setTag('cartValue', this.calcularTotal().toString());
  }

  removeQuantity(id: string) {
    this.carritoService.retirarCantidad(id)
    this.clarity.event('Cantidad reducida');
    this.clarity.setTag('cartItems', this.cartItems.length.toString());
    this.clarity.setTag('cartValue', this.calcularTotal().toString());
  }

  removeProduct(id: string) {
    this.carritoService.eliminarProducto(id)
    this.clarity.event('Producto eliminado del carrito');
    this.clarity.setTag('cartItems', this.cartItems.length.toString());
    this.clarity.setTag('cartValue', this.calcularTotal().toString());
  }

  calcularTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const precio = item.pvp;
      const cantidad = item.cantidad;
      return total + precio * cantidad;
    }, 0);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']).then(r => {
      this.clarity.event('Ir a checkout');
      this.clarity.setTag('cartValue', this.calcularTotal().toString());
      this.clarity.setTag('cartStatus', this.cartItems.length > 0 ? 'con_productos' : 'vacío');
      this.clarity.setTag('cartItems', this.cartItems.length.toString());

      if (this.calcularTotal() > 100) {
        this.clarity.prioritize('Carrito de alto valor');
      }
    });
  }

  protected readonly getUrlImage = getUrlImage;
}
