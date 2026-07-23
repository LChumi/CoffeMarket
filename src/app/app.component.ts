import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "@environments/environment";
import {MetaService} from "@services/seo/meta.service";
import {ClarityService} from "@services/data/clarity.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private domain = environment.domain;
  private projectId = environment.clarityId;

  private router = inject(Router)
  private schemaService = inject(SchemaService)
  private seoService = inject(MetaService)
  private clarity = inject(ClarityService)

  title = 'coffe-market';

  constructor() {}

  ngOnInit(): void {
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
        image: `${this.domain}/favicon.ico`
      }
    });

    const schema = this.schemaService.generateIndexSchema();
    this.schemaService.injectSchema(schema, 'WebSite');

    this.clarity.init(this.projectId)
    }

}
