import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {Products} from "@models/data/products";
import {DataService} from "@services/data/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {MetaService} from "@services/meta.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styles: ``
})
export default class ProductsComponent implements OnInit {

  private dataService = inject(DataService);
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  private titleService = inject(Title);
  private metaService = inject(Meta);
  private canonicalService = inject(MetaService)

  private domain = environment.domain;

  isLoading = false;
  productos: Products[] = []
  productosFiltrados : Products[] = [];
  categoryId!: number;
  searchTerm: string = "";

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;
    this.canonicalService.updateCanonical(currentUrl);

    this.titleService.setTitle('Catálogo de Accesorios para Café | Bunna Shop');
    this.metaService.updateTag({
      name: 'description',
      content: 'Explora nuestro catálogo: cafeteras V60, molinos manuales, filtros, balanzas y todo lo que necesitas para preparar café en casa.'
    });

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
    this.router.navigate(['/bunna', 'producto', productoId]).then(r => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
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
    this.router.navigate(['/bunna/productos', 1]).then(() => {
      window.location.reload();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  goToAccesorios() {
    this.router.navigate(['/bunna/productos', 5]).then(() => {
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
