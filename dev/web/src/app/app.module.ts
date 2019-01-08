import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ShellComponent } from './modules/shell/shell/shell.component';
import { VerticalPanelComponent } from './modules/shell/vertical-panel/vertical-panel.component';
import { OptionPanelComponent } from './modules/option-panel/option-panel.component';
import { ItemListComponent } from './shared/components/item-list/item-list.component';
import { AppRoutingModule } from './app.routing';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { ItemListService } from './shared/components/item-list/item-list.service';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';
import { ItemDetailsComponent } from './modules/item-details/item-details.component';
import { ItemDetailsService } from './modules/item-details/item.details.service';

import { MatButtonModule, MatDividerModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {VtedyClientService} from './shared/client-services/vtedy.client-service';
import { ProjectListComponent } from './modules/project-list/project-list.component';
import { TaskListComponent } from './modules/task-list/task-list.component';
import { NotesComponent } from './modules/notes/notes.component';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { ProjectManagementComponent } from './modules/project-management/project-management.component';


@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    VerticalPanelComponent,
    OptionPanelComponent,
    ItemListComponent,
    WelcomeComponent,
    ClickOutsideDirective,
    ItemDetailsComponent,
    ProjectListComponent,
    TaskListComponent,
    NotesComponent,
    CalendarComponent,
    ProjectManagementComponent
  ],
  imports: [
    // angular
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // material
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDividerModule,
  ],
  providers: [
    ItemListService,
    ItemDetailsService,
    VtedyClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
