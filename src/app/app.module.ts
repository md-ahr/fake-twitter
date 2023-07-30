import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserSidebarComponent } from './shared/components/user-sidebar/user-sidebar.component';
import { MenuSidebarComponent } from './shared/components/menu-sidebar/menu-sidebar.component';

@NgModule({
  declarations: [AppComponent, UserSidebarComponent, MenuSidebarComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
