import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getUsers(page?: number, size?: number): Observable<any> {
    return this.http.get<any>(
      `${environment.BASE_API_URL}/users?page=${page}&size=${size}`
    );
  }

  getTimeline(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_API_URL}/timeline`);
  }

  getMyTweets(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_API_URL}/my-tweets`);
  }
}
