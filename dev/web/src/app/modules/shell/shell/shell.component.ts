import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vth-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

  areOptionPanelNamesVisible = true;
  constructor() { }

  ngOnInit() {
  }

  toggleOptionPanelNames() {
    this.areOptionPanelNamesVisible = !this.areOptionPanelNamesVisible;
    return this.areOptionPanelNamesVisible;
  }

}
