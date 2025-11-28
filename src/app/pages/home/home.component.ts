import {Component} from '@angular/core';
import {NavbarComponent} from '@shared/navbar/navbar.component';
import {CarouselComponent} from '@components/carousel/carousel.component';
import {FooterComponent} from '@shared/footer/footer.component';
import {BoxesIconsComponent} from '@components/boxes-icons/boxes-icons.component';
import {CategoriesGridComponent} from '@components/categories-grid/categories-grid.component';
import {WhatsappButtonComponent} from "@components/whatsapp-button/whatsapp-button.component";
import {environment} from "@environments/environment";
import {Router} from "@angular/router";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";
import {PopUsComponent} from "@components/pop-us/pop-us.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CarouselComponent, FooterComponent, BoxesIconsComponent, CategoriesGridComponent, WhatsappButtonComponent, PopUsComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export default class HomeComponent {

  private domain = environment.domain;

  constructor(
    private router: Router,
    private schemaService: SchemaService,
    private seoService: MetaService
  ) {
    const currentUrl = `${this.domain}${this.router.url}`;

    const title = 'Bienvenido a Bunna Shop ☕| Accesorios para Cafe ';
    const description = 'Bienvenido a Bunna Shop: cafeteras, molinos, filtros V60 y más para preparar café como un experto en casa.'

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
      'Bunna Shop inicio',
      description);
    this.schemaService.injectSchema(schema, 'ContentPage');
  }
}
