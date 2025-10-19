import {Component, inject, OnInit, TransferState} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {DataService} from "@services/data/data.service";
import {Products} from "@models/data/products";
import {ActivatedRoute, Router} from "@angular/router";
import {ConsentService} from "@services/seo/consent.service";
import {environment} from "../../../environments/environment";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";
import {CarritoService} from "@services/carrito.service";
import {ShoppingCartSidebarComponent} from "@components/shopping-cart-sidebar/shopping-cart-sidebar.component";
import {FooterComponent} from "@shared/footer/footer.component";

declare var gtag: (...args: any[]) => void;

@Component({
  selector: 'app-single-product',
  imports: [
    NavbarComponent,
    ShoppingCartSidebarComponent,
    FooterComponent
  ],
  templateUrl: './single-product.component.html',
  standalone: true,
  styles: ``
})
export class SingleProductComponent implements OnInit {

  private dataService = inject(DataService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private consentService = inject(ConsentService);
  private seoService = inject(MetaService)
  private schemaService = inject(SchemaService);
  private carritoService = inject(CarritoService);

  private domain = environment.domain;

  isLoading = false;
  zoomImage: boolean = false;
  showCart: boolean = false;

  productos: Products[] = [];
  productoFiltrado: Products[] = [];
  producto: Products = {} as Products
  productoId: any

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const producto = data['producto'];
      const currentUrl = `${this.domain}${this.router.url}`;

      if (producto) {
        this.producto = producto;

        const title = `${producto.descripcion} | Accesorio para Café | Bunna`;
        const description = `${producto.descripcion} en Bunna Shop: calidad premium, ideal para baristas caseros y amantes del café.`

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

        const schema = this.schemaService.generateProductSchema(
          producto,
          currentUrl);
        this.schemaService.injectSchema(schema, 'Product');

        this.loadProductsByCategory(producto.categoria_id);
      }
    });
  }

  goToProducts(productoId: string) {
    this.router.navigate(['/producto', productoId]).then(r => {window.scrollTo({ top: 0, behavior: 'smooth' });});
  }


  loadProductsByCategory(categoryId: number) {
    this.dataService.getProductos().subscribe(data => {
      this.productoFiltrado = data.filter(producto => producto.categoria_id === categoryId);
      this.isLoading = false;
    })
  }

  openWhatsApp(producto: Products) {
    const telefono = '+593979126861';
    const mensaje = `Hola, estoy interesado(a) en adquirir el siguiente producto: *${producto.descripcion}* item: ${producto.item} Precio: $${producto.precio.toFixed(2)} ¿Podrías brindarme más información? ¡Gracias!`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    if (this.consentService.hasConsented() && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17007241092/OVscCMv0jNcaEITP160_',
        value: producto.precio,
        currency: 'USD',
        transaction_id: producto.item,
        event_callback: () => window.open(url, '_blank'),
      });
    } else {
      window.open(url, '_blank');
    }
  }

  agregarAlCarrito(producto: Products){
    this.carritoService.agregarProducto(producto);
    this.abrirSidebarCarrito()
  }

  abrirSidebarCarrito(){
    this.showCart = true
  }

}
