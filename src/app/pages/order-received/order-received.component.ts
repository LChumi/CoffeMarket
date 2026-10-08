import {Component, inject, OnInit, ChangeDetectionStrategy, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {FooterComponent} from "@shared/footer/footer.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "@environments/environment";
import {Pedido} from "@models/pedido";
import {CurrencyPipe, DatePipe, isPlatformBrowser} from "@angular/common";
import {ClienteService} from "@services/cliente.service";
import {Cliente} from "@models/cliente";
import {getUrlImage} from "@utils/image-util";
import {ClarityService} from "@services/data/clarity.service";
import {MetaPixelService} from "@services/meta-pixel.service";

@Component({
  selector: 'app-order-received',
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './order-received.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export default class OrderReceivedComponent implements OnInit {

  private router = inject(Router);
  private seoService = inject(MetaService)
  private schemaService = inject(SchemaService);
  private route = inject(ActivatedRoute)
  private clienteService = inject(ClienteService);
  private clarity = inject(ClarityService)
  private pixel = inject(MetaPixelService);
  private platformId = inject(PLATFORM_ID);

  private domain = environment.domain;

  pedido: Pedido | null = null
  cliente: Cliente = {} as Cliente;

  constructor() {}

  ngOnInit() {
    const currentUrl = `${this.domain}${this.router.url}`;

    const title = 'Resumen de Pedido Generado | Bunna Accesorios para Cafe'
    const description = 'Observa el Resumen de tu Pedido Generado '

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
      'Resumen de tu pedido Generado',
      description);
    this.schemaService.injectSchema(schema, 'order-received');

    this.route.data.subscribe(data => {
      this.pedido = data['pedido'];
    })
    if (this.pedido) {
      this.trackPurchase(this.pedido);
      this.clienteService.getById(this.pedido.clienteId).subscribe({
        next: data => {
          if (data) {
            this.clarity.setTag('orderStatus', 'Pedido confirmado');
            this.clarity.setTag('orderId', this.pedido?.docNum?.toString());

            const total = Number(this.pedido?.total ?? 0);

            this.clarity.setTag('orderValue', total.toString());

            if (total > 100) {
              this.clarity.prioritize('Pedido de alto valor');
            }

            this.cliente = data
          }
        }
      });
    }
  }

  enviarComprobantePorWhatsApp(pedido: string) {
    this.pixel.track('Contact', { content_name: 'WhatsApp' });
    const telefono = '593979126861';
    const mensaje = encodeURIComponent(`Hola, realicé el pedido ${pedido}. Quisiera coordinar el pago.`);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const url = isMobile
      ? `https://wa.me/${telefono}?text=${mensaje}`
      : `https://web.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  private trackPurchase(pedido: Pedido): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const key = `pixel_purchase_${pedido.docNum}`;
    if (sessionStorage.getItem(key)) return; // evita duplicar si recargan la página

    const productos = pedido.items.filter(i => i.productoId !== 'ENVIO');

    this.pixel.track(
      'Purchase',
      {
        value: Number(pedido.total),
        currency: 'USD',
        content_type: 'product',
        content_ids: productos.map(i => i.productoId),
        contents: productos.map(i => ({
          id: i.productoId,
          quantity: i.cantidad,
          item_price: i.pvp
        })),
        num_items: productos.reduce((s, i) => s + i.cantidad, 0)
      },
      `purchase_${pedido.docNum}` // eventID para deduplicar con la Conversions API
    );

    sessionStorage.setItem(key, '1');
  }

  protected readonly getUrlImage = getUrlImage;
}
