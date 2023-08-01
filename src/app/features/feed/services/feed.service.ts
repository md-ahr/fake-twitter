import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private currentPage = 1;
  private pageSize = 30;

  private refreshTweets$: Subject<void> = new Subject<void>();
  private tweets$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.refreshTweets$.subscribe(() => {
      this.fetchTweets();
      this.getNextTweetsPage();
    });
  }

  getNextTweetsPage(): Observable<any> {
    const url = `${environment.BASE_API_URL}/my-tweets?page=${this.currentPage}&size=${this.pageSize}`;
    this.currentPage++;
    return this.http
      .get<any[]>(url)
      .pipe(map((response: any) => response.my_tweets));
  }

  getPageSize(): number {
    return this.pageSize;
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

  getTimeline(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_API_URL}/timeline`);
  }
}
