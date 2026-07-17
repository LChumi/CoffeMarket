export interface MenuItem {
  nombre: string;
  destacado?: boolean;
}

export interface MenuCategoria {
  slug: string;
  nombre: string;
  /** Frase corta que explica qué hace distinta a esta categoría */
  descripcion: string;
  /** 'cafe' | 'verde' controla qué paleta acentúa la ficha */
  acento: 'cafe' | 'verde';
  items: MenuItem[];
}

export const CAFETERIA_MENU: MenuCategoria[] = [
  {
    slug: 'cafes-clasicos',
    nombre: 'Cafés Clásicos',
    descripcion: 'La base: espresso en todas sus formas, hecho como debe ser.',
    acento: 'cafe',
    items: [
      { nombre: 'Espresso' },
      { nombre: 'Espresso Doble' },
      { nombre: 'Americano' },
      { nombre: 'Cortado' },
      { nombre: 'Macchiato' },
      { nombre: 'Cappuccino' },
      { nombre: 'Flat White' },
      { nombre: 'Latte' },
      { nombre: 'Mocha' },
      { nombre: 'Affogato' },
      { nombre: 'Café de la Casa Bunna', destacado: true },
      { nombre: 'Café de Temporada' },
      { nombre: 'Café Premium de Microlote', destacado: true },
      { nombre: 'Método del Día' },
    ],
  },
  {
    slug: 'lattes-de-autor',
    nombre: 'Lattes de Autor',
    descripcion: 'Espresso con acentos de temporada: especias, vainilla, caramelo, avellana.',
    acento: 'cafe',
    items: [
      { nombre: 'Latte Especiado' },
      { nombre: 'Latte de Temporada' },
      { nombre: 'Latte Vainilla' },
      { nombre: 'Latte Caramelo' },
      { nombre: 'Latte Avellana' },
    ],
  },
  {
    slug: 'frios-cold-brew',
    nombre: 'Fríos & Cold Brew',
    descripcion: 'Extracción en frío y bebidas heladas para el mediodía en Cuenca.',
    acento: 'cafe',
    items: [
      { nombre: 'Cold Brew' },
      { nombre: 'Cold Brew Naranja' },
      { nombre: 'Cold Brew Tonic' },
      { nombre: 'Iced Latte' },
      { nombre: 'Iced Americano' },
      { nombre: 'Iced Mocha' },
      { nombre: 'Matcha Latte' },
      { nombre: 'Matcha Frío' },
    ],
  },
  {
    slug: 'experiencia-cata',
    nombre: 'Experiencia & Métodos',
    descripcion: 'Café de origen servido con el método correcto, en vivo, en tu mesa.',
    acento: 'verde',
    items: [
      { nombre: 'V60' },
      { nombre: 'Chemex' },
      { nombre: 'Aeropress' },
      { nombre: 'Prensa Francesa' },
      { nombre: 'Sifón Japonés' },
      { nombre: 'Kalita Wave' },
      { nombre: 'Origami Dripper' },
      { nombre: 'Cata de Café', destacado: true },
      { nombre: 'Vuelo de Cafés 3 Orígenes', destacado: true },
    ],
  },
  {
    slug: 'cocteleria-con-cafe',
    nombre: 'Coctelería de Autor con Café',
    descripcion: 'Nuestra firma: el espresso cruza la barra de cócteles.',
    acento: 'cafe',
    items: [
      { nombre: 'Espresso Martini' },
      { nombre: 'Coffee Negroni' },
      { nombre: 'Irish Coffee' },
      { nombre: 'Carajillo' },
      { nombre: 'Espresso Tonic' },
      { nombre: 'Cóctel Autor Café', destacado: true },
      { nombre: 'Cóctel Autor Bunna', destacado: true },
    ],
  },
  {
    slug: 'cocteleria-clasica',
    nombre: 'Coctelería Clásica',
    descripcion: 'Los clásicos de siempre, para quien prefiere sin café.',
    acento: 'verde',
    items: [
      { nombre: 'Gin Tonic' },
      { nombre: 'Mojito' },
      { nombre: 'Margarita' },
      { nombre: 'Aperol Spritz' },
      { nombre: 'Moscow Mule' },
    ],
  },
  {
    slug: 'refrescos-sin-cafe',
    nombre: 'Refrescos & Sin Café',
    descripcion: 'Limonadas, sodas y aguas saborizadas para refrescar.',
    acento: 'verde',
    items: [
      { nombre: 'Limonadas' },
      { nombre: 'Sodas Italianas' },
      { nombre: 'Aguas Saborizadas' },
      { nombre: 'Agua Mineral' },
      { nombre: 'Orange Coffee' },
      { nombre: 'Chai Latte' },
      { nombre: 'Dirty Chai' },
      { nombre: 'Chai Frío' },
    ],
  },
  {
    slug: 'tes-infusiones',
    nombre: 'Tés & Infusiones',
    descripcion: 'Hoja y hierba, para el momento pausado.',
    acento: 'verde',
    items: [
      { nombre: 'Té Negro' },
      { nombre: 'Té Verde' },
      { nombre: 'Té de Frutas' },
      { nombre: 'Té de Hierbas' },
      { nombre: 'Infusiones Naturales' },
    ],
  },
  {
    slug: 'para-comer',
    nombre: 'Para Comer',
    descripcion: 'Algo salado o dulce para acompañar tu bebida.',
    acento: 'cafe',
    items: [
      { nombre: 'Jamón Queso' },
      { nombre: 'Pollo Pesto' },
      { nombre: 'Roast Beef' },
      { nombre: 'Caprese' },
      { nombre: 'Jamón Serrano' },
      { nombre: 'Cheesecake' },
    ],
  },
];
