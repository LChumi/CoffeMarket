import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {UsersService} from "@services/users.service";
import {Usuario} from "@models/usuario";

@Component({
  selector: 'app-admin-usuarios',
  imports: [],
  templateUrl: './admin-usuarios.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export class AdminUsuariosComponent implements OnInit {

  private usuarioService = inject(UsersService)

  usuarios: Usuario[] = []

  ngOnInit() {
    this.getUsuarios()
  }

  getUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: data => {
        this.usuarios = data
      }
    })
  }

}
