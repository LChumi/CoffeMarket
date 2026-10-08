import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "@environments/environment";
import {MetaService} from "@services/seo/meta.service";
import {ClarityService} from "@services/data/clarity.service";
import {Toast} from "primeng/toast";
import {MetaPixelService} from "@services/meta-pixel.service";
import {filter, skip} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private domain = environment.domain;
  private projectId = environment.clarityId;

  private router = inject(Router)
  private pixel = inject(MetaPixelService)
  private schemaService = inject(SchemaService)
  private seoService = inject(MetaService)
  private clarity = inject(ClarityService)

  title = 'coffe-market';

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      skip(1),
    ).subscribe(() => this.pixel.track('PageView'))
  }

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;

    const title = 'Bienvenido a Bunna Shop | Accesorios para Cafe ';
    const description = 'Bienvenido a Bunna Shop: cafeteras, molinos, filtros V60 y mas para preparar cafe como un experto en casa.'

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
