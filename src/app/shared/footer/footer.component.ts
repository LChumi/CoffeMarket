import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from "@angular/router";
import {REDES_MOCK} from "@mocks/redes";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  date = new Date().getFullYear();
  email = "luischumi.9@gmail.com"

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  redes = REDES_MOCK;
}
