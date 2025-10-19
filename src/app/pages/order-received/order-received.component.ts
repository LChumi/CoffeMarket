import {Component, inject} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {FooterComponent} from "@shared/footer/footer.component";
import {Router} from "@angular/router";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-order-received',
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './order-received.component.html',
  styles: ``
})
export default class OrderReceivedComponent {

  private router = inject(Router);
  private seoService = inject(MetaService)
  private schemaService = inject(SchemaService);
  private domain = environment.domain;

  constructor(){
    const currentUrl = `${this.domain}${this.router.url}`;

    const title ='Resumen de Pedido Generado | Bunna Accesorios para Café'
    const description ='Observa el Resumen de tu Pedido Generado '

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
      'Resumen de tu pedido Generado',
      description);
    this.schemaService.injectSchema(schema, 'order-received');
  }
}
