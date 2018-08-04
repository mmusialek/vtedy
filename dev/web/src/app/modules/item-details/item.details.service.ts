import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommentViewModel, ItemDataViewModel, ProjectViewModel, TagViewModel } from './item-details.view-model';

@Injectable()
export class ItemDetailsService {

  private _isDialogVisible: Subject<boolean> = new Subject<boolean>();
  private _newDataStream: Subject<ItemDataViewModel> = new Subject<ItemDataViewModel>();
  private _pinDialogWindow = false;

  get isDialogVisible() {
    return this._isDialogVisible;
  }

  get newDataStream() {
    return this._newDataStream;
  }

  constructor() {
  }

  get isDialogPinned() {
    return this._pinDialogWindow;
  }

  togglePinDialog() {
    this._pinDialogWindow = !this._pinDialogWindow;
  }

  pinDialog() {
    this._pinDialogWindow = true;
  }

  unPinDialog() {
    this._pinDialogWindow = false;
  }

  showItemDetails(id: string) {
    // if (!this._pinDialogWindow) {
      this._isDialogVisible.next(true);
      const item = this.getItemDetails(id);
      this._newDataStream.next(item);
    // }
  }

  hideItemDetails() {
    if (!this._pinDialogWindow) {
      const hideTimer = setTimeout(p => {
        this._isDialogVisible.next(false);
        clearTimeout(hideTimer);
      }, 300);
    }
  }

  getItemDetails(id: string) {
    let result: ItemDataViewModel;


    result = new ItemDataViewModel();
    result.id = '1';
    result.title = 'item element 1';
    result.project = new ProjectViewModel({id: 1, name: 'test proj 1', owner: 'Marcin'});
    result.comments = [];
    result.comments.push(new CommentViewModel({
      author: 'Marcin',
      comment: 'first comment',
      date: new Date(Date.now())
    }));
    result.comments.push(new CommentViewModel({
      author: 'Marcin',
      comment: 'second comment',
      date: new Date(Date.now())
    }));
    result.date = new Date(Date.now());
    result.tags = [];
    result.tags.push(new TagViewModel({id: 1, name: 'tag_1', owner: 'Marcin'}));

    switch (id) {
      case'1':
        result.id = '1';
        result.title = 'item element 1';
        break;

      case'2':
        result.id = '2';
        result.title = 'item element 2';
        break;

      case'3':
        result.id = '3';
        result.title = 'item element 3';
        break;
    }

    return result;
  }

}
