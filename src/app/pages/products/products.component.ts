import { Component } from '@angular/core';
import {NavbarComponent} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './products.component.html',
  styles: ``
})
export default class ProductsComponent {

}
