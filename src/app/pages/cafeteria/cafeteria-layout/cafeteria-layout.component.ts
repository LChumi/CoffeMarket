import { Component, ChangeDetectionStrategy } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-cafeteria-layout',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './cafeteria-layout.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export class CafeteriaLayoutComponent {

}
