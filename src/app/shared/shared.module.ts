import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';



@NgModule({
  declarations: [
    UserSidebarComponent,
    MenuSidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
