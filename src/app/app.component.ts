import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'fake-twitter';

  isLoggedIn = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    initFlowbite();

    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }
}
