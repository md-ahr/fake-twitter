import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetItemComponent } from './tweet-item.component';

describe('TweetItemComponent', () => {
  let component: TweetItemComponent;
  let fixture: ComponentFixture<TweetItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TweetItemComponent]
    });
    fixture = TestBed.createComponent(TweetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
