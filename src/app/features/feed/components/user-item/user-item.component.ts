import { Component, Input } from '@angular/core';
import { Subscribable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent {
  @Input() user: any;

  userId!: number;
  isFollowed: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getFollowings().subscribe({
      next: (response) => {
        response.followings?.find((user: any) => {
          if (user.id === this.user.id) {
            this.isFollowed = true;
          }
        });
      },
      error: (err) => {
        this.toastr.error('Failed to get followings user data');
      },
    });
  }

  followUser(userId: number) {
    const data: any = {
      user_id: userId,
    };

    const tweetSubscribable: Subscribable<any> =
      this.userService.followUser(data);

    tweetSubscribable.subscribe({
      next: (response) => {
        if (response.resp) {
          this.isFollowed = true;
          this.toastr.success('Successfully followed');
        }
      },
      error: (err) => {
        this.toastr.error('Failed to follow user');
      },
    });
  }

  unfollowUser(userId: number) {
    const data: any = {
      user_id: userId,
    };

    const tweetSubscribable: Subscribable<any> =
      this.userService.unfollowUser(data);

    tweetSubscribable.subscribe({
      next: (response) => {
        if (response.resp) {
          this.isFollowed = false;
          this.toastr.success('Successfully unfollowed');
        }
      },
      error: (err) => {
        this.toastr.error('Failed to unfollow user');
      },
    });
  }
}
