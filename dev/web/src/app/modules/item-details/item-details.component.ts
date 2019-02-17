import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ItemDetailsComponentService} from './item-details.component.service';
import {ItemDetailsViewModel} from './item-details.view-model';
import {SubscriptionLike as ISubscription} from 'rxjs';

@Component({
  selector: 'vth-item-details',
  templateUrl: './item-details.component.html'
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

  viewModel: ItemDetailsViewModel;
  private _isDialogVisibleSubscription: ISubscription;
  private _newDataSubscription: ISubscription;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _itemDetailsService: ItemDetailsComponentService) {
  }

  ngOnInit() {
    this.viewModel = new ItemDetailsViewModel();

    this._isDialogVisibleSubscription = this._itemDetailsService.isDialogVisible.subscribe(p => {
      this.viewModel.isVisible = p;
    });

    this._newDataSubscription = this._itemDetailsService.newDataStream.subscribe(p => {
      this.viewModel.item = p;
    });
  }

  ngOnDestroy(): void {
    if (this._isDialogVisibleSubscription) {
      this._isDialogVisibleSubscription.unsubscribe();
    }

    if (this._newDataSubscription) {
      this._newDataSubscription.unsubscribe();
    }
  }

  onCloseHandler() {
    this._itemDetailsService.hideItemDetails();
    this.closeEvent.emit(true);
  }

  onPinHandler() {
    this._itemDetailsService.togglePinDialog();
    this.viewModel.isDialogPinned = this._itemDetailsService.isDialogPinned;
  }

}
