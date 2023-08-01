import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthComponent } from './components/auth.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SharedService } from './shared.service';

@NgModule({
  declarations: [AuthComponent, SignupModalComponent, LoginModalComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService, SharedService],
  exports: [AuthComponent],
})
export class AuthModule {}
