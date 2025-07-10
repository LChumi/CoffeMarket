import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {Products} from "@models/data/products";
import {DataService} from "@services/data/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NavbarComponent
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

  isLoading = false;
  productos: Products[] = []
  categoryId!: number;

  ngOnInit(): void {
    this.titleService.setTitle('Catálogo de Productos | Bunna Café');
    this.metaService.updateTag({
      name: 'description',
      content: 'Explora nuestra variedad de productos Bunna: café gourmet, accesorios y más.'
    });
    this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId'];
    });
    if (this.categoryId) {
      this.loadProductsByCategory(this.categoryId);
    } else {
      this.loadProducts()
    }
  }

  loadProductsByCategory(categoryId: number) {
    this.isLoading = true;
    this.dataService.getProductos().subscribe(data => {
      this.productos = data.filter(producto => producto.categoria_id === categoryId);
      this.isLoading = false;
    })
  }

  loadProducts() {
    this.isLoading = true;
    this.dataService.getProductos().subscribe(data => {
      this.productos = data
      this.isLoading = false;
    })
  }

  goToProducts(productoId: any) {
    this.router.navigate(['/bunna', 'producto', productoId]).then(r => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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



}
