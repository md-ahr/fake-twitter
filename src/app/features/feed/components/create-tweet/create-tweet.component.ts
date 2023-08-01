import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscribable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from './../../feed.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css'],
})
export class CreateTweetComponent {
  tweetForm: FormGroup;

  isBtnEnabled: boolean = false;

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

  postTweet() {
    if (this.tweetForm.valid) {
      const tweetSubscribable: Subscribable<any> = this.feedService.postTweet(
        this.tweetForm.value
      );

      tweetSubscribable.subscribe({
        next: (response) => {
          if (response) {
            this.tweetForm.reset();
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
