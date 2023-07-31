import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscribable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  registrationForm: FormGroup;
  loginForm: FormGroup;

  isSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private authService: AuthService
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup() {
    if (this.registrationForm.valid) {
      const signupSubscribable: Subscribable<any> = this.authService.signup(
        this.registrationForm.value
      );

      signupSubscribable.subscribe({
        next: (response) => {
          this.registrationForm.reset();

          if (response.message) {
            this.isSuccess = true;
            this.toastr.success('User registered successfully');
          }
        },
        error: (err) => {
          this.toastr.error('User registration failed');
        },
      });
    }
  }

  signin() {
    if (this.loginForm.valid) {
      const loginSubscribable: Subscribable<any> = this.authService.login(
        this.loginForm.value
      );

      loginSubscribable.subscribe({
        next: (response) => {
          this.loginForm.reset();

          if (response.token) {
            this.isSuccess = true;
            this.cookieService.set('token', response.token);
            this.toastr.success('User logged in successfully');
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.toastr.error('User login failed');
        },
      });
    }
  }
}
