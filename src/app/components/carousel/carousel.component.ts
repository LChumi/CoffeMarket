import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  private intervalId: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startCarousel();
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    const slides = document.querySelectorAll('.carousel-open');
    let currentIndex = 0;

    this.intervalId = setInterval(() => {
      slides[currentIndex].removeAttribute('checked');
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].setAttribute('checked', 'checked');
    }, 3000); // Cambia la imagen cada 3 segundos
  }
}
