import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AdminNavbarComponent} from "../components/admin-navbar/admin-navbar.component";
import {AdminSidebarComponent} from "../components/admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    AdminNavbarComponent,
    AdminSidebarComponent
  ],
  template: `
    <app-admin-navbar></app-admin-navbar>
    <app-admin-sidebar></app-admin-sidebar>
    <div class="p-4 sm:ml-64">
      <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <router-outlet/>
      </div>
    </div>
  `,
  styles: ``
})
export class LayoutComponent {

}
