import { Component, OnInit } from '@angular/core';
import { VerticalPanelComponent } from '../shell/vertical-panel/vertical-panel.component';

@Component({
  selector: 'vth-option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.scss']
})
export class OptionPanelComponent extends VerticalPanelComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
