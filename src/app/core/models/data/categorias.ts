import {Subcategoria} from "@models/data/subcategoria";

export interface Categorias {
  id:             number;
  nombre:         string;
  subcategorias?: Subcategoria[];
}
