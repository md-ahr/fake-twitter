import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://missingdata.pythonanywhere.com';
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  get token(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

  signup(data: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, data);
  }

  login(data: User): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      map((response) => {
        const token = response.token;
        this.tokenSubject.next(token);
        return response;
      })
    );
  }

  isLoggedIn(): boolean {
    const token = this.cookieService.get('token');
    return !!token;
  }

  logout(): void {
    this.tokenSubject.next('');
    this.cookieService.delete('token');
    this.router.navigateByUrl('/');
  }
}
