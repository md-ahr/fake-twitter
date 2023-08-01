import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedRoutingModule } from './feed-routing.module';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { UsersComponent } from './components/users/users.component';
import { FeedComponent } from './components/feed.component';
import { UserItemComponent } from './components/user-item/user-item.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeedComponent,
    UserSidebarComponent,
    MenuSidebarComponent,
    UsersComponent,
    UserItemComponent,
  ],
  imports: [CommonModule, SharedModule, FeedRoutingModule],
  exports: [
    HomeComponent,
    FeedComponent,
    UserSidebarComponent,
    MenuSidebarComponent,
    UsersComponent,
    UserItemComponent,
  ],
})
export class FeedModule {}
