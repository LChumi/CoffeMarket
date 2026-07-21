import { Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HORARIO_DIA} from "@pages/cafeteria/mocks/horario-dia.mock";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-ubicacion',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './ubicacion.component.html',
  standalone: true,
  styles: ``
})
export class UbicacionComponent {

  private readonly mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d861.6803945916535!2d-78.91815510476818!3d-2.8551567420372943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sec!4v1784643592904!5m2!1ses!2sec';

  readonly directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=-2.8551567420372943,-78.91815510476818';

  readonly horario = HORARIO_DIA;

  readonly mapUrlSegura: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.mapUrlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapEmbedUrl);
  }
}
