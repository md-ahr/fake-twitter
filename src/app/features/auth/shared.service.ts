import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private signupSuccessSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  signupSuccess$ = this.signupSuccessSubject.asObservable();

  setSignupSuccess(value: boolean) {
    this.signupSuccessSubject.next(value);
  }
}
