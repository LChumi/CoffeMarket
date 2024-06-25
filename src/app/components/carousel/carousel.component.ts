import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit,OnDestroy {
  private intervalId: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
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