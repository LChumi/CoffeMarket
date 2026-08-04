import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Carrito} from "@models/carrito";
import {getLocalItem} from "@utils/storage-utils";
import {BehaviorSubject} from "rxjs";
import {Producto} from "@models/producto";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private readonly platformId = inject(PLATFORM_ID);

  private carrito: Carrito = this.crearCarritoVacio();

  private carritoSubject = new BehaviorSubject<Carrito>(this.carrito);

  readonly carrito$ = this.carritoSubject.asObservable();

  constructor() {
    this.carrito = this.inicializarCarrito();
    this.carritoSubject.next(this.carrito);
  }

  private crearCarritoVacio(): Carrito {
    return {
      id: isPlatformBrowser(this.platformId)
        ? crypto.randomUUID()
        : 'server-cart',
      usuarioId: 'user-client',
      items: [],
      actualizadoEn: new Date().toISOString()
    };
  }

  private inicializarCarrito(): Carrito {

    const carritoVacio = this.crearCarritoVacio();

    if (!isPlatformBrowser(this.platformId)) {
      return carritoVacio;
    }

    const data = getLocalItem('carrito');

    if (!data) {
      return carritoVacio;
    }

    try {
      const carrito = JSON.parse(data) as Partial<Carrito>;

      return {
        ...carritoVacio,
        ...carrito,
        items: carrito.items ?? []
      };

    } catch {
      return carritoVacio;
    }
  }

  private guardarCarrito(): void {

    this.carrito.actualizadoEn = new Date().toISOString();

    this.carritoSubject.next(this.carrito);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  agregarProducto(producto: Producto, cantidad = 1): void {

    const existente = this.carrito.items.find(i => i.productoId === producto.sku);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.carrito.items.push({
        productoId: producto.sku,
        descripcion: producto.descripcion,
        cantidad,
        pvp: producto.precio
      });
    }

    this.guardarCarrito();
  }

  agregarCantidad(id: string): void {

    const item = this.carrito.items.find(i => i.productoId === id);

    if (!item) return;

    item.cantidad++;

    this.guardarCarrito();
  }

  retirarCantidad(id: string): void {

    const item = this.carrito.items.find(i => i.productoId === id);

    if (!item) return;

    if (item.cantidad > 1) {
      item.cantidad--;
      this.guardarCarrito();
    }
  }

  eliminarProducto(productoId: string): void {

    this.carrito.items = this.carrito.items.filter(i => i.productoId !== productoId);

    this.guardarCarrito();
  }

  limpiarCarrito(): void {

    this.carrito.items = [];

    this.guardarCarrito();
  }

  obtenerCarrito(): Carrito {
    return this.carrito;
  }
}
