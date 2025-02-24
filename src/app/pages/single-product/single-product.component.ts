import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {DataService} from "@services/data/data.service";
import {Products} from "@models/data/products";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-product',
    imports: [
        NavbarComponent
    ],
  templateUrl: './single-product.component.html',
  styles: ``
})
export class SingleProductComponent  implements OnInit {

  private dataService = inject(DataService);
  private route = inject(ActivatedRoute)

  productos: Products[] = [];
  productoFiltrado: Products[] =[];
  producto: Products = {} as Products
  productoId: any

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productoId = +params['productoId'];
    });

    if (this.productoId){
      this.loadProductsById(this.productoId);
    }
  }

  loadProductsByCategory(categoryId: number) {
    this.dataService.getProductos().subscribe(data => {
      console.log(categoryId);
      this.productoFiltrado = data.filter(producto => producto.categoria_id === categoryId);
      console.log(this.productoFiltrado)
    })
  }

  loadProductsById(id: number) {
    this.dataService.getProductos().subscribe(data => {
      this.productos = data.filter(producto => producto.id === id);
      this.producto = this.productos[0];
      this.loadProductsByCategory(this.producto.categoria_id);
    })
  }
}
