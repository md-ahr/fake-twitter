import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentPage = 1;
  private pageSize = 30;

  constructor(private http: HttpClient) {}

  getNextUsersPage(): Observable<any[]> {
    const url = `${environment.BASE_API_URL}/users?page=${this.currentPage}&size=${this.pageSize}`;
    this.currentPage++;
    return this.http
      .get<any[]>(url)
      .pipe(map((response: any) => response.users));
  }

  getPageSize(): number {
    return this.pageSize;
  }

  getUsers(page: number, size: number): Observable<any> {
    return this.http.get<any>(
      `${environment.BASE_API_URL}/users?page=${page}&size=${size}`
    );
  }
}
