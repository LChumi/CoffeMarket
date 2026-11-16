import { Component } from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "@shared/footer/footer.component";
import {WhatsappButtonComponent} from "@components/whatsapp-button/whatsapp-button.component";
import {ConsentModalComponent} from "@components/consent-modal/consent-modal.component";

@Component({
  selector: 'app-storefront-layout',
  imports: [
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    WhatsappButtonComponent,
    ConsentModalComponent
  ],
  template: `
    <div class="min-h-dvh flex flex-col bg-[#FAF8F5] dark:bg-[#0F0D0C]">
      <header class="sticky top-0 z-50 w-full">
        <app-navbar />
      </header>
      <main id="contenido" class="flex-1">
        <router-outlet />
      </main>
      <app-footer />
      <app-whatsapp-button />
      <app-consent-modal />
    </div>
  `,
  styles: ``,
})
export class StorefrontLayoutComponent {

}
