import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/features/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.cookieService.get('token');

    if (location.pathname === '/login') {
      return next.handle(request);
    }

    if (accessToken) {
      const isTokenExpired = this.isTokenExpired(accessToken);
      if (isTokenExpired) {
        this.authService.logout();
        this.toastr.error('Token expired, Please log in again');
        return throwError('Token expired, Please log in again');
      } else {
        const authReq = request.clone({
          setHeaders: {
            'X-Jwt-Token': `Bearer ${accessToken}`,
          },
        });
        return next.handle(authReq);
      }
    } else {
      this.router.navigateByUrl('/login');
      return throwError('No token found, Please log in');
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  }
}
