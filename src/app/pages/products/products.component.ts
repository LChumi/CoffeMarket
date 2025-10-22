import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {environment} from "@environments/environment";
import {MetaService} from "@services/seo/meta.service";
import {FormsModule} from "@angular/forms";
import {CarritoService} from "@services/carrito.service";
import {ShoppingCartSidebarComponent} from "@components/shopping-cart-sidebar/shopping-cart-sidebar.component";
import {SchemaService} from "@services/seo/schema.service";
import {FooterComponent} from "@shared/footer/footer.component";
import {Producto} from "@models/producto";
import {getUrlImage} from "@utils/image-util";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    ShoppingCartSidebarComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styles: ``
})
export default class ProductsComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private seoService = inject(MetaService)
  private schemaService = inject(SchemaService)
  private carritoService = inject(CarritoService);
  private domain = environment.domain;
  private imageUrl = environment.imagesUrl;

  showCart = false;
  productos: Producto[] = []
  productosFiltrados : Producto[] = [];
  categoryId!: number;
  searchTerm: string = "";
  titulo: string = "";

  constructor() {
    const currentUrl = `${this.domain}${this.router.url}`;
    const title = 'Catálogo de Accesorios para Café | Bunna Shop'
    const description ='Explora nuestro catálogo: cafeteras V60, molinos manuales, filtros, balanzas y todo lo que necesitas para preparar café en casa.'

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
      'Catalogo Bunna Shop',
      description);
    this.schemaService.injectSchema(schema, 'CollectionPage');
  }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    const searchQuery = this.route.snapshot.queryParamMap.get('q')?.trim().toLowerCase();

    this.route.data.subscribe(({ productos }) => {
      this.productos = productos;
      this.productosFiltrados = productos;

      if (searchQuery) {
        this.productosFiltrados = this.productos.filter(p =>
          p.item?.toLowerCase().includes(searchQuery) ||
          p.descripcion?.toLowerCase().includes(searchQuery)
        );
        this.searchTerm = searchQuery; // Para mostrar en el input
      }

      this.titulo = categoryId
        ? `Explora Nuestros Productos de Café ☕| Variedad, Estilo y Funcionalidad `
        : 'Productos para Amantes del Café ☕ | Encuentra Todo lo que Necesitas';
    });
  }

  goToProducts(productoId: any) {
    this.router.navigate(['/producto', productoId]).then(r => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

  agregarAlCarrito(producto: Producto){
    this.carritoService.agregarProducto(producto);
    this.abrirSidebarCarrito()
  }

  abrirSidebarCarrito(){
    this.showCart = true
  }

  goToCafeteras() {
    this.router.navigate(['/productos', 1]).then(() => {
      window.location.reload();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  goToAccesorios() {
    this.router.navigate(['/productos', 5]).then(() => {
      window.location.reload();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  filtrarProductos() {
    const filtro = this.searchTerm.trim().toLowerCase();
    this.productosFiltrados = this.productos.filter(p =>
      p.item.toLowerCase().includes(filtro) ||
      p.descripcion.toLowerCase().includes(filtro)
    );
  }

  protected readonly getUrlImage = getUrlImage;
}
