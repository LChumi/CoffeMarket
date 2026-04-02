import {Component, inject, OnInit} from '@angular/core';
import {DataService} from "@services/data/data.service";
import {Categorias} from "@models/data/categorias";
import {Router} from "@angular/router";
import {CATEGORIAS_MOCK} from "@mocks/categorias";

@Component({
  selector: 'app-categories-grid',
  standalone: true,
  imports: [],
  templateUrl: './categories-grid.component.html',
  styles: ``
})
export class CategoriesGridComponent implements OnInit {

  private router = inject(Router)

  protected categorias: Categorias[] = CATEGORIAS_MOCK

  ngOnInit(): void {

  }

  goToProducts(categoryId: number) {
    this.router.navigate(['/productos', categoryId]).then(r => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

}
