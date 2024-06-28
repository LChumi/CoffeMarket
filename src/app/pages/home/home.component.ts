import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BoxesIconsComponent } from '../../components/boxes-icons/boxes-icons.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,CarouselComponent,FooterComponent,BoxesIconsComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export default class HomeComponent {

}
