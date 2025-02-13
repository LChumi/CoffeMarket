import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {Products} from "@models/data/products";
import {DataService} from "@services/data/data.service";
import {ActivatedRoute} from "@angular/router";

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

  productos: Products[] =[]
  categoryId!: number;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId'];
    });
    if (this.categoryId){
      this.loadProductsByCategory(this.categoryId);
    }else {
      this.loadProducts()
    }
  }

  loadProductsByCategory(categoryId: number) {
    this.dataService.getProductos().subscribe(data => {
      this.productos = data.filter(producto => producto.categoria_id === categoryId);
    })
  }
  loadProducts(){
    this.dataService.getProductos().subscribe(data => {
      this.productos = data
    })
  }

}
