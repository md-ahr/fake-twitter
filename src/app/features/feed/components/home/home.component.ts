import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tweets: any[] = [];
  timelines: any[] = [];
  tweetCount: number = 0;
  timelineCount: number = 0;
  private threshold = 200;
  isLoading: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private feedService: FeedService
  ) {}

  loadNextPage(): void {
    if (!this.isLoading && !this.feedService.isNewTweetPosted()) {
      this.isLoading = true;
      this.feedService.getNextTweetsPage().subscribe((tweetData) => {
        this.tweets = [...this.tweets, ...tweetData];
        this.isLoading = false;
      });
    }
  }

  ngOnInit(): void {
    this.feedService.getMyTweets().subscribe((response) => {
      this.tweetCount = response.count;
      this.tweets = response.my_tweets;
    });

    this.feedService.getTimeline().subscribe((response) => {
      this.timelineCount = response.count;
      this.timelines = response.timeline;
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      !this.isLoading &&
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - this.threshold &&
      this.tweets &&
      this.tweets.length % this.feedService.getPageSize() === 0
    ) {
      this.threshold += 500;
      this.loadNextPage();
    }

    const shouldAddClass = window.scrollY > 80;
    const element = this.el.nativeElement.querySelector('.sticky-bar');
    if (shouldAddClass) {
      this.renderer.addClass(element, 'bg-gray-900');
      this.renderer.addClass(element, 'transition');
      this.renderer.addClass(element, 'duration-300');
    } else {
      this.renderer.removeClass(element, 'bg-gray-900');
    }
  }
}
