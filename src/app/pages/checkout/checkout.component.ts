import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Ubicacion, UBICACIONES_MOCK} from "../../mocks/ubicaciones";
import {CarritoService} from "@services/carrito.service";
import {ItemCarrito} from "@models/dto/item-carrito";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-checkout',
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './checkout.component.html',
  styles: ``
})
export default class CheckoutComponent implements OnInit {

  private fb = inject(FormBuilder);
  private carritoService = inject(CarritoService);
  protected envio = 5.11

  ubicaciones: Ubicacion[] = UBICACIONES_MOCK
  cartItems: ItemCarrito[] = [];
  selectedCiudades: string[] = []
  invoiceFrom !: FormGroup;

  constructor() {
    this.invoiceFrom = this.fb.group({
      tipo_persona: ['', Validators.required],
      tipo_documento: ['', Validators.required],
      identificacion: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
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
    if (!this.invoiceFrom.valid) {
    this.invoiceFrom.markAllAsTouched();
    return;
    }
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

  calcularTotal() : number {
    return this.calcularSubtotal() + this.envio;
  }

}
