import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {CommentViewModel, ItemDataViewModel, ProjectViewModel, TagViewModel} from './item-details.view-model';
import {VtedyClientService} from '../../shared/client-services/vtedy.client-service';

@Injectable()
export class ItemDetailsService {

  private _isDialogVisible: Subject<boolean> = new Subject<boolean>();
  private _newDataStream: Subject<ItemDataViewModel> = new Subject<ItemDataViewModel>();
  private _isDialogPinned = false;


  constructor(private _vtedyService: VtedyClientService) {
  }

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

    return new Observable<ItemDataViewModel>(obs => {
      const subscriber = this._vtedyService.getItem(id).subscribe(p => {
        result = new ItemDataViewModel();
        result.id = p.id;
        result.title = p.name;
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

        obs.next(result);
        obs.complete();

        if (subscriber) {
          subscriber.unsubscribe();
        }
      }, err => {
        console.error(err);
      });
    });
  }

}
