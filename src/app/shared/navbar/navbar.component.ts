import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styles: [`
    .active-link {
      text-decoration: underline;
      color: #c4b89b;
      transition: color 0.3s ease, text-decoration 0.3s ease;
    }

    svg-shop {
      color: #c4b89b;
      transition: color 0.3s ease;
    }

  `]
})
export class NavbarComponent {

  router = inject(Router)
  mobileMenu = false;

}
