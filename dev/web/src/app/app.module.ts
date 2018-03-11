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


@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    VerticalPanelComponent,
    OptionPanelComponent,
    ItemListComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ItemListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
