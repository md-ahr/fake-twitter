import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscribable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent {
  search = new FormControl();

  searchResult: any[] = [];
  searchResultCount: number = 0;
  isSearchValueExist: boolean = false;

  constructor(
    private userService: UserService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if (value) {
        this.findUsers(value);
      }
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

  @HostListener('window:scroll', [])
  onScroll(): void {
    const shouldAddClass = window.scrollY > 60;
    const element = this.el.nativeElement.querySelector('.sticky-bar');
    if (shouldAddClass) {
      this.renderer.addClass(element, 'bg-gray-900');
      this.renderer.addClass(element, 'transition');
      this.renderer.addClass(element, 'duration-300');
      this.renderer.addClass(element, 'pt-3');
      this.renderer.addClass(element, 'pb-4');
    } else {
      this.renderer.removeClass(element, 'bg-gray-900');
      this.renderer.removeClass(element, 'pt-3');
      this.renderer.removeClass(element, 'pb-4');
    }
  }
}
