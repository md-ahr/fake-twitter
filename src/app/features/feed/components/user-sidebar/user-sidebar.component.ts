import { Component, OnInit } from '@angular/core';
import { FeedService } from './../../feed.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  count: number = 0;
  users: any[] = [];

  page?: number = 1;
  size?: number = 10;

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getUsers(this.page, this.size).subscribe((response) => {
      this.count = response.count;
      this.users = response.users;
    });
  }
}
