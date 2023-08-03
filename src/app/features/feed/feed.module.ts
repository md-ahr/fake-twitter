import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedRoutingModule } from './feed-routing.module';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { UsersComponent } from './components/users/users.component';
import { FeedComponent } from './components/feed.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { CreateTweetComponent } from './components/create-tweet/create-tweet.component';
import { TweetItemComponent } from './components/tweet-item/tweet-item.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeedComponent,
    UserSidebarComponent,
    MenuSidebarComponent,
    UsersComponent,
    UserItemComponent,
    CreateTweetComponent,
    TweetItemComponent,
    SearchResultComponent,
    ExploreComponent,
    ProfileDetailsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, FeedRoutingModule],
  exports: [
    HomeComponent,
    FeedComponent,
    UserSidebarComponent,
    MenuSidebarComponent,
    UsersComponent,
    UserItemComponent,
    CreateTweetComponent,
    TweetItemComponent,
    SearchResultComponent,
    ExploreComponent,
    ProfileDetailsComponent,
  ],
})
export class FeedModule {}
