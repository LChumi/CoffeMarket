import {inject, PLATFORM_ID, Service} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

@Service()
export class MetaPixelService {

  private platformId = inject(PLATFORM_ID);

  track(event: string, params: Record<string, unknown> = {}, eventId?: string){
    if (!isPlatformBrowser(this.platformId) || typeof window.fbq !== 'function') return;

    const id = eventId ?? crypto.randomUUID();

    window.fbq('track', event, params, {
      eventID: id
    });
  }

}
