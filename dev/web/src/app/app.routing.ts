import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ItemListComponent } from './shared/components/item-list/item-list.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import {ProjectListComponent} from './modules/project-list/project-list.component';
import {TaskListComponent} from './modules/task-list/task-list.component';
import {NotesComponent} from './modules/notes/notes.component';
import {CalendarComponent} from './modules/calendar/calendar.component';

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
    // component: ItemListComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'projects',
        component: ProjectListComponent,
        pathMatch: 'full',
        // outlet: 'option-details'
      },
      {
        path: ':page',
        component: TaskListComponent,
        pathMatch: 'full',
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
  },
  {
    path: 'project-list',
    component: ProjectListComponent
  }

];


export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
