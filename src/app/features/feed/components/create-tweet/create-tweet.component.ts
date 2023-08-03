import { Router } from '@angular/router';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from './../../services/feed.service';
import { SharedService } from './../../services/shared.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css'],
})
export class CreateTweetComponent implements OnDestroy {
  tweetForm: FormGroup;
  tweets$!: Observable<any[]>;
  isBtnEnabled: boolean = false;

  private tweetBtnSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private feedService: FeedService,
    private sharedService: SharedService,
    private el: ElementRef
  ) {
    this.tweetForm = this.formBuilder.group({
      content: ['', Validators.required],
    });

    if (this.tweetForm.valid) {
      this.isBtnEnabled = true;
    }

    this.tweetBtnSubscription = this.sharedService.tweetBtnTrigger$.subscribe(
      (success) => {
        if (success) {
          this.el.nativeElement.querySelector('#content')?.focus();
        }
      }
    );
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

  ngOnDestroy() {
    this.tweetBtnSubscription.unsubscribe();
  }
}
