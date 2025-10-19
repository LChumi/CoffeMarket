import { Component } from '@angular/core';
import {FooterComponent} from "@shared/footer/footer.component";
import {NavbarComponent} from "@shared/navbar/navbar.component";

@Component({
  selector: 'app-privacy-policy',
  imports: [
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './privacy-policy.component.html',
  styles: ``
})
export default class PrivacyPolicyComponent {

  protected emailInfo: string='bunnacoffeemp@gmail.com';

}
