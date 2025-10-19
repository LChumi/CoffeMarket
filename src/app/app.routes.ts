import {Routes} from '@angular/router';
import ProductsComponent from "@pages/products/products.component";
import {SingleProductComponent} from "@pages/single-product/single-product.component";
import {ProductoResolver} from "./core/resolvers/producto.resolver";
import {ProductosResolver} from "./core/resolvers/productos.resolver";
import CheckoutComponent from "@pages/checkout/checkout.component";
import HomeComponent from "@pages/home/home.component";
import AboutComponent from "@pages/about/about.component";

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
    component: ProductsComponent
  },
  {
    path: 'productos/:categoryId',
    loadComponent: () => import('./pages/products/products.component'),
    resolve: { productos: ProductosResolver },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'producto/:productoId',
    loadComponent: () => import('./pages/products/products.component'),
    resolve: { producto: ProductoResolver },
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
        loadComponent: () => import('./pages/order-received/order-received.component')},
    ]
  },
  {path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component')},
  { path: 'producto', redirectTo: 'products', pathMatch: 'full' },
  { path: 'productos', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
