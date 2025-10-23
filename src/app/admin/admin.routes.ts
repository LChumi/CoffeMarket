import {Route} from "@angular/router";
import {LayoutComponent} from "@admin/layout/layout.component";
import {authGuardGuard} from "@guards/auth-guard.guard";

export const AdminRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuardGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // 👈 esta línea es clave
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'users', loadComponent: () => import('./pages/admin-usuarios/admin-usuarios.component').then(m => m.AdminUsuariosComponent) },
      { path: 'products', loadComponent: () => import('./pages/admin-products/admin-products.component').then(m => m.AdminProductsComponent) },
      { path: 'orders', loadComponent: () => import('./pages/admin-orders/admin-orders.component').then(m => m.AdminOrdersComponent) },
      { path: 'clients', loadComponent: () => import('./pages/admin-clients/admin-clients.component').then(m => m.AdminClientsComponent) },
    ]
  },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
