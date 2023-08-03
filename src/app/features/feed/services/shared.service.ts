import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isTweetBtnTriggerSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  tweetBtnTrigger$ = this.isTweetBtnTriggerSubject.asObservable();

  setTweetBtnTrigger(value: boolean) {
    this.isTweetBtnTriggerSubject.next(value);
  }
}
