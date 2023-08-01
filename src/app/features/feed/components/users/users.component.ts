import { Component, HostListener } from '@angular/core';
import { FeedService } from '../../feed.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any[] = [];
  data: any[] = [];

  page: number = 1;
  size: number = 30;

  private threshold = 200;
  isLoading: boolean = false;

  constructor(private feedService: FeedService) {
    this.loadNextPage();
  }

  loadNextPage(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.feedService.getNextUsersPage().subscribe((userData) => {
        this.data.push(...userData);
        this.isLoading = false;
      });
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      !this.isLoading &&
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - this.threshold &&
      this.data.length % this.feedService.getPageSize() === 0
    ) {
      this.threshold += 500;
      this.loadNextPage();
    }
  }
}
