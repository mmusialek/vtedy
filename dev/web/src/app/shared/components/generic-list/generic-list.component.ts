import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {GenericListItemViewModel, GenericListViewModel} from './generic-list.view-model';

@Component({
  selector: 'vth-generic-list',
  templateUrl: './generic-list.component.html'
})
export class GenericListComponent implements OnDestroy {

  viewModel: GenericListViewModel = new GenericListViewModel();
  @ViewChild('newItemInput') newItemInput;
  @Input() items: GenericListItemViewModel[];

  @Input() addNewOutsideHandler = (event) => {};
  @Input() addNewVisibilityHandler = () => {};
  @Input() itemClickHandler = (event, item: GenericListItemViewModel) => {};
  @Input() clickItemDetailsOutsideInputHandler = (event) => {};

  constructor() {
  }

  ngOnDestroy() {
  }

  onClickOutsideInput(event) {
    if (this.addNewOutsideHandler) {
      this.addNewOutsideHandler(event);
    }
  }

  onAddNewItemVisibilityClick(event) {
    if (this.addNewVisibilityHandler) {
      this.addNewVisibilityHandler();
    }
  }

  onClickItemDetailsOutsideInput(event) {
    if (event.className.indexOf('vth-option-panel__container__nav-container__hider') > 0) {
      return;
    }

    if (this.viewModel.areDetailsVisible && event.className.indexOf('vth-generic-list__container__list__list-item') < 0) {
      this.closeDetails();
      if (this.clickItemDetailsOutsideInputHandler) {
        this.clickItemDetailsOutsideInputHandler(event);
      }
    }
  }

  onItemClickHandler(event: MouseEvent, item: GenericListItemViewModel) {
    this.viewModel.areDetailsVisible = true;
    if (this.itemClickHandler) {
      this.itemClickHandler(event, item);
    }
  }


  private closeDetails() {
    // if (!this._itemDetailsService.isDialogPinned) {
    this.viewModel.areDetailsVisible = false;
    //   this._itemDetailsService.hideItemDetails();
    // }
  }


}

