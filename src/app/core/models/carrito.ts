import {ItemCarrito} from "@models/dto/item-carrito";

export interface Carrito {
  id:             string;
  usuarioId:      string;
  items:          ItemCarrito[];
  actualizadoEn:  any;
}
