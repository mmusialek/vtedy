import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ItemDataViewModel } from './item-details.view-model';

@Injectable()
export class ItemDetailsService {

  private _isDialogVisible: Subject<boolean> = new Subject<boolean>();
  private _newDataStream: Subject<ItemDataViewModel> = new Subject<ItemDataViewModel>();

  get isDialogVisible() {
    return this._isDialogVisible;
  }

  get newDataStream() {
    return this._newDataStream;
  }

  constructor() {
  }

  showItemDetails(id: string) {
    this._isDialogVisible.next(true);
    const item = this.getItemDetails(id);
    this._newDataStream.next(item);
  }

  hideItemDetails() {
    this._isDialogVisible.next(false);
  }

  getItemDetails(id: string) {
    let result: ItemDataViewModel;


    switch (id) {
      case'1':
        result = new ItemDataViewModel();
        result.id = '1';
        break;

      case'2':
        result = new ItemDataViewModel();
        result.id = '2';
        break;

      case'3':
        result = new ItemDataViewModel();
        result.id = '3';
        break;
    }

    return result;
  }

}
