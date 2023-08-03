import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any[] = [];
  data: any[] = [];
  private threshold = 200;
  isLoading: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private userService: UserService
  ) {
    this.loadNextPage();
  }

  loadNextPage(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.userService.getNextUsersPage().subscribe((userData) => {
        this.data.push(...userData);
        this.isLoading = false;
      });
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      !this.isLoading &&
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - this.threshold &&
      this.data.length % this.userService.getPageSize() === 0
    ) {
      this.threshold += 500;
      this.loadNextPage();
    }

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
