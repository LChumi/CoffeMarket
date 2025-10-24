import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ConsentModalComponent} from "@components/consent-modal/consent-modal.component";
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "@environments/environment";
import {MetaService} from "@services/seo/meta.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsentModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private domain = environment.domain;
  title = 'coffe-market';

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

    const schema = this.schemaService.generateIndexSchema();
    this.schemaService.injectSchema(schema, 'WebSite');
  }

}
