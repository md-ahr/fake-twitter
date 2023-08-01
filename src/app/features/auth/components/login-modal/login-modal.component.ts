import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscribable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnDestroy {
  loginForm: FormGroup;

  isSuccess: boolean = false;
  isLoginShow: boolean = false;

  private signupSuccessSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.signupSuccessSubscription =
      this.sharedService.signupSuccess$.subscribe((success) => {
        if (success) {
          this.isLoginShow = true;
        }
      });
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
            this.router.navigateByUrl('/home');
          }
        },
        error: (err) => {
          this.toastr.error('User login failed');
        },
      });
    }
  }

  ngOnDestroy() {
    this.signupSuccessSubscription.unsubscribe();
  }
}
