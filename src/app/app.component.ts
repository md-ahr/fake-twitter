import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'fake-twitter';

  isLoggedIn = false;

  ngOnInit(): void {
    initFlowbite();
  }
}
