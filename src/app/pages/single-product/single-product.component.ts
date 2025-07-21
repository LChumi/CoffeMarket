import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {DataService} from "@services/data/data.service";
import {Products} from "@models/data/products";
import {ActivatedRoute, Router} from "@angular/router";
import {ConsentService} from "@services/consent.service";
import { Meta, Title } from '@angular/platform-browser';
import {environment} from "../../../environments/environment";
import {MetaService} from "@services/meta.service";
import {SchemaService} from "@services/schema.service";

declare var gtag: (...args: any[]) => void;

@Component({
  selector: 'app-single-product',
  imports: [
    NavbarComponent
  ],
  templateUrl: './single-product.component.html',
  styles: ``
})
export class SingleProductComponent implements OnInit {

  private dataService = inject(DataService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private consentService = inject(ConsentService);


  private titleService = inject(Title);
  private metaService = inject(Meta);
  private canonicalService = inject(MetaService)
  private schemaService = inject(SchemaService);

  private domain = environment.domain;

  isLoading = false;
  zoomImage: boolean = false;

  productos: Products[] = [];
  productoFiltrado: Products[] = [];
  producto: Products = {} as Products
  productoId: any

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;
    this.canonicalService.updateCanonical(currentUrl);

    this.titleService.setTitle('Producto | Bunna Café');
    this.metaService.updateTag({
      name: 'description',
      content: 'Productos de calidad '
    });

    this.route.data.subscribe(({ producto }) => {
      if (producto) {
        const schema = this.schemaService.generateProductSchema(producto, this.domain , currentUrl)
        this.producto = producto;
        this.schemaService.insertSchema(schema);
        this.loadProductsByCategory(producto.categoria_id)
      }
    });

  }

  goToProducts(productoId: any) {
    this.router.navigate(['/bunna', 'producto', productoId]).then(r => {
      window.location.reload();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

  loadProductsByCategory(categoryId: number) {
    this.dataService.getProductos().subscribe(data => {
      this.productoFiltrado = data.filter(producto => producto.categoria_id === categoryId);
      this.isLoading = false;
    })
  }

  openWhatsApp(producto: Products) {
    const telefono = '+593979126861';
    const mensaje = `Hola, estoy interesado(a) en adquirir el siguiente producto: *${producto.descripcion}* item: ${producto.item} Precio: $${producto.precio.toFixed(2)} ¿Podrías brindarme más información? ¡Gracias!`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    if (this.consentService.hasConsented() && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17007241092/OVscCMv0jNcaEITP160_',
        value: producto.precio,
        currency: 'USD',
        transaction_id: producto.item,
        event_callback: () => window.open(url, '_blank'),
      });
    } else {
      window.open(url, '_blank');
    }
  }

}
