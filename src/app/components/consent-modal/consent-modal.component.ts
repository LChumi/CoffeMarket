import {Component, inject} from '@angular/core';
import {ConsentService} from "@services/consent.service";

@Component({
  selector: 'app-consent-modal',
  standalone: true,
  imports: [],
  templateUrl: './consent-modal.component.html',
  styles: ``
})
export class ConsentModalComponent {

  showModal = false;

  consentService = inject(ConsentService);

  constructor() {
    this.showModal = ! this.consentService.hasConsented();
  }

  accept() {
    this.consentService.setConsent(true);
    this.showModal = false;
  }

  reject() {
    this.consentService.setConsent(false);
    this.showModal = false;
  }

}
