import {Component, inject, OnInit} from '@angular/core';
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
import {ToastrService} from "ngx-toastr";
import {ClarityService} from "@services/data/clarity.service";

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FooterComponent
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
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
      this.router.navigate(['/admin/dashboard']).then(() => {
        this.toastr.info('Bienvenido')
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
                  this.toastr.info('Bienvenido');
                  this.clarity.event('Ingreso panel Administracion')
                });
              }
            }
          })
        } else {
          this.toastr.warning('Usuario no identificado por favor vuelva a iniciar sesion')
          this.loginForm.reset()
        }
      },
      error: error => {
        this.toastr.error('Ocurrio un problema, Servicio no disponible');
        this.loginForm.reset()
      }
    })
  }

}
