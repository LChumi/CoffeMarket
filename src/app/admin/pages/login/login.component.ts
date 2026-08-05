import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {FooterComponent} from "@shared/footer/footer.component";
import {AuthenticationRequest} from "@models/auth/authentication-request";
import {usernameValidator} from "@utils/form-utils";
import {AuthService} from "@services/auth/auth.service";
import {Router} from "@angular/router";
import {ClarityService} from "@services/data/clarity.service";
import {NgOptimizedImage} from "@angular/common";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FooterComponent,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(MessageService);
  private clarity = inject(ClarityService);
  loginForm!: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, usernameValidator()]],
      clave: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']).then(r => {
        console.log('navigate', r);

        this.toastr.add({ severity: 'success', summary: 'Autenticado', detail: 'Bienvenido'})
      });
    }
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const form = this.loginForm.value as AuthenticationRequest;
    this.authService.login(form).subscribe({
      next: response => {
        if (response.success) {
          this.authService.fetchUser().subscribe({
            next: response => {
              if (response) {
                this.router.navigate(['/admin/dashboard']).then(r => {
                  console.log('navigate', r);
                  this.toastr.add({ severity: 'success', summary: 'Exito', detail: 'Bienvenido'})
                  this.clarity.event('Ingreso panel Administracion')
                });
              }
            }
          })
        } else {
          this.toastr.add({ severity: 'warn', summary: 'Atencion', detail: 'Usuario no identificado por favor vuelva a iniciar sesion'})
          this.loginForm.reset()
        }
      },
      error: () => {
        this.toastr.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un problema, Servicio no disponible'})
        this.loginForm.reset()
      }
    })
  }
}
