import {Component, inject, OnInit} from '@angular/core';
import {FooterComponent} from "@shared/footer/footer.component";
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {Meta, Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

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
  private router = inject(Router);
  private domain = environment.domain;
  private document = inject(DOCUMENT);

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;
    this.titleService.setTitle('Sobre Nosotros | Bunna Café de Especialidad');
    this.metaService.updateTag({
      name: 'description',
      content: 'Conoce mas acerca de nosotros'
    });

    const link:HTMLLinkElement = this.document.createElement('link')
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', currentUrl);
    this.document.head.appendChild(link);
  }
}
