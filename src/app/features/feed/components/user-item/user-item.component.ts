import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { FeedService } from '../../services/feed.service';

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
    private toastr: ToastrService,
    private feedService: FeedService
  ) {}

  ngOnInit(): void {
  }

  followUser() {
    // const data: any = {
    //   user_id: this.userId,
    // };

    // console.log(this.userId);

    // const tweetSubscribable: Subscribable<any> =
    //   this.userService.followUser(data);

    // tweetSubscribable.subscribe({
    //   next: (response) => {
    //     if (response.resp) {
    //       this.isFollowed = true;
    //       this.toastr.success(response.message);
    //     }
    //   },
    //   error: (err) => {
    //     this.toastr.error('Failed to follow user');
    //   },
    // });
  }

  unfollowUser() {}
}
