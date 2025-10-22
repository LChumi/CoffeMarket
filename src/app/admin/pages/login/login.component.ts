import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FooterComponent} from "@shared/footer/footer.component";

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FooterComponent
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  loginForm!: FormGroup;

  constructor() {
    this.loginForm= this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit(){

  }
}
