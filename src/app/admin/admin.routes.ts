import {Route} from "@angular/router";
import {LayoutComponent} from "@admin/layout/layout.component";
import {authGuardGuard} from "@guards/auth-guard.guard";

export const AdminRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuardGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), title: 'Dashboard | Admin Bunna Shop' },
      { path: 'users', loadComponent: () => import('./pages/admin-usuarios/admin-usuarios.component').then(m => m.AdminUsuariosComponent), title: 'Usuarios | Admin Bunna Shop' },
      { path: 'products', loadComponent: () => import('./pages/admin-products/admin-products.component').then(m => m.AdminProductsComponent), title: 'Productos | Admin Bunna Shop' },
      { path: 'orders', loadComponent: () => import('./pages/admin-orders/admin-orders.component').then(m => m.AdminOrdersComponent), title: 'Pedidos | Admin Bunna Shop' },
      { path: 'clients', loadComponent: () => import('./pages/admin-clients/admin-clients.component').then(m => m.AdminClientsComponent), title: 'Clientes | Admin Bunna Shop' },
    ]
  },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'Inicio Sesion | Admin Bunna Shop' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
