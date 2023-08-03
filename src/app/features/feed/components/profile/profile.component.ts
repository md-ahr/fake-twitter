import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FeedService } from './../../services/feed.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  myTweets: any[] = [];
  followings: any[] = [];
  followers: any[] = [];
  myTweetsCount: number = 0;
  followingCount: number = 0;
  followersCount: number = 0;
  user: any;
  joinDate!: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private feedService: FeedService
  ) {}

  ngOnInit(): void {
    initFlowbite();

    this.feedService.getMyTweets().subscribe((response) => {
      this.myTweetsCount = response.count;
      this.myTweets = response.my_tweets;
      this.user = this.myTweets[0] && this.myTweets[0].user;
      this.getFollowing(this.user?.id);
      this.getFollowers(this.user?.id);
      this.joinDate = this.myTweets[0] && new Date(this.myTweets[0].published).toLocaleDateString();
    });
  }

  getFollowing(userId: number): void {
    this.feedService.getFollowing(userId).subscribe((response) => {
      this.followingCount = response.count;
      this.followings = response.followings;
    });
  }

  getFollowers(userId: number): void {
    this.feedService.getFollowers(userId).subscribe((response) => {
      this.followersCount = response.count;
      this.followers = response.followers;
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const shouldAddClass = window.scrollY > 60;
    const element = this.el.nativeElement.querySelector('.sticky-bar');
    if (shouldAddClass) {
      this.renderer.addClass(element, 'bg-gray-900');
      this.renderer.addClass(element, 'transition');
      this.renderer.addClass(element, 'duration-300');
      this.renderer.addClass(element, 'pt-3');
      this.renderer.addClass(element, 'pb-4');
    } else {
      this.renderer.removeClass(element, 'bg-gray-900');
      this.renderer.removeClass(element, 'pt-3');
      this.renderer.removeClass(element, 'pb-4');
    }
  }
}
