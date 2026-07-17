import {AfterViewInit, Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

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

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    // Ya lo vio en esta sesión -> no molestar de nuevo
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const trigger = () => {
      setTimeout(() => {
        this.showModal = true;
        sessionStorage.setItem(STORAGE_KEY, '1');
      }, 1500);
    };

    // Solo scroll, con { once: true } para que se auto-remueva
    window.addEventListener('scroll', trigger, { once: true, passive: true });
  }

  close(): void {
    this.showModal = false;
  }
}
