import {ApplicationConfig} from '@angular/core';
import {provideRouter, withInMemoryScrolling, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideClientHydration, withEventReplay, withNoIncrementalHydration} from '@angular/platform-browser';
import {errorHandlerInterceptor} from "@handler/error-handler.interceptor";
import {credentialsInterceptor} from "@handler/credentials.interceptor";
import {ConfirmationService, MessageService} from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    MessageService,
    ConfirmationService,
    provideHttpClient(
      withInterceptors([
        errorHandlerInterceptor,
        credentialsInterceptor
      ])),
    provideClientHydration(
      withEventReplay(),
      withNoIncrementalHydration()),
  ]
};
