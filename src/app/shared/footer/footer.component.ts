import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {REDES_MOCK} from "@mocks/redes";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  date = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  redes = REDES_MOCK;
}
