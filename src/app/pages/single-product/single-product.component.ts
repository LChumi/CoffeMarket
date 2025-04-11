import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {DataService} from "@services/data/data.service";
import {Products} from "@models/data/products";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-single-product',
  imports: [
    NavbarComponent
  ],
  templateUrl: './single-product.component.html',
  styles: ``
})
export class SingleProductComponent implements OnInit {

  private dataService = inject(DataService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);

  isLoading = false;
  zoomImage: boolean = false;

  productos: Products[] = [];
  productoFiltrado: Products[] = [];
  producto: Products = {} as Products
  productoId: any

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productoId = +params['productoId'];
    });

    if (this.productoId) {
      this.loadProductsById(this.productoId);
    }
  }

  loadProductsByCategory(categoryId: number) {
    this.dataService.getProductos().subscribe(data => {
      this.productoFiltrado = data.filter(producto => producto.categoria_id === categoryId);
      this.isLoading = false;
    })
  }

  loadProductsById(id: any) {
    this.isLoading = true;
    this.dataService.getProductos().subscribe(data => {
      this.productos = data.filter(producto => producto.sku.toString() === id.toString());
      this.producto = this.productos[0];
      this.loadProductsByCategory(this.producto.categoria_id);
    })
  }

  goToProducts(productoId: any) {
    this.router.navigate(['/bunna', 'producto', productoId]).then(r => {
      window.location.reload();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

  openWhatsApp(producto: Products) {
    const telefono = '+593979126861';
    const mensaje = `Hola, estoy interesado(a) en adquirir el siguiente producto:
    *${producto.descripcion}*
    item: ${producto.item}
    Precio: $${producto.precio.toFixed(2)}

    ¿Podrías brindarme más información? ¡Gracias!`;

    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  }

}
