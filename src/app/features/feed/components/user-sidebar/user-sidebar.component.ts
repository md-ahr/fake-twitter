import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  count: number = 0;
  users: any[] = [];

  page: number = 1;
  size: number = 6;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers(this.page, this.size).subscribe((response) => {
      this.count = response.count;
      this.users = response.users;
    });
  }
}
