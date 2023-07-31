import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/components/auth.component';
import { AuthGuard } from './core/auth/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/feed/feed.module').then((m) => m.FeedModule),
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
