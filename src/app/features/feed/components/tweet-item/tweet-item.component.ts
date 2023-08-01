import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.css'],
})
export class TweetItemComponent {
  @Input() tweet: any;
  @Input() timeline: any;

  formatDateToHour(publishedDate: string): string {
    const currentTimeUTC = new Date();
    const givenDateUTC = new Date(publishedDate);
    const timeDifferenceInSeconds = Math.floor(
      ((currentTimeUTC.getTime() - givenDateUTC.getTime()) / 1000) * 1000
    );
    return this.convertToSimplifiedFormat(timeDifferenceInSeconds / (60 * 60));
  }

  convertToSimplifiedFormat(seconds: number): string {
    if (seconds === 0) return 'Now';

    const absoluteSeconds: any = Math.abs(seconds);

    if (absoluteSeconds < 60) {
      return `${Math.sign(seconds) * absoluteSeconds.toFixed(0)}s`;
    } else if (absoluteSeconds < 3600) {
      const minutes = Math.floor(absoluteSeconds / 60);
      const remainingSeconds: any = absoluteSeconds - minutes * 60;
      return `${Math.sign(seconds) * minutes}m ${
        Math.sign(seconds) * remainingSeconds.toFixed(0)
      }s`;
    } else {
      const hours = Math.floor(absoluteSeconds / 3600);
      const remainingMinutes = Math.floor(
        (absoluteSeconds - hours * 3600) / 60
      );
      const remainingSeconds: any =
        absoluteSeconds - hours * 3600 - remainingMinutes * 60;
      return `${Math.sign(seconds) * hours}h ${
        Math.sign(seconds) * remainingMinutes
      }m ${Math.sign(seconds) * remainingSeconds.toFixed(0)}s`;
    }
  }
}
