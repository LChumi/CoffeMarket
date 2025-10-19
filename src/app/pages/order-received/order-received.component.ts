import { Component } from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {FooterComponent} from "@shared/footer/footer.component";

@Component({
  selector: 'app-order-received',
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './order-received.component.html',
  styles: ``
})
export default class OrderReceivedComponent {

}
