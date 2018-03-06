import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ShellComponent } from './modules/shell/shell/shell.component';
import { VerticalPanelComponent } from './modules/shell/vertical-panel/vertical-panel.component';
import { OptionPanelComponent } from './modules/option-panel/option-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    VerticalPanelComponent,
    OptionPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
