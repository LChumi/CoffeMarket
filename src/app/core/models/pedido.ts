import {ItemCarrito} from "@models/dto/item-carrito";

export interface Pedido {
  id:                 string;

  clienteId:          string;
  items:              ItemCarrito[];

  estado:             string;
  metodoPago:         string;
  creadoEn:           string;

  direccion:          string;
  provincia:          string;
  ciudad:             string;
  telefono:           string;

  total:              number;
}
