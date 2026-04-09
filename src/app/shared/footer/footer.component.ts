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
  styles: `
    .icon-mask {
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      -webkit-mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;
    }
  `
})
export class FooterComponent {

  mail: string = 'bunnacoffeemp@gmail.com'
  date = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  redes = REDES_MOCK;
}
