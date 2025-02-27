import {Component, inject, Renderer2} from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  imports: [],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.css'
})
export class WhatsappButtonComponent {

  private renderer = inject(Renderer2)

  openWhatsApp() {
    const telefono = '+593979126861';
    const mensaje = `Hola, quiero más información sobre Bunna Cafe.`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(this.renderer.createElement('a').href = url, '_blank');
  }
}
