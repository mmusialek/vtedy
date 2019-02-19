import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from './modules/calendar/calendar.component';
import {NotesComponent} from './modules/notes/notes.component';
import {ProjectListComponent} from './modules/projects/project-list/project-list.component';
import {ProjectManagementComponent} from './modules/projects/project-management/project-management.component';
import {ProjectsComponent} from './modules/projects/projects.component';
import {LoginComponent} from './modules/security/login/login.component';
import {ShellComponent} from './modules/shell/shell/shell.component';
import {TaskListComponent} from './modules/task-list/task-list.component';
import {PagesRoues} from './shared/components/item-list/item-list.view-model';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'panel',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'priority-box'
      },
      {
        path: 'priority-box',
        component: TaskListComponent,
        data: {type: PagesRoues.PriorityBox}
      },
      {
        path: 'inbox',
        component: TaskListComponent,
        data: {type: PagesRoues.Inbox}
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: ProjectListComponent,
          },
          {
            path: 'create',
            component: ProjectManagementComponent,
          },
          {
            path: 'edit/:id',
            component: ProjectManagementComponent
          }
        ]
      },
      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      }
    ]
  }

];


export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
