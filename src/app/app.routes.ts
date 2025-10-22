import {Routes} from '@angular/router';
import CheckoutComponent from "@pages/checkout/checkout.component";
import HomeComponent from "@pages/home/home.component";
import AboutComponent from "@pages/about/about.component";
import {pedidoResolver} from "./core/resolvers/pedido.resolver";
import {productoResolver} from "./core/resolvers/producto.resolver";
import {productosCategoryResolver} from "./core/resolvers/productos-category.resolver";
import {productosResolver} from "./core/resolvers/productos.resolver";
import {AdminRoutes} from "./admin/admin.routes";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'products',
    loadComponent: () => import("./pages/products/products.component"),
    resolve: { productos: productosResolver},
    runGuardsAndResolvers: "always"
  },
  {
    path: 'productos/:categoryId',
    loadComponent: () => import('./pages/products/products.component'),
    resolve: { productos: productosCategoryResolver },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'producto/:productoId',
    loadComponent: () => import('./pages/single-product/single-product.component'),
    resolve: { producto: productoResolver },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/shoping-cart/shoping-cart.component')
  },
  {
    path: 'checkout',
    children:[
      {path: '', component: CheckoutComponent},
      {path: 'order/:orderId',
        loadComponent: () => import('./pages/order-received/order-received.component'),
        resolve: { pedido: pedidoResolver},
        runGuardsAndResolvers: 'always'
      },
    ]
  },
  {path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component')
  },
  {path: 'admin', children: AdminRoutes},
  { path: 'producto', redirectTo: 'products', pathMatch: 'full' },
  { path: 'productos', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
