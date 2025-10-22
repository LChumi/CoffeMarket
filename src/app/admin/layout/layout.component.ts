import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {AdminNavbarComponent} from "../components/admin-navbar/admin-navbar.component";
import {AdminSidebarComponent} from "../components/admin-sidebar/admin-sidebar.component";
import {environment} from "@environments/environment";
import {SchemaService} from "@services/seo/schema.service";
import {MetaService} from "@services/seo/meta.service";

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    AdminNavbarComponent,
    AdminSidebarComponent
  ],
  template: `
    <app-admin-navbar></app-admin-navbar>
    <app-admin-sidebar></app-admin-sidebar>
    <div class="p-4 sm:ml-64">
      <div class="p-4 rounded-lg dark:border-gray-700 mt-14">
        <router-outlet/>
      </div>
    </div>
  `,
  styles: ``
})
export class LayoutComponent {

  private domain = environment.domain;

  constructor(
    private router: Router,
    private schemaService: SchemaService,
    private seoService : MetaService
  ) {
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
