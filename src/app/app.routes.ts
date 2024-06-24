import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'coffe-shop',
        children:[
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
            }
        ]
    },
    {path:'', redirectTo:'coffe-shop/home',pathMatch:'full'},
    {path:'**', redirectTo:'coffe-shop/home', pathMatch:'full'}
];
