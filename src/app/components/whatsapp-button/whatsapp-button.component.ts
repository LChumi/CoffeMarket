import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {ClarityService} from "@services/data/clarity.service";
import {MetaPixelService} from "@services/meta-pixel.service";

@Component({
  selector: 'app-whatsapp-button',
  imports: [],
  templateUrl: './whatsapp-button.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './whatsapp-button.component.scss'
})
export class WhatsappButtonComponent {

  private clarity=  inject(ClarityService)
  private pixel = inject(MetaPixelService);

  protected readonly url = `https://wa.me/593979126861?text=${encodeURIComponent('Hola, quiero más información sobre Bunna Café.')}`;
  protected track() {
    this.pixel.track('Contact', { content_name: 'WhatsApp' });
    this.clarity.event('Redirect to WhatsApp');
  }

}
