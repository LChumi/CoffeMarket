import {ItemCarrito} from "@models/dto/item-carrito";

export interface Pedido {
  id:                 string;
  items:              ItemCarrito[];
  estado:             string;
  metodoPago:         string;
  creadoEn:           string;
  direccionEntrega:   string;
  telefono:           string;
}
