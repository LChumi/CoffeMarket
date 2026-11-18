import {Component, inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from "@angular/router";
import {isPlatformBrowser, NgClass, NgStyle} from "@angular/common";

interface Slide {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  route: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgStyle
  ],
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);

  slides: Slide[] = [
    {
      id: 1,
      image: 'images/slidebar/coffe_slide1.webp',
      eyebrow: 'Bunna Café',
      title: 'Bienvenidos a nuestro rincón del café',
      sub: 'Café de especialidad tostado artesanalmente en Cuenca',
      cta: 'Explorar productos',
      route: '/products'
    },
    {
      id: 2,
      image: 'images/slidebar/coffe_slide2.webp',
      eyebrow: 'Especialidad',
      title: 'Explora, saborea y disfruta',
      sub: 'Cada taza cuenta una historia de sabor y tradición',
      cta: 'Ver selección',
      route: '/products'
    },
    {
      id: 3,
      image: 'images/slidebar/coffe_slide4.webp',
      eyebrow: 'Cada día',
      title: 'Café, la mejor parte de cada día',
      sub: 'Despierta con el aroma que marca la diferencia',
      cta: 'Conocer más',
      route: '/products'
    },
    {
      id: 4,
      image: 'images/slidebar/cafeteria.webp',
      eyebrow: 'Tu nueva experiencia de café en Cuenca',
      title: 'El rincón perfecto para tu café favorito',
      sub: 'Visita nuestra cafetería y descubre cada sabor',
      cta: 'Conocer más',
      route: '/cafeteria'
    },
  ];

  currentSlide = 0;
  progressWidth = 0;

  private readonly autoDelay = 5000;
  private rafId: number | null = null;
  private progressStart: number | null = null;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return
    }
    this.ngZone.runOutsideAngular(() => this.startProgress());
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  goTo(index: number) {
    this.currentSlide = (index + this.slides.length) % this.slides.length;
    this.clearTimers();

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.startProgress());
    });
  }

  next() { this.goTo(this.currentSlide + 1); }
  prev() { this.goTo(this.currentSlide - 1); }

  private startProgress() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
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
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
