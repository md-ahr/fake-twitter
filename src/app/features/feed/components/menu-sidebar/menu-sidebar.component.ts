import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css'],
})
export class MenuSidebarComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  postTweet() {
    this.router.navigateByUrl('/home');
    this.sharedService.setTweetBtnTrigger(true);
  }

  logout(): void {
    this.authService.logout();
  }
}
