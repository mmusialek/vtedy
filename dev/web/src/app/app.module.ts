import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ShellComponent } from './modules/shell/shell/shell.component';
import { VerticalPanelComponent } from './modules/shell/vertical-panel/vertical-panel.component';
import { OptionPanelComponent } from './modules/option-panel/option-panel.component';
import { ItemListComponent } from './modules/item-list/item-list.component';
import { AppRoutingModule } from './app.routing';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { ItemListService } from './modules/item-list/item-list.service';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';
import { ItemDetailsComponent } from './modules/item-details/item-details.component';
import { ItemDetailsService } from './modules/item-details/item.details.service';

import { MatButtonModule, MatDividerModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    VerticalPanelComponent,
    OptionPanelComponent,
    ItemListComponent,
    WelcomeComponent,
    ClickOutsideDirective,
    ItemDetailsComponent
  ],
  imports: [
    // angular
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    // meterial
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDividerModule,
  ],
  providers: [
    ItemListService,
    ItemDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
