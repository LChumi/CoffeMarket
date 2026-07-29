import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {FooterComponent} from "@shared/footer/footer.component";
import {Router} from "@angular/router";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "@environments/environment";

@Component({
  selector: 'app-returns-and-refunds-policy',
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './returns-and-refunds-policy.component.html',
  styles: ``
})
export default class ReturnsAndRefundsPolicyComponent implements OnInit {

  private router = inject(Router);
  private seoService = inject(MetaService)
  private schemaService = inject(SchemaService);
  private domain = environment.domain;

  protected emailInfo: string = 'bunnacoffeemp@gmail.com';

  ngOnInit() {
    const currentUrl = `${this.domain}${this.router.url}`;

    const title = 'Pagina de Politica Devoluciones | Bunna Shop';
    const description = 'Conoce nuestra Política de Devoluciones en Bunna Shop. Valoramos tu satisfacción y ofrecemos un proceso claro y seguro para cambios y reembolsos.'

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
      'Pagina de Devoluciones ',
      description);
    this.schemaService.injectSchema(schema, 'ContentPage');
  }
}
