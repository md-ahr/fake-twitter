import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FeedComponent } from './feed.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedRoutingModule } from './feed-routing.module';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeedComponent,
    UserSidebarComponent,
    MenuSidebarComponent,
  ],
  imports: [CommonModule, SharedModule, FeedRoutingModule],
  exports: [
    HomeComponent,
    FeedComponent,
    UserSidebarComponent,
    MenuSidebarComponent,
  ],
})
export class FeedModule {}
