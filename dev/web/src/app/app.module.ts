import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatDividerModule,
  MatInputModule,
  MatDatepicker,
  MatDatepickerToggle,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { ItemDetailsComponent } from './modules/item-details/item-details.component';
import { ItemDetailsService } from './modules/item-details/item-details.service';
import { NotesComponent } from './modules/notes/notes.component';
import { OptionPanelComponent } from './modules/option-panel/option-panel.component';
import { ProjectListComponent } from './modules/projects/project-list/project-list.component';
import { ProjectManagementComponent } from './modules/projects/project-management/project-management.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { LoginComponent } from './modules/security/login/login.component';
import { ShellComponent } from './modules/shell/shell/shell.component';
import { VerticalPanelComponent } from './modules/shell/vertical-panel/vertical-panel.component';
import { TaskListComponent } from './modules/task-list/task-list.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { GenericListComponent } from './shared/components/generic-list/generic-list.component';
import { ItemListComponent } from './shared/components/item-list/item-list.component';
import { ItemListService } from './shared/components/item-list/item-list.service';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';

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
    ProjectManagementComponent,
    GenericListComponent,
    LoginComponent,
    ProjectsComponent
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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [ItemListService, ItemDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
