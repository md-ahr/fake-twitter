import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscribable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css'],
})
export class SignupModalComponent {
  registrationForm: FormGroup;

  isSignupSuccess: boolean = false;
  isRegisterShow: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
            this.isSignupSuccess = true;
            this.isRegisterShow = false;
            this.sharedService.setSignupSuccess(true);
            this.toastr.success('User registered successfully');
          }
        },
        error: (err) => {
          if (err.status === 400) {
            this.toastr.error(err.error.error);
          } else {
            this.toastr.error('User registration failed!');
          }
        },
      });
    }
  }
}
