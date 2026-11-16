import {Routes} from '@angular/router';
import CheckoutComponent from "@pages/checkout/checkout.component";
import HomeComponent from "@pages/home/home.component";
import AboutComponent from "@pages/about/about.component";
import {pedidoResolver} from "@resolvers/pedido.resolver";
import {productoResolver} from "@resolvers/producto.resolver";
import {productosCategoryResolver} from "@resolvers/productos-category.resolver";
import {productosResolver} from "@resolvers/productos.resolver";
import {AdminRoutes} from "@admin/admin.routes";
import {CafeteriaRoutes} from "@pages/cafeteria/cafeteria.routes";
import {CafeteriaLayoutComponent} from "@pages/cafeteria/cafeteria-layout/cafeteria-layout.component";
import {authGuardGuard} from "@guards/auth-guard.guard";
import {LayoutComponent} from "@admin/layout/layout.component";
import {StorefrontLayoutComponent} from "@pages/storefront-layout/storefront-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: StorefrontLayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: '...' },
      { path: 'about', component: AboutComponent, title: '...' },
      {
        path: 'products',
        //component: CatalogLayoutComponent,   // sidebar + subheader de catálogo
        children: [
          { path: '', loadComponent: () => import('./pages/products/products.component'),
            resolve: { productos: productosResolver }, title: '...' },
          { path: ':categoryId', loadComponent: () => import('./pages/products/products.component'),
            resolve: { productos: productosCategoryResolver }, title: '...' },
        ],
      },
      { path: 'producto/:productoId', loadComponent: () => import('./pages/single-product/single-product.component'),
        resolve: { producto: productoResolver }, title: '...' },
      { path: 'cart', loadComponent: () => import('./pages/shoping-cart/shoping-cart.component'), title: '...' },
      { path: 'checkout', children: [
          { path: '', component: CheckoutComponent, title: '...' },
          { path: 'order/:orderId', loadComponent: () => import('./pages/order-received/order-received.component'),
            resolve: { pedido: pedidoResolver }, title: '...' },
        ]},
      { path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component'), title: '...' },
      { path: 'returns-and-refunds-policy', loadComponent: () => import('./pages/returns-and-refunds-policy/returns-and-refunds-policy.component'), title: '...' },
      { path: 'cafeteria', component: CafeteriaLayoutComponent, children: CafeteriaRoutes },
    ],
  },
  { path: 'auth', loadComponent: () => import('./admin/pages/login/login.component').then(m => m.LoginComponent), title: '...' },
  { path: 'admin', canActivate: [authGuardGuard], component: LayoutComponent, children: AdminRoutes },
  { path: 'producto', redirectTo: 'products', pathMatch: 'full' },
  { path: 'productos', redirectTo: 'products', pathMatch: 'full' },
  { path: 'productos/:categoryId', redirectTo: 'products/:categoryId' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
