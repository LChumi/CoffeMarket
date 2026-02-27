import {Component, inject} from '@angular/core';
import {ClarityService} from "@services/data/clarity.service";

@Component({
  selector: 'app-whatsapp-button',
  imports: [],
  templateUrl: './whatsapp-button.component.html',
  standalone: true,
  styleUrl: './whatsapp-button.component.css'
})
export class WhatsappButtonComponent {

  private clarity=  inject(ClarityService)

  openWhatsApp() {
    const telefono = '593979126861';
    const mensaje = 'Hola, quiero más información sobre Bunna Cafe.';
    const encoded = encodeURIComponent(mensaje);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const url = isMobile
      ? `https://wa.me/${telefono}?text=${encoded}`
      : `https://web.whatsapp.com/send?phone=${telefono}&text=${encoded}`;

    this.clarity.event("Redirect to WhatsApp")
    window.open(url, '_blank', 'noopener,noreferrer');
  }

}
