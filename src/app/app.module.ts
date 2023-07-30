import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MenuSidebarComponent } from './shared/menu-sidebar/menu-sidebar.component';
import { UserSidebarComponent } from './shared/user-sidebar/user-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuSidebarComponent,
    UserSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
