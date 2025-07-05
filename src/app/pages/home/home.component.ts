import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from '@shared/navbar/navbar.component';
import {CarouselComponent} from '@components/carousel/carousel.component';
import {FooterComponent} from '@shared/footer/footer.component';
import {BoxesIconsComponent} from '@components/boxes-icons/boxes-icons.component';
import {CategoriesGridComponent} from '@components/categories-grid/categories-grid.component';
import {WhatsappButtonComponent} from "@components/whatsapp-button/whatsapp-button.component";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CarouselComponent, FooterComponent, BoxesIconsComponent, CategoriesGridComponent, WhatsappButtonComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export default class HomeComponent implements OnInit {

  titleService = inject(Title);
  metaService = inject(Meta);

    ngOnInit(): void {
      this.titleService.setTitle('Inicio | Bunna');
      this.metaService.updateTag({
          name: 'description',
          content: 'Bienvenidos a Bunna Caffe'
        });
    }

}
