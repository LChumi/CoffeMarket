import {inject, Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import clarity from '@microsoft/clarity'
import {filter} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClarityService  {
  private router = inject(Router);
  private initialized = false;

  init(projectId: string) {
    if (!this.initialized && typeof window !== 'undefined') {
      clarity.init(projectId);
      this.initialized = true;
      this.trackAllRoutes();
    }
  }

  identify(userId: string, username?: string) {
    clarity.identify(userId, undefined, undefined, username);
  }

  setTag(key: string, value?: string) {
    if (value && value.trim() !== '') {
      clarity.setTag(key, value);
    }
  }

  event(name: string) {
    if (name && name.trim() !== '') {
      clarity.event(name);
    }
  }

  prioritize(reason: string) {
    if (reason && reason.trim() !== '') {
      clarity.upgrade(reason);
    }
  }

  private trackAllRoutes() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects.toLowerCase().split('?')[0];

      clarity.setTag('page', currentUrl);
      clarity.event(`Ruta visitada: ${currentUrl}`);
    });
  }
}
