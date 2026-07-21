import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CAFETERIA_MENU, MenuCategoria} from "@pages/cafeteria/mocks/menu-categoria.mock";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-cafeteria',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './cafeteria.component.html',
  standalone: true,
  styles: ``
})
export class CafeteriaComponent {
  categorias: MenuCategoria[] = CAFETERIA_MENU;

  /** Ligera rotación pseudo-aleatoria pero estable por índice, para el efecto "puesto a mano" */
  rotacion(i: number): string {
    const angulos = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];
    return angulos[i % angulos.length];
  }

  totalBebidas(): number {
    return this.categorias.reduce((acc, c) => acc + c.items.length, 0);
  }
}
