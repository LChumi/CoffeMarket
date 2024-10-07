import { Component } from '@angular/core';
import {FooterComponent} from "../../shared/footer/footer.component";
import {NavbarComponent} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './about.component.html',
  styles: ``
})
export default class AboutComponent {

}
