import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {SidebarService} from "@services/data/sidebar.service";

@Component({
  selector: 'app-admin-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './admin-navbar.component.html',
  styles: ``
})
export class AdminNavbarComponent {

  private sidebarService = inject(SidebarService);

  sidebarOpen() {
    this.sidebarService.toggle();
  }
}
