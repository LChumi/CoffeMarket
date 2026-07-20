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
    slug: 'cafes-espresso',
    nombre: 'Cafés Espresso',
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
      { nombre: 'Latte Vainilla' },
      { nombre: 'Latte Caramelo' },
      { nombre: 'Latte Avellana' },
    ],
  },
  {
    slug: 'cafes-filtrados',
    nombre: 'Cafés Filtrados',
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
    ],
  },
  {
    slug: 'cafes-frios',
    nombre: 'Cafés Fríos',
    descripcion: 'Extracción en frío y bebidas heladas para el mediodía en Cuenca.',
    acento: 'cafe',
    items: [
      { nombre: 'Cold Brew' },
      { nombre: 'Cold Brew Tonic' },
      { nombre: 'Iced Latte' },
      { nombre: 'Iced Americano' },
      { nombre: 'Iced Mocha' },
      { nombre: 'Affogato' },
    ],
  },
  {
    slug: 'cafes-de-autor-bunna',
    nombre: 'Cafés de Autor Bunna',
    descripcion: 'Nuestra firma: creaciones propias que no vas a encontrar en otro lado.',
    acento: 'cafe',
    items: [
      { nombre: 'Espresso Tonic', destacado: true },
      { nombre: 'Orange Coffee', destacado: true },
      { nombre: 'Cold Brew Naranja' },
      { nombre: 'Latte Especiado' },
      { nombre: 'Latte de Temporada' },
      { nombre: 'Café de la Casa Bunna', destacado: true },
    ],
  },
  {
    slug: 'experiencias-de-cafe',
    nombre: 'Experiencias de Café',
    descripcion: 'Para quien quiere ir más allá de la taza: cata, origen y microlotes.',
    acento: 'verde',
    items: [
      { nombre: 'Cata de Café', destacado: true },
      { nombre: 'Vuelo de Cafés (3 Orígenes)', destacado: true },
      { nombre: 'Método del Día' },
      { nombre: 'Café de Temporada' },
      { nombre: 'Café Premium de Microlote', destacado: true },
    ],
  },
  {
    slug: 'tes-e-infusiones',
    nombre: 'Tés e Infusiones',
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
    slug: 'chai-y-matcha',
    nombre: 'Chai y Matcha',
    descripcion: 'Especias y té verde ceremonial, con o sin hielo.',
    acento: 'verde',
    items: [
      { nombre: 'Chai Latte' },
      { nombre: 'Dirty Chai' },
      { nombre: 'Chai Frío' },
      { nombre: 'Matcha Latte' },
      { nombre: 'Matcha Frío' },
    ],
  },
  {
    slug: 'bebidas-frias',
    nombre: 'Bebidas Frías',
    descripcion: 'Limonadas, sodas y aguas saborizadas para refrescar.',
    acento: 'verde',
    items: [
      { nombre: 'Limonadas' },
      { nombre: 'Sodas Italianas' },
      { nombre: 'Aguas Saborizadas' },
      { nombre: 'Agua Mineral' },
    ],
  },
  {
    slug: 'cocteleria-con-cafe',
    nombre: 'Coctelería con Café',
    descripcion: 'El espresso cruza la barra de cócteles.',
    acento: 'cafe',
    items: [
      { nombre: 'Espresso Martini' },
      { nombre: 'Carajillo' },
      { nombre: 'Irish Coffee' },
      { nombre: 'Coffee Negroni' },
      { nombre: 'Cócteles de Autor con Café', destacado: true },
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
      { nombre: 'Cócteles de Autor Bunna', destacado: true },
    ],
  },
  {
    slug: 'vinos-y-cervezas',
    nombre: 'Vinos y Cervezas',
    descripcion: 'Tintos, blancos, espumantes y cerveza nacional o artesanal.',
    acento: 'verde',
    items: [
      { nombre: 'Vino Tinto' },
      { nombre: 'Vino Blanco' },
      { nombre: 'Vino Espumante' },
      { nombre: 'Copa o Botella' },
      { nombre: 'Cerveza Nacional' },
      { nombre: 'Cerveza Artesanal' },
    ],
  },
  {
    slug: 'sanduches-y-postres',
    nombre: 'Sánduches y Postres',
    descripcion: 'Algo salado o dulce para acompañar tu bebida.',
    acento: 'cafe',
    items: [
      { nombre: 'Jamón y Queso' },
      { nombre: 'Pollo Pesto' },
      { nombre: 'Roast Beef' },
      { nombre: 'Caprese' },
      { nombre: 'Jamón Serrano' },
      { nombre: 'Cheesecake' },
      { nombre: 'Brownie' },
      { nombre: 'Torta de Chocolate' },
      { nombre: 'Carrot Cake' },
      { nombre: 'Tiramisú' },
      { nombre: 'Tartas de Temporada' },
      { nombre: 'Croissants Artesanales' },
    ],
  },
  {
    slug: 'picadas-y-tablas',
    nombre: 'Picadas y Tablas',
    descripcion: 'Para compartir: quesos, embutidos y maridaje vino-café.',
    acento: 'cafe',
    items: [
      { nombre: 'Tabla de Quesos y Embutidos', destacado: true },
      { nombre: 'Tabla para Compartir' },
      { nombre: 'Tabla Maridaje Vino y Café', destacado: true },
    ],
  },
];

