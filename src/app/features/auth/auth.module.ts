import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthComponent } from './components/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService],
  exports: [AuthComponent],
})
export class AuthModule {}
