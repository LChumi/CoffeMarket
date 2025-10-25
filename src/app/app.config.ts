import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration} from "@angular/common/http";
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideToastr} from "ngx-toastr";
import {errorHandlerInterceptor} from "@handler/error-handler.interceptor";
import {csrfInterceptorInterceptor} from "@handler/csrf-interceptor.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({
      timeOut: 10000,
      preventDuplicates: true,
    }),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withFetch(),
      withXsrfConfiguration({
        cookieName : 'XSRF-TOKEN',
        headerName : 'X-XSRF-TOKEN',
      }),
      withInterceptors([errorHandlerInterceptor, csrfInterceptorInterceptor])),
    provideClientHydration(withEventReplay()),
  ]
};
