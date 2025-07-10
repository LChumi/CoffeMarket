import {Component, inject, OnInit} from '@angular/core';
import {FooterComponent} from "@shared/footer/footer.component";
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {Meta, Title} from "@angular/platform-browser";

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
export default class AboutComponent implements OnInit {

  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Sobre Nosotros | Bunna Café de Especialidad');
    this.metaService.updateTag({
      name: 'description',
      content: 'Conoce mas acerca de nosotros'
    });
  }
}
