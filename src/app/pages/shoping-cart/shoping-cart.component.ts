import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {ItemCarrito} from "@models/dto/item-carrito";
import {CarritoService} from "@services/carrito.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CurrencyPipe} from "@angular/common";
import {ProductLoadingComponent} from "@components/product-loading/product-loading.component";
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "../../../environments/environment";
import {MetaService} from "@services/seo/meta.service";

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

  private domain = environment.domain;

  constructor(
    private router: Router,
    private schemaService: SchemaService,
    private seoService: MetaService,
    private carritoService : CarritoService,
  ) {}

  cartItems: ItemCarrito[] = [];

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;

    this.carritoService.carrito$.subscribe(carrito => {
      this.cartItems = carrito.items;
    })
    const title ='Carrito Compras | Bunna Accesorios para Café'
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
      'Bunna Shop inicio',
      description);
    this.schemaService.injectSchema(schema, 'ContentPage');
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
