import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscribable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from './../../services/feed.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css'],
})
export class CreateTweetComponent {
  tweetForm: FormGroup;
  isBtnEnabled: boolean = false;
  tweets$!: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private feedService: FeedService
  ) {
    this.tweetForm = this.formBuilder.group({
      content: ['', Validators.required],
    });

    if (this.tweetForm.valid) {
      this.isBtnEnabled = true;
    } 
  }

  ngOnInit(): void {
    this.tweets$ = this.feedService.getMyTweets();
    this.feedService.refreshTweets();
  }

  postTweet() {
    if (this.tweetForm.valid) {
      const tweetSubscribable: Subscribable<any> = this.feedService.postTweet(
        this.tweetForm.value
      );

      tweetSubscribable.subscribe({
        next: (response) => {
          if (response.message) {
            this.tweetForm.reset();
            this.feedService.refreshTweets();
            this.toastr.success(response.message);
          }
        },
        error: (err) => {
          this.toastr.error('Failed to post tweet');
        },
      });
    }
  }
}
