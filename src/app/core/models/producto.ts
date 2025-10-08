import {Atributos} from "@models/dto/atributos";
import {Variante} from "@models/dto/variante";

export interface Producto {
  id:           string;
  sku:          string;
  item:         string;
  descripcion:  string;
  precio:       number;
  categoriaId:  number;
  disponible:   boolean;
  imagenUrl:    string;

  etiquetas:   string[];
  atributos:   Atributos[];
  variantes:   Variante[]
}
