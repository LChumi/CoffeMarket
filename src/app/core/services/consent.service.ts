import { Injectable } from '@angular/core';

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

  private consentKey = 'userConsent';

  constructor() { }

  hasConsented(): boolean {
    return localStorage.getItem(this.consentKey) === 'true';
  }

  setConsent(consent: boolean) {
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
