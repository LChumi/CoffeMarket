import {Component, inject, OnInit} from '@angular/core';
import {FooterComponent} from "@shared/footer/footer.component";
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {Meta, Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {MetaService} from "@services/seo/meta.service";
import {SchemaService} from "@services/seo/schema.service";

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
  private canonicalService = inject(MetaService)
  private schemaService = inject(SchemaService);
  private domain = environment.domain;

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;
    this.canonicalService.updateCanonical(currentUrl);

    this.titleService.setTitle('Quiénes Somos | Bunna Accesorios para Café');
    this.metaService.updateTag({
      name: 'description',
      content: 'Conoce la historia de Bunna y nuestra pasión por los accesorios de café: calidad, diseño y experiencia barista.'
    });

  }
}
