import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {FooterComponent} from "@shared/footer/footer.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "../../../environments/environment";
import {Pedido} from "@models/pedido";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {ClienteService} from "@services/cliente.service";
import {Cliente} from "@models/cliente";

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
  styles: ``
})
export default class OrderReceivedComponent implements OnInit {

  private router = inject(Router);
  private seoService = inject(MetaService)
  private schemaService = inject(SchemaService);
  private route = inject(ActivatedRoute)
  private clienteService = inject(ClienteService);

  private domain = environment.domain;

  pedido: Pedido | null = null
  cliente: Cliente = {} as Cliente;

  constructor(){
    const currentUrl = `${this.domain}${this.router.url}`;

    const title ='Resumen de Pedido Generado | Bunna Accesorios para Café'
    const description ='Observa el Resumen de tu Pedido Generado '

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
  }

  ngOnInit() {
    if (this.pedido){
      this.clienteService.getById(this.pedido.clienteId).subscribe({
        next: data => {
          if (data){
            this.cliente = data
          }
        }
      });
    }
  }

  enviarComprobantePorWhatsApp(pedido:string){
    const telefono = '+593979126861';
    const mensaje = encodeURIComponent(`Hola, aquí está mi comprobante del pedido ${pedido}`);
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  urlItem(sku: string): string{
    return `https://apis.cumpleanos.com.ec/assist/images/producto/${sku}`;
  }

}
