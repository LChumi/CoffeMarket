import {ItemCarrito} from "@models/dto/item-carrito";

export interface Pedido {
  id:                 any;

  clienteId:          string;
  items:              ItemCarrito[];

  estado:             string;
  metodoPago:         string;
  creadoEn:           any;

  direccion:          string;
  provincia:          string;
  ciudad:             string;
  telefono:           string;

  total:              number;
}
