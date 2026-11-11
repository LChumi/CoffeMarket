import {Component, inject, OnInit, ChangeDetectionStrategy, signal, computed, DestroyRef} from '@angular/core';
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
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    ShoppingCartSidebarComponent,
    FooterComponent,
    RouterLink,
    NgOptimizedImage,
    CurrencyPipe
  ],
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export default class ProductsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seoService = inject(MetaService);
  private schemaService = inject(SchemaService);
  private carritoService = inject(CarritoService);
  private destroyRef = inject(DestroyRef);

  private domain = environment.domain;

  showCart = false;

  // Estado
  productos = signal<Producto[]>([]);
  searchTerm = signal('');
  soloDisponibles = signal(false);
  titulo = signal('');

  // Filtrado + orden: con stock primero, agotados al final.
  // Array.prototype.sort es estable, así que dentro de cada grupo se respeta el orden original.
  productosFiltrados = computed(() => {
    const filtro = this.searchTerm().trim().toLowerCase();
    const soloStock = this.soloDisponibles();

    return this.productos()
      .filter(p => !soloStock || p.disponible)
      .filter(p =>
        !filtro ||
        p.item?.toLowerCase().includes(filtro) ||
        p.descripcion?.toLowerCase().includes(filtro)
      )
      .sort((a, b) => Number(b.disponible) - Number(a.disponible));
  });

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;
    const title = 'Catalogo de Accesorios para Cafe | Bunna Shop';
    const description = 'Explora nuestro catálogo: cafeteras V60, molinos manuales, filtros, balanzas y todo lo que necesitas para preparar cafe en casa.';

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
      description
    );
    this.schemaService.injectSchema(schema, 'CollectionPage');

    // Se vuelve a ejecutar cada vez que cambia la categoría (el resolver emite de nuevo),
    // por eso ya no hace falta window.location.reload().
    this.route.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ productos }) => {
        this.productos.set(productos);

        const categoryId = this.route.snapshot.paramMap.get('categoryId');
        const q = this.route.snapshot.queryParamMap.get('q')?.trim().toLowerCase();
        this.searchTerm.set(q ?? '');

        this.titulo.set(
          categoryId
            ? 'Explora nuestros productos de café: variedad, estilo y funcionalidad'
            : 'Productos para amantes del café: encuentra todo lo que necesitas'
        );
      });
  }

  limpiarBusqueda() {
    this.searchTerm.set('');
  }

  limpiarFiltros() {
    this.searchTerm.set('');
    this.soloDisponibles.set(false);
  }

  goToProducts(productoId: number | string) {
    this.router.navigate(['/producto', productoId]).then(() => this.scrollArriba());
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
    this.showCart = true;
  }

  goToCafeteras() {
    this.irACategoria(1);
  }

  goToAccesorios() {
    this.irACategoria(5);
  }

  private irACategoria(id: number) {
    this.router.navigate(['/productos', id]).then(() => this.scrollArriba());
  }

  private scrollArriba() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected readonly getUrlImage = getUrlImage;
}
