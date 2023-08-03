import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tweets$!: Observable<any[]>;

  tweets: any[] = [];
  isLoadingMore = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private feedService: FeedService
  ) {}

  ngOnInit(): void {
    this.feedService.getTimeline().subscribe((response) => {
      this.tweets = response;
    });

    this.loadTweets();
    this.tweets$ = this.feedService.getTimeline();
  }

  loadTweets() {
    this.feedService.refreshTweets();
  }

  loadMoreTweets() {
    this.isLoadingMore = true;
    this.feedService.loadMoreTweets();
    this.isLoadingMore = false;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && !this.isLoadingMore) {
      this.loadMoreTweets();
    }

    const shouldAddClass = window.scrollY > 60;
    const element = this.el.nativeElement.querySelector('.sticky-bar');
    if (shouldAddClass) {
      this.renderer.addClass(element, 'bg-gray-900');
      this.renderer.addClass(element, 'transition');
      this.renderer.addClass(element, 'duration-300');
      this.renderer.addClass(element, 'pt-[2px]');
    } else {
      this.renderer.removeClass(element, 'bg-gray-900');
      this.renderer.removeClass(element, 'pt-[2px]');
    }
  }
}
