import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // SEO en Server
  {path: '', renderMode: RenderMode.Prerender},
  {path: 'about', renderMode: RenderMode.Prerender},
  {path: 'privacy-policy', renderMode: RenderMode.Prerender},
  {path: 'returns-and-refunds-policy', renderMode: RenderMode.Prerender},
  {path: 'cafeteria', renderMode: RenderMode.Prerender},
  {path: 'cafeteria/menu', renderMode: RenderMode.Prerender},
  {path: 'cafeteria/horarios-ubicacion', renderMode: RenderMode.Prerender},
  {path: 'cart', renderMode: RenderMode.Prerender},
  {path: 'checkout', renderMode: RenderMode.Prerender},
  {path: 'products', renderMode: RenderMode.Prerender},

  // Dinámicas en Client
  {path: 'producto/:productoId', renderMode: RenderMode.Client},
  {path: 'productos/:categoryId', renderMode: RenderMode.Client},
  {path: 'checkout/order/:orderId', renderMode: RenderMode.Client},

  // Fallback
  {path: '**', renderMode: RenderMode.Server}
];
