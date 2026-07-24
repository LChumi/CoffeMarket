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

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Bunna Shop Cafe de Especialidad | Tienda de cafe y cafeteria en Cuenca',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'Quienes Somos | Bunna Accesorios para Cafe'
  },
  {
    path: 'products',
    loadComponent: () => import("./pages/products/products.component"),
    resolve: {productos: productosResolver},
    title: 'Catalogo de Accesorios para Cafe | Bunna Shop',
    runGuardsAndResolvers: "always"
  },
  {
    path: 'productos/:categoryId',
    loadComponent: () => import('./pages/products/products.component'),
    resolve: {productos: productosCategoryResolver},
    title: 'Catalogo de Accesorios para Cafe por categoria | Bunna Shop',
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'producto/:productoId',
    loadComponent: () => import('./pages/single-product/single-product.component'),
    resolve: {producto: productoResolver},
    title: 'Producto unico | Accesorio para Cafe | Bunna',
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/shoping-cart/shoping-cart.component'),
    title: 'Carrito Compras | Bunna Accesorios para Cafe',
  },
  {
    path: 'checkout',
    children: [
      {path: '', component: CheckoutComponent, title: 'Pagina de Pago| Bunna Accesorios para Cafe'},
      {
        path: 'order/:orderId',
        loadComponent: () => import('./pages/order-received/order-received.component'),
        resolve: {pedido: pedidoResolver},
        title: 'Resumen de Pedido Generado | Bunna Accesorios para Cafe',
        runGuardsAndResolvers: 'always'
      },
    ]
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component'),
    title: 'Pagina de Politica de privacidad | Bunna Shop'
  },
  {
    path: 'returns-and-refunds-policy',
    loadComponent: () => import('./pages/returns-and-refunds-policy/returns-and-refunds-policy.component'),
    title: 'Pagina de Politica de Devoluciones | Bunna Shop'
  },
  {path: 'cafeteria', component: CafeteriaLayoutComponent, children: CafeteriaRoutes},
  {path: 'admin', children: AdminRoutes},
  {path: 'producto', redirectTo: 'products', pathMatch: 'full'},
  {path: 'productos', redirectTo: 'products', pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
