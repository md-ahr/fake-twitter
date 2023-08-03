import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscribable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  search = new FormControl();

  page: number = 1;
  size: number = 6;
  count: number = 0;
  users: any[] = [];
  searchResult: any[] = [];
  searchResultCount: number = 0;
  isSearchValueExist: boolean = false;

  constructor(private userService: UserService) {
    this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if (value) {
        this.findUsers(value);
      }
    });
  }

  ngOnInit(): void {
    this.userService.getUsers(this.page, this.size).subscribe((response) => {
      this.count = response.count;
      this.users = response.users;
    });
  }

  findUsers(value: string) {
    const data = {
      token: value,
    };

    const searchSubscribable: Subscribable<any> =
      this.userService.getUserBySearch(data);

    searchSubscribable.subscribe({
      next: (response) => {
        if (response.count) {
          this.searchResultCount = response.count;
          this.searchResult = response.search_results;
          this.isSearchValueExist = true;
        }
      },
      error: (err) => {
        this.isSearchValueExist = false;
      },
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const sectionElement = document.querySelector('.search-result');

    if (!sectionElement!.contains(clickedElement)) {
      this.isSearchValueExist = false;
    }
  }
}
