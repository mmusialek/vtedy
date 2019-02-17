import {Component, Input, ViewChild} from '@angular/core';
import {GenericListItemViewModel, GenericListViewModel} from './generic-list.view-model';

@Component({
  selector: 'vth-generic-list',
  templateUrl: './generic-list.component.html'
})
export class GenericListComponent {

  constructor() {
  }

  viewModel: GenericListViewModel = new GenericListViewModel();
  @ViewChild('newItemInput') newItemInput;
  @Input() items: GenericListItemViewModel[];
  @Input() config: IGenericListComponentConfig;

  onClickOutsideInput(event) {
    if (this.config && this.config.addNewOutsideHandler) {
      this.config.addNewOutsideHandler(event);
    }
  }

  onAddNewItemVisibilityClick(event) {
    if (this.config && this.config.addNewVisibilityHandler) {
      this.config.addNewVisibilityHandler(event);
    }
  }

  onClickItemDetailsOutsideInput(event) {
    if (event.className.indexOf('vth-option-panel__container__nav-container__hider') > 0) {
      return;
    }

    if (this.viewModel.areDetailsVisible && event.className.indexOf('vth-generic-list__container__list__list-item') < 0) {
      this.closeDetails();
      if (this.config && this.config.clickItemDetailsOutsideInputHandler) {
        this.config.clickItemDetailsOutsideInputHandler(event);
      }
    }
  }

  onItemClickHandler(event, item) {
    this.viewModel.areDetailsVisible = true;

    if (this.config && this.config.itemClickHandler) {
      this.config.itemClickHandler(event, item);
    }
  }


  private closeDetails() {
    // if (!this._itemDetailsService.isDialogPinned) {
    this.viewModel.areDetailsVisible = false;
    //   this._itemDetailsService.hideItemDetails();
    // }
  }


}


export interface IGenericListComponentConfig {
  addNewOutsideHandler?: (event) => void;
  addNewVisibilityHandler?: (event) => void;
  itemClickHandler?: (event, item) => void;
  clickItemDetailsOutsideInputHandler?: (event) => void;
  isItemDetailAvailable?: boolean;
}
