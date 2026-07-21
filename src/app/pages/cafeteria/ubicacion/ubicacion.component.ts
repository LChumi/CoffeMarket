import { Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HORARIO_DIA} from "@pages/cafeteria/mocks/horario-dia.mock";

@Component({
  selector: 'app-ubicacion',
  imports: [],
  templateUrl: './ubicacion.component.html',
  standalone: true,
  styles: ``
})
export class UbicacionComponent {
  /**
   * Mapa sin API key: basta con una búsqueda + &output=embed.
   * Reemplaza la query por tu dirección exacta o, mejor aún,
   * por el nombre del local tal como aparece en Google Maps
   * (ej. "Bunna Café de Especialidad, Chaullabamba, Cuenca").
   */
  private readonly mapQuery = 'Bunna Café de Especialidad, Chaullabamba, Cuenca, Ecuador';
  private readonly mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(this.mapQuery)}&output=embed`;

  /** Para el botón "Cómo llegar" (abre Google Maps con direcciones, no embebido) */
  readonly directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.mapQuery)}`;

  mapUrlSegura: SafeResourceUrl;

  horario= HORARIO_DIA

  constructor(private sanitizer: DomSanitizer) {
    this.mapUrlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapSrc);
  }
}
