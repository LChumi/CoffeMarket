import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'bunna',
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
    {path:'', redirectTo:'bunna/home',pathMatch:'full'},
    {path:'**', redirectTo:'bunna/home', pathMatch:'full'}
];
