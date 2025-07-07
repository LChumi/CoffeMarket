import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConsentModalComponent} from "@components/consent-modal/consent-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsentModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'coffe-market';
}
