import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {CarouselComponent} from '@components/carousel/carousel.component';
import {BoxesIconsComponent} from '@components/boxes-icons/boxes-icons.component';
import {CategoriesGridComponent} from '@components/categories-grid/categories-grid.component';
import {environment} from "@environments/environment";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, BoxesIconsComponent,
    CategoriesGridComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  private readonly domain = environment.domain;
  private readonly seo = inject(MetaService);
  private readonly schema = inject(SchemaService);

  constructor() {
    const url = `${this.domain}/`;
    const title = 'Bunna Shop | Café de especialidad y accesorios en Ecuador';
    const description =
      'Compra café de especialidad tostado en Ecuador y accesorios: cafeteras, molinos, filtros V60 y prensas francesas. Envíos a todo el país.';

    this.seo.updateMetaTags({
      title, description, canonicalUrl: url,
      og: { title, description, url, image: `${this.domain}/images/logos/bunnaCirc.webp` },
    });

    const schema = this.schema.generateContentPageSchema(
      url,
      'Bunna Shop inicio',
      description);
    this.schema.injectSchema(schema, 'home');

  }
}
