import {Component, HostListener, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SidebarService} from "@services/data/sidebar.service";
import {clearSessionItems, getSessionItem} from "@utils/storage-utils";
import {AuthService} from "@services/auth/auth.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-admin-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './admin-navbar.component.html',
  styles: ``
})
export class AdminNavbarComponent implements OnInit {

  private sidebarService = inject(SidebarService);
  private authService = inject(AuthService);
  private router = inject(Router);
  protected username: string | null = '';
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.username = getSessionItem('username')
    }
  }

  sidebarOpen() {
    this.sidebarService.toggle();
  }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      clearSessionItems()
    }
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth']).then(() => {
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
