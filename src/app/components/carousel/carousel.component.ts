import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

interface Slide {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  cta: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {

  slides: Slide[] = [
    {
      id: 1,
      image: 'images/slidebar/coffe_slide1.webp',
      eyebrow: 'Bunna Café',
      title: 'Bienvenidos a nuestro rincón del café',
      cta: 'Explorar productos'
    },
    {
      id: 2,
      image: 'images/slidebar/coffe_slide2.webp',
      eyebrow: 'Especialidad',
      title: 'Explora, saborea y disfruta',
      cta: 'Ver selección'
    },
    {
      id: 3,
      image: 'images/slidebar/coffe_slide4.webp',
      eyebrow: 'Cada día',
      title: 'Café, la mejor parte de cada día',
      cta: 'Conocer más'
    },
  ];

  currentSlide = 0;
  progressWidth = 0;

  private readonly autoDelay = 5000;
  private rafId: number | null = null;
  private autoTimer: any = null;
  private progressStart: number | null = null;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => this.startProgress());
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  goTo(index: number) {
    this.currentSlide = (index + this.slides.length) % this.slides.length;
    this.clearTimers();
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.startProgress());
    });
  }

  next() { this.goTo(this.currentSlide + 1); }
  prev() { this.goTo(this.currentSlide - 1); }

  private startProgress() {
    this.progressStart = null;
    const animate = (ts: number) => {
      if (!this.progressStart) this.progressStart = ts;
      const pct = Math.min(((ts - this.progressStart) / this.autoDelay) * 100, 100);
      this.ngZone.run(() => this.progressWidth = pct);
      if (pct < 100) {
        this.rafId = requestAnimationFrame(animate);
      } else {
        this.ngZone.run(() => this.next());
      }
    };
    this.rafId = requestAnimationFrame(animate);
  }

  private clearTimers() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.autoTimer) clearTimeout(this.autoTimer);
  }
}
