import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {Products} from "@models/data/products";
import {DataService} from "@services/data/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {MetaService} from "@services/seo/meta.service";
import {FormsModule} from "@angular/forms";
import {CarritoService} from "@services/carrito.service";
import {ShoppingCartSidebarComponent} from "@components/shopping-cart-sidebar/shopping-cart-sidebar.component";
import {SchemaService} from "@services/seo/schema.service";
import {FooterComponent} from "@shared/footer/footer.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    ShoppingCartSidebarComponent,
    FooterComponent
  ],
  templateUrl: './products.component.html',
  styles: ``
})
export default class ProductsComponent implements OnInit {

  private dataService = inject(DataService);
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private seoService = inject(MetaService)
  private schemaService = inject(SchemaService)
  private carritoService = inject(CarritoService);

  private domain = environment.domain;

  showCart = false;
  isLoading = false;
  productos: Products[] = []
  productosFiltrados : Products[] = [];
  categoryId!: number;
  searchTerm: string = "";

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

    if (categoryId) {
      this.route.data.subscribe(({ productos }) => {
        this.productos = productos;
      });
    } else {
      this.loadProducts(); // Navegación directa → catálogo completo
    }
  }

  goToProducts(productoId: any) {
    this.router.navigate(['/producto', productoId]).then(r => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

  agregarAlCarrito(producto: Products){
    this.carritoService.agregarProducto(producto);
    this.abrirSidebarCarrito()
  }

  abrirSidebarCarrito(){
    this.showCart = true
  }

  loadProducts() {
    this.isLoading = true;
    this.dataService.getProductos().subscribe(data => {
      this.productos = data
      this.productosFiltrados = data
      this.isLoading = false;

      const termFromQuery = this.route.snapshot.queryParamMap.get('q')
      if (termFromQuery) {
        this.searchTerm = termFromQuery;
        this.filtrarProductos()
      }
    })
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

    this.productos = this.productosFiltrados.filter(p =>
      p.item.toLowerCase().includes(filtro) ||
      p.descripcion.toLowerCase().includes(filtro)
    )
  }

}
