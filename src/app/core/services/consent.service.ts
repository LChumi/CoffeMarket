import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}


@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  private isBrowser: boolean;
  private consentKey = 'user-consent';

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  hasConsented(): boolean {
    if (!this.isBrowser) return false;
    return localStorage.getItem(this.consentKey) === 'true';
  }

  setConsent(consent: boolean) {
    if (!this.isBrowser) return;
    localStorage.setItem(this.consentKey, consent ? 'true' : 'false');
    if (consent) {
      this.loadGtagScript();
    }
  }

  private loadGtagScript() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17007241092';
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){window.dataLayer.push(arguments);}
      window.gtag('js', new Date());
      window.gtag('config', 'AW-17007241092');

      // Opcional: actualizar Consent Mode explícitamente
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });
    }

  }

}
