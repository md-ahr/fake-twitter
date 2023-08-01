import { Component, OnInit } from '@angular/core';
import { FeedService } from './../../feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  count: number = 0;
  timelines: any[] = [];
  tweets: any[] = [];

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getTimeline().subscribe((response) => {
      this.count = response.count;
      this.timelines = response.timeline;
    });

    this.feedService.getMyTweets().subscribe((response) => {
      this.count = response.count;
      this.tweets = response.my_tweets;
    });
  }
}
