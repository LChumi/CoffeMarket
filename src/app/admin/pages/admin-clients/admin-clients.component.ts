import {Component, inject, OnInit} from '@angular/core';
import {ClienteService} from "@services/cliente.service";
import {Cliente} from "@models/cliente";

@Component({
  selector: 'app-admin-clients',
  imports: [],
  templateUrl: './admin-clients.component.html',
  styles: ``
})
export class AdminClientsComponent implements OnInit {

  private clientService = inject(ClienteService)

  clientes : Cliente[] = []

  ngOnInit() {
    this.getClients()
  }

  getClients() {
    this.clientService.getAll().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      }
    })
  }

}
