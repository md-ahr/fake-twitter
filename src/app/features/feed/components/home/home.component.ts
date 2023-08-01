import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
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

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private feedService: FeedService
  ) {}

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

  @HostListener('window:scroll', [])
  onScroll(): void {
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
