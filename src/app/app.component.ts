import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { initFlowbite } from 'flowbite';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fake-twitter';

  isLoggedIn = false;
  private tokenSubscription!: Subscription;

  constructor(
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  tokenFromCookie = this.cookieService.get('token');

  ngOnInit(): void {
    initFlowbite();

    this.tokenSubscription = this.authService.token.subscribe((token) => {
      this.isLoggedIn = !!token;
    });

    if (this.tokenFromCookie) {
      this.isLoggedIn = true;
    }
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }
}
