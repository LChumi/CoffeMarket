import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConsentModalComponent} from "@components/consent-modal/consent-modal.component";
import {SchemaService} from "@services/seo/schema.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsentModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

  private schemaService = inject(SchemaService)

  title = 'Bunna Shop';

  constructor() {
    const schema = this.schemaService.generateIndexSchema();
    this.schemaService.injectSchema(schema, 'WebSite');
  }

}
