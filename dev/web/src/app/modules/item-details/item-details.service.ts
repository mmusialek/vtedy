import { TodoItemDto } from './../../shared/dto/todo-item.dto';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {
  CommentViewModel,
  ItemDataViewModel,
  ProjectViewModel,
  TagViewModel
} from './item-details.view-model';

import { takeWhile, catchError } from 'rxjs/operators';

@Injectable()
export class ItemDetailsService {
  private _isDialogVisible: Subject<boolean> = new Subject<boolean>();
  private _newDataStream: Subject<ItemDataViewModel> = new Subject<
    ItemDataViewModel
  >();
  private _isDialogPinned = false;

  constructor() {}

  get isDialogVisible() {
    return this._isDialogVisible;
  }

  get newDataStream() {
    return this._newDataStream;
  }

  get isDialogPinned() {
    return this._isDialogPinned;
  }

  togglePinDialog() {
    this._isDialogPinned = !this._isDialogPinned;
  }

  showItemDetails(id: string) {
    // if (!this._isDialogPinned) {
    this._isDialogVisible.next(true);
    this.getItemDetails(id).subscribe(p => {
      this._newDataStream.next(p);
    });
    // }
  }

  hideItemDetails() {
    if (!this._isDialogPinned) {
      const hideTimer = setTimeout(p => {
        this._isDialogVisible.next(false);
        clearTimeout(hideTimer);
      }, 300);
    }
  }

  getItemDetails(id: string) {
    let result: ItemDataViewModel;
    let isAlive = true;

    return of(result);
  }
}
