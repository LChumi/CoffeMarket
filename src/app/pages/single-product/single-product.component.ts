import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {environment} from "@environments/environment";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";
import {CarritoService} from "@services/carrito.service";
import {ShoppingCartSidebarComponent} from "@components/shopping-cart-sidebar/shopping-cart-sidebar.component";
import {FooterComponent} from "@shared/footer/footer.component";
import {Producto} from "@models/producto";
import {ProductoService} from "@services/producto.service";
import {getUrlImage} from "@utils/image-util";

@Component({
  selector: 'app-single-product',
  imports: [
    NavbarComponent,
    ShoppingCartSidebarComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './single-product.component.html',
  standalone: true,
  styles: ``
})
export default class SingleProductComponent implements OnInit {

  private productoService = inject(ProductoService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private seoService = inject(MetaService)
  private schemaService = inject(SchemaService);
  private carritoService = inject(CarritoService);

  private domain = environment.domain;

  zoomImage: boolean = false;
  showCart: boolean = false;

  productos: Producto[] = [];
  producto: Producto | null = null
  productoId: any

  constructor() {}

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

        this.loadProductsByCategory(producto.categoriaId);
      } else {
        const title = `Accesorio para Café | Bunna`;
        const description = `Nuestros productos cuentan con la mejor calidad y buen precio`

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
      }
    });
  }

  goToProducts(productoId: string) {
    this.router.navigate(['/producto', productoId]).then(() => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }

  loadProductsByCategory(categoryId: any) {
    this.productoService.getAllByCategory(categoryId).subscribe({
      next: data => {
        this.productos = data
      }
    })
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
    this.abrirSidebarCarrito()
  }

  abrirSidebarCarrito() {
    this.showCart = true
  }

  protected readonly getUrlImage = getUrlImage;
}
