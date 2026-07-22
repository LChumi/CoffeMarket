import { Component } from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "@shared/footer/footer.component";

@Component({
  selector: 'app-cafeteria-layout',
  imports: [
    NavbarComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './cafeteria-layout.component.html',
  styles: ``
})
export class CafeteriaLayoutComponent {

}
