import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Ubicacion, UBICACIONES_MOCK} from "@mocks/ubicaciones";
import {CarritoService} from "@services/carrito.service";
import {ItemCarrito} from "@models/dto/item-carrito";
import {CurrencyPipe} from "@angular/common";
import {ClienteService} from "@services/cliente.service";
import {PedidoService} from "@services/pedido.service";
import {Cliente} from "@models/cliente";
import {Pedido} from "@models/pedido";
import {FooterComponent} from "@shared/footer/footer.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";
import {environment} from "@environments/environment";
import {ClarityService} from "@services/data/clarity.service";
import {PopUsComponent} from "@components/pop-us/pop-us.component";

@Component({
  selector: 'app-checkout',
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe,
    FooterComponent,
    RouterLinkActive,
    RouterLink,
    PopUsComponent
  ],
  templateUrl: './checkout.component.html',
  styles: ``
})
export default class CheckoutComponent implements OnInit {

  private router = inject(Router);
  private seoService = inject(MetaService)
  private schemaService = inject(SchemaService);
  private domain = environment.domain;

  private fb = inject(FormBuilder);
  private clientService = inject(ClienteService);
  private pedidoService = inject(PedidoService);
  private carritoService = inject(CarritoService);
  private clarity = inject(ClarityService)

  protected envio = 0.00
  protected message = ''

  ubicaciones: Ubicacion[] = UBICACIONES_MOCK
  cartItems: ItemCarrito[] = [];
  selectedCiudades: string[] = []
  loading: boolean = false;
  aceptaPoliticas: boolean = false;
  invoiceFrom !: FormGroup;

  constructor() {

    const currentUrl = `${this.domain}${this.router.url}`;

    const title = 'Pagina de Pago| Bunna Accesorios para Café'
    const description = 'Completa tu compra con seguridad y rapidez. Envíos a todo Ecuador.'

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
      'Pagina de Pago',
      description);
    this.schemaService.injectSchema(schema, 'checkout');

    this.invoiceFrom = this.fb.group({
      tipo_persona: ['', Validators.required],
      tipo_documento: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      provincia: ['', Validators.required],
      ciudad: ['', Validators.required],
      email: ['', Validators.required],
      acepta: [false]
    })
  }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(carrito => {
      this.cartItems = carrito.items;
    })
    this.invoiceFrom.get('tipo_documento')?.valueChanges.subscribe(tipo => {
      const control = this.invoiceFrom.get('identificacion');
      if (!control) return;

      control.clearValidators();

      if (tipo === 'ruc') {
        control.setValidators([
          Validators.required,
          Validators.pattern(/^\d{13}$/)
        ]);
      } else if (tipo === 'cedula') {
        control.setValidators([
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]);
      } else if (tipo === 'pasaporte') {
        control.setValidators([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]{5,20}$/) // letras y números, longitud flexible
        ]);
      }
      control.updateValueAndValidity();
    });
  }

  finalizarCompra() {
    if (!this.invoiceFrom.valid || !this.aceptaPoliticas) {
      this.invoiceFrom.markAllAsTouched();
      this.message = 'Por favor, lee y acepta los términos y condiciones para proceder con tu pedido.';
      this.clarity.event('Checkout fallido: términos no aceptados');
      this.clarity.setTag('checkoutStatus', 'fallido');
      return;
    }

    this.loading = true;
    this.message = '';

    const form = this.invoiceFrom.value;

    this.clientService.getByEmailAndCed(form.email, form.identificacion).subscribe({
      next: (result) => {
        if (result) {
          this.clarity.event('Checkout con cliente existente');
          this.clarity.setTag('checkoutStatus', 'cliente_existente');
          this.crearPedido(result.id, form);
        } else {
          const nuevoCliente: Cliente = {
            id: null,
            tipoPersona: form.tipo_persona,
            identificacion: form.identificacion,
            nombre: form.nombre,
            apellido: form.apellido,
            email: form.email,
            aceptaPolitica: true,
            aceptaPromocion: form.acepta
          };

          this.clientService.save(nuevoCliente).subscribe({
            next: (clienteGuardado) => {
              this.clarity.event('Checkout con nuevo cliente');
              this.clarity.setTag('checkoutStatus', 'nuevo_cliente');
              this.crearPedido(clienteGuardado.id, form);
            }
          });
        }
      }
    });
  }

  crearPedido(idCliente: string, form: any) {
    const item: ItemCarrito = {
      productoId: 'ENVIO',
      descripcion: `ENVIO TRANSPORTE ${form.ciudad.toLocaleUpperCase()}`,
      cantidad: 1,
      pvp: this.envio
    };

    this.cartItems.push(item);

    const pedido: Pedido = {
      id: null,
      docNum: '',
      clienteId: idCliente,
      items: this.cartItems,
      estado: false,
      creadoEn: new Date(),
      direccion: form.direccion,
      provincia: form.provincia,
      ciudad: form.ciudad,
      telefono: form.telefono,
      total: this.calcularTotal(),
      metodoPago: 'TRANSFERENCIA',
      docAutorizacion: ''
    };

    this.pedidoService.save(pedido).subscribe({
      next: (result) => {
        if (result) {
          this.clarity.event('Compra finalizada');
          this.clarity.setTag('montoTotal', pedido.total.toString());
          if (pedido.total > 100) {
            this.clarity.prioritize('Compra de alto valor');
          }
          this.goToOrder(result.docNum)
        }
      }
    });
  }

  onProvChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const provincia = select.value;
    // Aquí puedes usar provincia como string
    this.onProvinciaChange(provincia);
  }

  onProvinciaChange(provincia: string) {
    const ubicacion = this.ubicaciones.find(u => u.nombre === provincia);
    this.selectedCiudades = ubicacion?.ciudades || [];
    this, this.invoiceFrom.get('ciudad')?.setValue(null)
  }

  calcularSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      const precio = item.pvp;
      const cantidad = item.cantidad;
      return total + precio * cantidad;
    }, 0);
  }

  calcularTotal(): number {
    return this.calcularSubtotal() + this.envio;
  }

  soloNumeros(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  filtrarSoloNumeros(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
    this.invoiceFrom.get('telefono')?.setValue(input.value);
  }

  goToOrder(numDoc: string) {
    this.router.navigate(['/checkout', 'order', numDoc]).then(r => {
      this.loading = false;
      this.pedidoService.sendMail(numDoc).subscribe({
        next: (result) => {
          this.carritoService.limpiarCarrito()
        }
      })
      window.scrollTo({top: 0, behavior: 'smooth'});
    })
  }
}
