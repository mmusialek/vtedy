import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ItemListComponent } from './modules/item-list/item-list.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    // pathMatch: 'full',
    // redirectTo: 'dashboard',
  },
  {
    path: 'item-list/:page',
    component: ItemListComponent
  }

];


export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
