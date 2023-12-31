import { FeedService } from './feed.service';
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

  constructor(private http: HttpClient, private feedService: FeedService) {}

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

  getUserBySearch(data: { token: string }): Observable<any> {
    return this.http.post<any>(`${environment.BASE_API_URL}/search`, data);
  }

  followUser(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_API_URL}/follow`, data);
  }

  unfollowUser(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_API_URL}/unfollow`, data);
  }

  getFollowings(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_API_URL}/following`);
  }
}
