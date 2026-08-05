import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {environment} from "@environments/environment";
import {Router} from "@angular/router";
import {SchemaService} from "@services/seo/schema.service";
import {MetaService} from "@services/seo/meta.service";

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export class DashboardComponent implements OnInit {

  private domain = environment.domain;
  private router=  inject(Router);
  private schemaService=  inject(SchemaService);
  private seoService=  inject(MetaService);

  constructor() {}

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;

    const title ='Pagina de administracion | Bunna Shop'
    const description ='Vista de administracion y gestion de BunnaShop pagina privada logueo'

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
      'Pagina de administracion',
      description);
    this.schemaService.injectSchema(schema, 'WebPage')
  }

}
