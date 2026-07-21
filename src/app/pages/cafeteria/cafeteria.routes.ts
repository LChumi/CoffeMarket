import {Route} from "@angular/router";

export const CafeteriaRoutes: Route[] = [
  {
    path: '', loadComponent: () => import('./cafeteria/cafeteria.component').then(m => m.CafeteriaComponent),
    title: 'Cafetería Bunna | Challuabamba, Cuenca'
  }
];
