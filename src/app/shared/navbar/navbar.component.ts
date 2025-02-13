import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styles: [`
    .active-link {
      text-decoration: underline;
    }
  `]
})
export class NavbarComponent {

  mobileMenu = false;

}
