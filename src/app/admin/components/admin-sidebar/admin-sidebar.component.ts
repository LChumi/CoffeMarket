import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {SidebarService} from "@services/data/sidebar.service";

@Component({
  selector: 'app-admin-sidebar',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './admin-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export class AdminSidebarComponent implements OnInit {
  sidebarVisible = false;
  private sidebarService = inject(SidebarService);

  ngOnInit() {
    this.sidebarService.visible$.subscribe(visible => {
      this.sidebarVisible = visible;
    });
  }

  closeOnMobile() {
    if (window.innerWidth < 640) {
      this.sidebarService.toggle();
    }
  }
}
