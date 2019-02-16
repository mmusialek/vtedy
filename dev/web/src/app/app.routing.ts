import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ItemListComponent } from './shared/components/item-list/item-list.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import {ProjectListComponent} from './modules/project-list/project-list.component';
import {TaskListComponent} from './modules/task-list/task-list.component';
import {NotesComponent} from './modules/notes/notes.component';
import {CalendarComponent} from './modules/calendar/calendar.component';
import {ProjectManagementComponent} from './modules/project-management/project-management.component';
import {PagesRoues} from './shared/components/item-list/item-list.view-model';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    // pathMatch: 'full',
    // redirectTo: 'dashboard',
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'item-list',
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'inbox',
        component: TaskListComponent,
        data: {type: PagesRoues.Inbox}
      },
      {
        path: 'priority-box',
        component: TaskListComponent,
        data: {type: PagesRoues.PriorityBox}
      },
      {
        path: 'projects',
        component: ProjectListComponent
      },
    ]
  },
  {
    path: 'notes',
    component: NotesComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'project-management',
    component: ProjectManagementComponent
  }

];


export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
