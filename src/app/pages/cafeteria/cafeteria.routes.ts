import {Route} from "@angular/router";

export const CafeteriaRoutes: Route[] = [
  {
    path: '', loadComponent: () => import('./cafeteria/cafeteria.component').then(m => m.CafeteriaComponent),
    title: 'Cafetería Bunna | Challuabamba, Cuenca'
  },
  {
    path: 'ubicacion', loadComponent: () => import('./ubicacion/ubicacion.component').then(m => m.UbicacionComponent),
    title: 'Ubicanos | Bunna Cuenca',
  }
];
