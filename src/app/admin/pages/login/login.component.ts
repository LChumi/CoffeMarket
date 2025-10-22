import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {FooterComponent} from "@shared/footer/footer.component";
import {AuthenticationRequest} from "@models/auth/authentication-request";
import {usernameValidator} from "@utils/form-utils";
import {AuthService} from "@services/auth/auth.service";
import {setSessionItem} from "@utils/storage-utils";
import {Router} from "@angular/router";

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
  private authService= inject(AuthService);
  private router = inject(Router);
  loginForm!: FormGroup;

  constructor() {
    this.loginForm= this.fb.group({
      nombreUsuario: ['', [Validators.required, usernameValidator()]],
      clave: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']).then(() => {});
    }
  }

  onSubmit(){
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const form = this.loginForm.value as AuthenticationRequest;
    this.authService.login(form).subscribe({
      next: response => {
        if (response.success){
          console.log(response);
          this.authService.fetchUser().subscribe({
            next: response => {
              if (response){
                console.log(response);
                this.router.navigate(['/admin/dashboard']).then(r => {});
              }
            }
          })
        }
      }
    })
  }

}
