import {AfterViewInit, Component, inject} from '@angular/core';
import {ConsentService} from "@services/seo/consent.service";

@Component({
  selector: 'app-consent-modal',
  standalone: true,
  imports: [],
  templateUrl: './consent-modal.component.html',
  styles: ``
})
export class ConsentModalComponent implements AfterViewInit{

  showModal = false;

  consentService = inject(ConsentService);

  constructor() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showModal = ! this.consentService.hasConsented();
    }, 2000)
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
