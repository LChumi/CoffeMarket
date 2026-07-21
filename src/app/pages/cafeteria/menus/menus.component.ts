import {Component, computed, signal} from '@angular/core';
import {CAFETERIA_MENU, MenuCategoria} from "@pages/cafeteria/mocks/menu-categoria.mock";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-menus',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './menus.component.html',
  styles: ``
})
export class MenusComponent {
  categorias: MenuCategoria[] = CAFETERIA_MENU;

  /** slug inicial que viene por queryParam, ej: /cafeteria/menu?categoria=cafes-filtrados */
  private slugInicial = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('categoria'))),
    { initialValue: null },
  );

  categoriaActiva = signal<string>(this.categorias[0].slug);

  constructor(private route: ActivatedRoute) {
    // si llega un queryParam válido, lo respeta; si no, se queda en la primera categoría
    const inicial = this.slugInicial();
    if (inicial && this.categorias.some((c) => c.slug === inicial)) {
      this.categoriaActiva.set(inicial);
    }
  }

  categoriaSeleccionada = computed<MenuCategoria>(
    () => this.categorias.find((c) => c.slug === this.categoriaActiva()) ?? this.categorias[0],
  );

  seleccionar(slug: string): void {
    this.categoriaActiva.set(slug);
  }
}
