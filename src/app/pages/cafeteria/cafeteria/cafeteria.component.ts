import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CAFETERIA_MENU, MenuCategoria} from "@pages/cafeteria/mocks/menu-categoria.mock";
import {NgOptimizedImage} from "@angular/common";
import {environment} from "@environments/environment";
import {SchemaService} from "@services/seo/schema.service";
import {MetaService} from "@services/seo/meta.service";

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
export class CafeteriaComponent implements OnInit {

  private domain = environment.domain;
  private router = inject(Router)
  private schemaService = inject(SchemaService)
  private seoService = inject(MetaService)

  categorias: MenuCategoria[] = CAFETERIA_MENU;

  /** Ligera rotación pseudo-aleatoria pero estable por índice, para el efecto "puesto a mano" */
  rotacion(i: number): string {
    const angulos = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];
    return angulos[i % angulos.length];
  }

  totalBebidas(): number {
    return this.categorias.reduce((acc, c) => acc + c.items.length, 0);
  }

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;

    const title = 'Bienvenido a Bunna Coffee 🍵| Café de Especialidad en Cuenca ';
    const description = 'Bunna Coffee Shop: disfruta café de especialidad, bebidas artesanales y un ambiente único en nuestra cafetería en Cuenca.';

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
      'Cafetería Bunna | Challuabamba, Cuenca',
      description,
      true
    );
    this.schemaService.injectSchema(schema, 'WebSite ');
  }
}
