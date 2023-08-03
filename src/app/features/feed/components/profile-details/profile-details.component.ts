import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
})
export class ProfileDetailsComponent {
  myTweets: any[] = [];
  followings: any[] = [];
  followers: any[] = [];
  myTweetsCount: number = 0;
  followingCount: number = 0;
  followersCount: number = 0;
  user: any;
  joinDate!: string;

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2,
    private feedService: FeedService
  ) {}

  ngOnInit(): void {
    initFlowbite();

    this.route.params.subscribe((params) => {
      this.feedService.getTweetsById(+params['id']).subscribe((response) => {
        this.myTweetsCount = response.count;
        this.myTweets = response.tweets;
        this.user = this.myTweets[0] && this.myTweets[0].user;
      });
      this.getFollowing(+params['id']);
      this.getFollowers(+params['id']);
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
