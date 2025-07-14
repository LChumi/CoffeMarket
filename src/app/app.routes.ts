import {Routes} from '@angular/router';
import ProductsComponent from "@pages/products/products.component";
import {SingleProductComponent} from "@pages/single-product/single-product.component";
import {ProductoResolver} from "./core/resolvers/producto.resolver";
import {ProductosResolver} from "./core/resolvers/productos.resolver";

export const routes: Routes = [
  {
    path: 'bunna',
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component')
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component')
      },
      {
        path: 'productos/:categoryId', component: ProductsComponent,
        resolve: {productos: ProductosResolver},
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'producto/:productoId', component: SingleProductComponent,
        resolve: {producto: ProductoResolver},
        runGuardsAndResolvers: 'always'
      },
      {path: 'producto', redirectTo: '/bunna/products', pathMatch: 'full'},
      {path: 'productos', redirectTo: '/bunna/products', pathMatch: 'full'},
    ]
  },
  {path: '', redirectTo: '/bunna/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/bunna/home', pathMatch: 'full'}
];
