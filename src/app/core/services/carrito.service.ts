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
  private carrito: Carrito = {} as Carrito;
  private carritoSubject: BehaviorSubject<Carrito>;
  private platformId = inject(PLATFORM_ID);
  carrito$ = new BehaviorSubject<Carrito>({} as Carrito).asObservable();

  constructor() {
    const carritoInicial = this.inicializarCarrito();
    this.carritoSubject = new BehaviorSubject<Carrito>(carritoInicial);
    this.carrito$ = this.carritoSubject.asObservable();
  }

  private inicializarCarrito(): Carrito {
    if (isPlatformBrowser(this.platformId)) {
      const data = getLocalItem("carrito");
      if (data) {
        this.carrito = JSON.parse(data);
      } else {
        this.carrito = {
          id: crypto.randomUUID(),
          usuarioId: 'user-client',
          items: [],
          actualizadoEn: new Date().toISOString()
        };
      }
    }
    return this.carrito;
  }

  private guardarCarrito() {
    if (isPlatformBrowser(this.platformId)) {
      this.carrito.actualizadoEn = new Date().toISOString();
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      this.carritoSubject.next(this.carrito);
    }
  }

  agregarProducto(producto: Producto, cantidad: number = 1) {
    const existente = this.carrito.items.find(i => i.productoId === producto.sku);
    if (existente) {
      existente.cantidad = (existente.cantidad + cantidad)
    } else {
      this.carrito.items.push({
        productoId: producto.sku,
        descripcion: producto.descripcion,
        cantidad: cantidad,
        pvp: producto.precio
      });
    }
    this.guardarCarrito();
  }

  agregarCantidad(id: string) {
    const existente = this.carrito.items.find(i => i.productoId === id);
    if (existente) {
      existente.cantidad = (existente.cantidad + 1);
      this.guardarCarrito()
    }
  }

  retirarCantidad(id: string) {
    const item = this.carrito.items.find(i => i.productoId === id);
    if (!item) return;

    if (item.cantidad > 1) {
      item.cantidad -= 1;
      this.guardarCarrito();
    }
  }

  obtenerCarrito(): Carrito {
    return this.carrito;
  }

  eliminarProducto(productoId: string) {
    this.carrito.items = this.carrito.items.filter(item => item.productoId !== productoId);
    this.guardarCarrito();
  }

  limpiarCarrito() {
    this.carrito.items = [];
    this.guardarCarrito();
  }
}
