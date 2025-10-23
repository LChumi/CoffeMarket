import {Component, HostListener, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SidebarService} from "@services/data/sidebar.service";
import {clearSessionItems, getSessionItem} from "@utils/storage-utils";
import {AuthService} from "@services/auth/auth.service";

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
  private authService = inject(AuthService);
  private router = inject(Router);
  protected username: string | null = '';

  constructor() {
    this.username = getSessionItem('username')
  }

  sidebarOpen() {
    this.sidebarService.toggle();
  }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    clearSessionItems()
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/admin/login']).then(() => {
        })
      }
    })
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('#dropdown-user') || target.closest('button');
    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }


}
