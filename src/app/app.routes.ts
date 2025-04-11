import {Routes} from '@angular/router';
import ProductsComponent from "@pages/products/products.component";
import {SingleProductComponent} from "@pages/single-product/single-product.component";

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
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'producto/:productoId', component: SingleProductComponent,
        runGuardsAndResolvers: 'always'
      }
    ]
  },
  {path: '', redirectTo: 'bunna/home', pathMatch: 'full'},
  {path: '**', redirectTo: 'bunna/home', pathMatch: 'full'}
];
