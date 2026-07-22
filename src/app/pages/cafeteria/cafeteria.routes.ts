import {Route} from "@angular/router";

export const CafeteriaRoutes: Route[] = [
  {
    path: '', loadComponent: () => import('./cafeteria/cafeteria.component').then(m => m.CafeteriaComponent),
    title: 'Cafetería Bunna | Challuabamba, Cuenca'
  },
  {
    path: 'horarios-ubicacion', loadComponent: () => import('./ubicacion/ubicacion.component').then(m => m.UbicacionComponent),
    title: 'Ubicanos | Bunna Cuenca',
  },
  {
    path: 'menu', loadComponent: () => import('./menus/menus.component').then(m => m.MenusComponent),
    title: 'Menú | Bunna Coffee Shop'
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
