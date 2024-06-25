import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,CarouselComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export default class HomeComponent {

}
