import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private refreshTweets$: Subject<void> = new Subject<void>();
  private tweets$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  page: number = 1;
  size: number = 30;

  constructor(private http: HttpClient) {
    this.refreshTweets$.subscribe(() => {
      this.fetchTweets();
    });
  }

  getMyTweets(): Observable<any> {
    return this.tweets$.asObservable();
  }

  postTweet(data: unknown) {
    return this.http.post<any>(`${environment.BASE_API_URL}/tweet`, data);
  }

  refreshTweets() {
    this.refreshTweets$.next();
  }

  private fetchTweets() {
    this.http
      .get<any[]>(`${environment.BASE_API_URL}/my-tweets`)
      .subscribe((tweets) => {
        this.tweets$.next(tweets);
      });
  }

  getTimeline(
    page: number = this.page,
    size: number = this.size
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.BASE_API_URL}/timeline?page=${page}&size=${size}`
    );
  }
}
