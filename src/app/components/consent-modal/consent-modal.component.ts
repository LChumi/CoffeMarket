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

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const triggerModal = () => {
        if (!this.consentService.hasConsented()) {
          this.showModal = true;
        }
        window.removeEventListener('scroll', triggerModal);
        window.removeEventListener('click', triggerModal);
      };

      window.addEventListener('scroll', triggerModal);
      window.addEventListener('click', triggerModal);
    }
  }

  accept() {
    this.consentService.setConsent(true);
    this.showModal = false;
  }

}
