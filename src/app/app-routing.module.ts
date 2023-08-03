import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/components/auth.component';
import { AuthGuard } from './core/auth/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UsersComponent } from './features/feed/components/users/users.component';
import { ExploreComponent } from './features/feed/components/explore/explore.component';
import { ProfileComponent } from './features/feed/components/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AuthGuard ? 'home' : 'login' },
  { path: 'login', component: AuthComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/feed/feed.module').then((m) => m.FeedModule),
    canActivate: [AuthGuard],
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
