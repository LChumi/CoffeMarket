import {Component, inject, OnInit} from '@angular/core';
import {DataService} from "@services/data/data.service";
import {Categorias} from "@models/data/categorias";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories-grid',
  standalone: true,
  imports: [],
  templateUrl: './categories-grid.component.html',
  styles: ``
})
export class CategoriesGridComponent implements OnInit {

  private dataService = inject(DataService);
  private router = inject(Router)

  protected categorias: Categorias[] =[]

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.dataService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      }
    )
  }

  goToProducts(categoryId: number) {
    console.log(categoryId);
    this.router.navigate(['/bunna', 'productos', categoryId]).then(r => {})
  }

}
