import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from '@shared/navbar/navbar.component';
import {CarouselComponent} from '@components/carousel/carousel.component';
import {FooterComponent} from '@shared/footer/footer.component';
import {BoxesIconsComponent} from '@components/boxes-icons/boxes-icons.component';
import {CategoriesGridComponent} from '@components/categories-grid/categories-grid.component';
import {WhatsappButtonComponent} from "@components/whatsapp-button/whatsapp-button.component";
import {Meta, Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {MetaService} from "@services/meta.service";
import {SchemaService} from "@services/schema.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CarouselComponent, FooterComponent, BoxesIconsComponent, CategoriesGridComponent, WhatsappButtonComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export default class HomeComponent implements OnInit {

  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private canonicalService = inject(MetaService)
  private schemaService = inject(SchemaService)
  private domain = environment.domain;

    ngOnInit(): void {
      const currentUrl = `${this.domain}${this.router.url}`;
      const schema = this.schemaService.generateWebSiteSchema(this.domain);

      this.canonicalService.updateCanonical(currentUrl);
      this.schemaService.insertSchema(schema, 'WebSite');

      this.titleService.setTitle('Inicio | Bunna');
      this.metaService.updateTag({
          name: 'description',
          content: 'Bienvenidos a Bunna Caffe'
        });
    }

}
