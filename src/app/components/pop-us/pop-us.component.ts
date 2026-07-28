import {AfterViewInit, Component, inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgOptimizedImage} from "@angular/common";

const STORAGE_KEY = 'bunna_promo_seen';

@Component({
  selector: 'app-pop-us',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './pop-us.component.html',
  standalone: true,
  styles: ``
})
export class PopUsComponent implements AfterViewInit {
  showModal = false;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    // Ya lo vio en esta sesión -> no molestar de nuevo
    if (isPlatformBrowser(this.platformId)) {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    }

    const trigger = () => {
      setTimeout(() => {
        this.showModal = true;
        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem(STORAGE_KEY, '1');
        }
      }, 1500);
    };

    // Solo scroll, con { once: true } para que se auto-remueva
    window.addEventListener('scroll', trigger, { once: true, passive: true });
  }

  close(): void {
    this.showModal = false;
  }
}
