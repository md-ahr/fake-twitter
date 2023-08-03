import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../auth/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css'],
})
export class MenuSidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    initFlowbite();
  }

  postTweet() {
    this.router.navigateByUrl('/home');
    this.sharedService.setTweetBtnTrigger(true);
  }

  logout(): void {
    this.authService.logout();
  }
}
