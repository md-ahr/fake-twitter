import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, forkJoin } from 'rxjs';
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

  getTimeline(): Observable<any> {
    return this.tweets$.asObservable();
  }

  getMyTweets(): Observable<any> {
    return this.http.get<any>(
      `${environment.BASE_API_URL}/my-tweets?page=${this.page}&size=${this.size}`
    );
  }

  postTweet(data: unknown) {
    return this.http.post<any>(`${environment.BASE_API_URL}/tweet`, data);
  }

  refreshTweets() {
    this.refreshTweets$.next();
  }

  // private fetchTweets() {
  //   const myTweets$ = this.http.get<{ my_tweets: any[] }>(
  //     `${environment.BASE_API_URL}/my-tweets`
  //   );

  //   const timeline$ = this.http.get<{ timeline: any[] }>(
  //     `${environment.BASE_API_URL}/timeline`
  //   );

  //   forkJoin([myTweets$, timeline$]).subscribe(
  //     ([myTweetsResponse, timelineResponse]) => {
  //       const myTweets = Array.isArray(myTweetsResponse.my_tweets)
  //         ? myTweetsResponse.my_tweets
  //         : [];

  //       const timelineTweets = Array.isArray(timelineResponse.timeline)
  //         ? timelineResponse.timeline
  //         : [];

  //       const combinedTweets = [...myTweets, ...timelineTweets];
  //       this.tweets$.next(combinedTweets);
  //     },
  //     (error) => {
  //       console.error('Error fetching tweets:', error);
  //       this.tweets$.next([]);
  //     }
  //   );
  // }

  private fetchTweets() {
    const myTweets$ = this.http.get<{ my_tweets: any[] }>(
      `${environment.BASE_API_URL}/my-tweets?page=${this.page}&size=${this.size}`
    );

    const timeline$ = this.http.get<{ timeline: any[] }>(
      `${environment.BASE_API_URL}/timeline?page=${this.page}&size=${this.size}`
    );

    forkJoin([myTweets$, timeline$]).subscribe(
      ([myTweetsResponse, timelineResponse]) => {
        const myTweets = Array.isArray(myTweetsResponse.my_tweets)
          ? myTweetsResponse.my_tweets
          : [];

        const timelineTweets = Array.isArray(timelineResponse.timeline)
          ? timelineResponse.timeline
          : [];

        const combinedTweets = [...myTweets, ...timelineTweets];
        this.tweets$.next(
          this.page === 1
            ? combinedTweets
            : [...this.tweets$.getValue(), ...combinedTweets]
        );
      },
      (error) => {
        console.error('Error fetching tweets:', error);
        this.tweets$.next([]);
      }
    );
  }

  loadMoreTweets() {
    this.page++;
    this.fetchTweets();
  }

  getFollowing(userId: number) {
    return this.http.get<any>(
      `${environment.BASE_API_URL}/users/${userId}/following?page=${this.page}&size=${this.size}`
    );
  }

  getFollowers(userId: number) {
    return this.http.get<any>(
      `${environment.BASE_API_URL}/users/${userId}/followers?page=${this.page}&size=${this.size}`
    );
  }

  getTweetsById(userId: number) {
    return this.http.get<any>(
      `${environment.BASE_API_URL}/users/${userId}/tweets?page=${this.page}&size=${this.size}`
    );
  }
}
