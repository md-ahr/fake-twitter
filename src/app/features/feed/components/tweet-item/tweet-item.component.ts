import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.css'],
})
export class TweetItemComponent {
  @Input() tweet: any;

  formatDate(publishedDate: string): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date(publishedDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${this.getDayWithOrdinal(day)} ${month}, ${year}`;
    return formattedDate;
  }

  getDayWithOrdinal(day: number) {
    const suffixes = ['st', 'nd', 'rd'];
    return day + suffixes[(day - 1) % 10] || 'th';
  }
}
