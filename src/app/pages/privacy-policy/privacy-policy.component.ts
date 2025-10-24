import {Component, inject} from '@angular/core';
import {FooterComponent} from "@shared/footer/footer.component";
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {Router} from "@angular/router";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "@environments/environment";

@Component({
  selector: 'app-privacy-policy',
  imports: [
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './privacy-policy.component.html',
  styles: ``
})
export default class PrivacyPolicyComponent {

  private router = inject(Router);
  private seoService = inject(MetaService)
  private schemaService = inject(SchemaService);
  private domain = environment.domain;

  protected emailInfo: string = 'bunnacoffeemp@gmail.com';

  constructor() {
    const currentUrl = `${this.domain}${this.router.url}`;

    const title = 'Pagina de Politica de privacidad | Bunna Shop';
    const description = 'Política de Privacidad En Bunna shop, valoramos la privacidad de nuestros usuarios'

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
      'Pagina de Politica de privacidad',
      description);
    this.schemaService.injectSchema(schema, 'ContentPage');
  }

}
