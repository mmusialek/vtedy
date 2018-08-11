import { Component, OnInit, Input } from '@angular/core';
import { VerticalPanelComponent } from '../shell/vertical-panel/vertical-panel.component';
import { OptionPanelItemViewModel, OptionPanelViewModel } from './option-panel.view-model';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'vth-option-panel',
  templateUrl: 'option-panel.component.html'
})
export class OptionPanelComponent extends VerticalPanelComponent implements OnInit {

  @Input() toggleOptionPanelNames: any;

  viewModel: OptionPanelViewModel = new OptionPanelViewModel();

  constructor(private _router: Router) {
    super();
  }

  ngOnInit() {
    this.viewModel.items.push(
      new OptionPanelItemViewModel({name: 'Priority box', url: 'item-list', params: ['priority-box']}),
      new OptionPanelItemViewModel({name: 'Inbox', url: 'item-list', params: ['inbox']}),
      new OptionPanelItemViewModel({name: 'Projects', url: 'item-list', params: ['projects']}),
      new OptionPanelItemViewModel({name: 'Calendar', url: 'item-list', params: ['calendar']}),
      new OptionPanelItemViewModel({name: 'Notes', url: 'notes'}),
    );
  }

  navigateToPage(page: OptionPanelItemViewModel) {
    const routeParam = page.params && page.params.length > 0 && page.params[0];
    const param = routeParam ? [page.url, routeParam] : [page.url];
    this._router.navigate(param);
  }

  toggleOptionPanel() {
    this.viewModel.isNameVisible = this.toggleOptionPanelNames();
  }

}
