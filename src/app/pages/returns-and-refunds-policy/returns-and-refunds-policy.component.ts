import { Component } from '@angular/core';
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {FooterComponent} from "@shared/footer/footer.component";

@Component({
  selector: 'app-returns-and-refunds-policy',
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './returns-and-refunds-policy.component.html',
  styles: ``
})
export default class ReturnsAndRefundsPolicyComponent {

  protected emailInfo: string = 'bunnacoffeemp@gmail.com';

}
