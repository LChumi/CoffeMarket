import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HORARIO_DIA} from "@pages/cafeteria/mocks/horario-dia.mock";
import {NgOptimizedImage} from "@angular/common";
import {environment} from "@environments/environment";
import {Router} from "@angular/router";
import {SchemaService} from "@services/seo/schema.service";
import {MetaService} from "@services/seo/meta.service";

@Component({
  selector: 'app-ubicacion',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './ubicacion.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export class UbicacionComponent implements OnInit {

  private domain = environment.domain;
  private router = inject(Router)
  private schemaService = inject(SchemaService)
  private seoService = inject(MetaService)

  private readonly mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1277.6996622493873!2d-78.91865598320818!3d-2.854891059916093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd117bd3a77bed%3A0x4b5ef702f9876e49!2sBunna%20Coffee%20Shop!5e1!3m2!1ses!2sec!4v1794842245095!5m2!1ses!2sec';

  readonly directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=-2.8548924,-78.9174396';

  readonly horario = HORARIO_DIA;

  readonly mapUrlSegura: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.mapUrlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapEmbedUrl);
  }

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;

    const title = 'Bunna Coffee Shop | Horarios y Ubicacion en Cuenca';
    const description = 'Encuentra Bunna Coffee Shop en Cuenca: conoce nuestros horarios de atencion y ubicacion para disfrutar cafe de especialidad en un ambiente unico.'

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
      'Ubicanos - Horarios | Bunna Coffee',
      description,
      true);
    this.schemaService.injectSchema(schema, 'ContentPage');
  }
}
